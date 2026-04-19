import os
import aiosmtplib
from email.message import EmailMessage
from dotenv import load_dotenv

load_dotenv()

async def send_outreach_email(recipient: str, subject: str, body: str):
    """
    Sends an email using SMTP.
    Requires environment variables: SMTP_SERVER, SMTP_PORT, SMTP_USER, SMTP_PASSWORD
    """
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 587))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    if not all([smtp_server, smtp_user, smtp_password]):
        print("SMTP configuration missing. Simulating success.")
        return True

    message = EmailMessage()
    message["From"] = smtp_user
    message["To"] = recipient
    message["Subject"] = subject
    message.set_content(body)

    try:
        await aiosmtplib.send(
            message,
            hostname=smtp_server,
            port=smtp_port,
            username=smtp_user,
            password=smtp_password,
            use_tls=(smtp_port == 465),
            start_tls=(smtp_port == 587),
        )
        return True
    except Exception as e:
        print(f"Error sending email: {e}")
        return False
