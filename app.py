from flask import Flask, request, jsonify
from flask_bcrypt import Bcrypt
from flask_cors import CORS
from google import genai
import os
from dotenv import load_dotenv


from database import get_db

load_dotenv()

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))


app = Flask(__name__)
CORS(app)
CORS(app, resources={r"/*": {"origins": "*"}})
bcrypt = Bcrypt(app)

# --- 2. AUTHENTICATION ROUTES ---

@app.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    conn = get_db()
    cursor = conn.cursor()
    try:
        cursor.execute("INSERT INTO users (username, email, password_hash) VALUES (%s, %s, %s)",
                       (data['username'], data['email'], hashed_pw))
        conn.commit()
        return jsonify({"message": "User registered!"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 400
    finally:
        conn.close()

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM users WHERE email = %s", (data['email'],))
    user = cursor.fetchone()
    conn.close()
    
    if user and bcrypt.check_password_hash(user['password_hash'], data['password']):
        return jsonify({"id": user['id'], "username": user['username'], "email": user['email']}), 200
    return jsonify({"message": "Invalid credentials"}), 401

# --- 3. CHAT LOGIC WITH DATABASE HISTORY ---

@app.route('/api/chat', methods=['POST'])
def chat():
    data = request.json
    user_id = data.get('user_id')
    if not user_id: user_id = 1 # For Temporary testing 
    user_msg = data.get('message')
    conv_id = data.get('conversation_id') # Sidebaar madhil session ID

    # 1. Gemini kadhun uttar ghene
    try:
        response = client.models.generate_content(
    model='gemini-2.0-flash',
    contents=user_msg
        )

        bot_reply = response.text

        # 2. Database madhe save karne
        conn = get_db()
        cursor = conn.cursor()
        
        # Jar navin conversation asel tar pahile te create kara
        if not conv_id:
            cursor.execute("INSERT INTO conversations (user_id, title) VALUES (%s, %s)", (user_id, user_msg[:30]))
            conv_id = cursor.lastrowid
        
        # User cha message save kara
        cursor.execute("INSERT INTO chat_history (conversation_id, sender, message_text) VALUES (%s, 'user', %s)", (conv_id, user_msg))
        # Bot cha message save kara
        cursor.execute("INSERT INTO chat_history (conversation_id, sender, message_text) VALUES (%s, 'bot', %s)", (conv_id, bot_reply))
        
        conn.commit()
        conn.close()
        
        return jsonify({"response": bot_reply, "conversation_id": conv_id})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# --- 4. ADMIN ROUTES ---

@app.route('/api/admin/stats', methods=['GET'])
def get_stats():
    conn = get_db()
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT COUNT(*) as total_users FROM users")
    u_count = cursor.fetchone()
    cursor.execute("SELECT COUNT(*) as total_msgs FROM chat_history")
    m_count = cursor.fetchone()
    conn.close()
    return jsonify({"users": u_count['total_users'], "chats": m_count['total_msgs']})

if __name__ == '__main__':
    app.run(debug=True, port=5000)