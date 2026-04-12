import mysql.connector
import os
from dotenv import load_dotenv

load_dotenv()

def get_db():
    db_config = {
        "host": os.getenv("DB_HOST", "localhost"),
        "user": os.getenv("DB_USER", "root"),
        "password": os.getenv("DB_PASSWORD", "Ravi@w7165!"),
        "database": os.getenv("DB_NAME", "ai_chatbot_db")
    }
    return mysql.connector.connect(**db_config)
