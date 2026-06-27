"""
Banke Vyas Portfolio — Backend API
FastAPI + SQLite + Resend Email API
"""

import json
import os
import sqlite3
import ssl
import urllib.request
import urllib.error
import uuid
from datetime import datetime, timezone
from contextlib import asynccontextmanager

from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr, Field

load_dotenv()

DB_FILE = os.getenv("DB_FILE", "portfolio.db")
RESEND_API_KEY = os.getenv("RESEND_API_KEY")

# ── Database Initialization ──────────────────────────────────────────────────

def get_db_connection():
    conn = sqlite3.connect(DB_FILE)
    conn.row_factory = sqlite3.Row
    return conn

@asynccontextmanager
async def lifespan(app: FastAPI):
    """Create the database table on startup."""
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("""
        CREATE TABLE IF NOT EXISTS contact_messages (
            id TEXT PRIMARY KEY,
            name TEXT NOT NULL,
            email TEXT NOT NULL,
            subject TEXT NOT NULL,
            message TEXT NOT NULL,
            created_at TEXT NOT NULL
        )
    """)
    conn.commit()
    conn.close()
    print(f"✓ SQLite Database initialized: {DB_FILE}")
    yield

# ── App ───────────────────────────────────────────────────────────────────────

app = FastAPI(
    title="Banke Vyas Portfolio API",
    version="1.0.0",
    lifespan=lifespan,
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Models ────────────────────────────────────────────────────────────────────

class ContactMessageCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    subject: str = Field(..., min_length=1, max_length=200)
    message: str = Field(..., min_length=1, max_length=5000)


class ContactMessage(BaseModel):
    id: str
    name: str
    email: str
    subject: str
    message: str
    created_at: str


# ── Helper for sending email ──────────────────────────────────────────────────

def send_notification_email(name: str, email: str, subject: str, message: str):
    """Sends an email notification via Resend API using standard urllib."""
    if not RESEND_API_KEY:
        print("⚠ Resend API key is missing. Skipping email sending.")
        return

    url = "https://api.resend.com/emails"
    headers = {
        "Authorization": f"Bearer {RESEND_API_KEY}",
        "Content-Type": "application/json",
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    }
    
    # Constructing the email body
    html_content = f"""
    <h3>New Portfolio Message!</h3>
    <p><strong>Name:</strong> {name}</p>
    <p><strong>Email:</strong> {email}</p>
    <p><strong>Subject:</strong> {subject}</p>
    <p><strong>Message:</strong></p>
    <p style="white-space: pre-wrap; background: #f4f4f4; padding: 10px; border-left: 3px solid #ff3300;">{message}</p>
    """

    payload = {
        "from": "Portfolio Contact <onboarding@resend.dev>",
        "to": "bankevyas01@gmail.com",
        "reply_to": email,
        "subject": f"Portfolio Message: {subject}",
        "html": html_content
    }

    req = urllib.request.Request(
        url,
        data=json.dumps(payload).encode("utf-8"),
        headers=headers,
        method="POST"
    )

    # Bypass SSL verification specifically for this request to avoid macOS certificate configuration issues
    ctx = ssl.create_default_context()
    ctx.check_hostname = False
    ctx.verify_mode = ssl.CERT_NONE

    try:
        with urllib.request.urlopen(req, context=ctx) as response:
            res_body = response.read().decode("utf-8")
            print(f"✓ Email sent successfully: {res_body}")
    except urllib.error.HTTPError as e:
        err_body = e.read().decode("utf-8")
        print(f"✗ Failed to send email. Status: {e.code}, Response: {err_body}")
    except Exception as e:
        print(f"✗ Unexpected error while sending email: {str(e)}")


# ── Routes ────────────────────────────────────────────────────────────────────

@app.get("/api/")
async def root():
    return {"message": "Banke Vyas Portfolio API"}


@app.get("/api/status")
async def status():
    return {
        "status": "ok",
        "timestamp": datetime.now(timezone.utc).isoformat(),
    }


@app.post("/api/contact", response_model=ContactMessage, status_code=200)
async def create_contact(payload: ContactMessageCreate):
    """Validate and persist a contact message, then trigger an email notification."""
    doc = {
        "id": str(uuid.uuid4()),
        "name": payload.name,
        "email": payload.email,
        "subject": payload.subject,
        "message": payload.message,
        "created_at": datetime.now(timezone.utc).isoformat(),
    }
    
    # Save to SQLite Database
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            """
            INSERT INTO contact_messages (id, name, email, subject, message, created_at)
            VALUES (?, ?, ?, ?, ?, ?)
            """,
            (doc["id"], doc["name"], doc["email"], doc["subject"], doc["message"], doc["created_at"])
        )
        conn.commit()
        conn.close()
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")

    # Send email notification
    send_notification_email(doc["name"], doc["email"], doc["subject"], doc["message"])

    return doc


@app.get("/api/contact", response_model=list[ContactMessage])
async def list_contacts():
    """List all contact messages, sorted by newest first."""
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT id, name, email, subject, message, created_at FROM contact_messages ORDER BY created_at DESC")
        rows = cursor.fetchall()
        conn.close()
        
        results = [dict(row) for row in rows]
        return results
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Database error: {str(e)}")
