from flask import Flask, request, jsonify, session, render_template, send_from_directory
from flask_pymongo import PyMongo
from flask_bcrypt import Bcrypt
from flask_cors import CORS
import os
import mimetypes
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
app.config["MONGO_URI"] = os.getenv("MONGO_URI", "mongodb://localhost:27017/musicapp")
app.secret_key = os.getenv("SECRET_KEY", "your_secret_key")
CORS(app, supports_credentials=True)
mongo = PyMongo(app)
bcrypt = Bcrypt(app)

# Register MIME types
mimetypes.add_type('audio/mpeg', '.mp3')

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/login')
def login_page():
    return render_template('login.html')

@app.route('/signup')
def signup_page():
    return render_template('signup.html')

@app.route('/signup', methods=['POST'])
def signup():
    data = request.json
    username = data['username']
    password = data['password']
    if mongo.db.users.find_one({'username': username}):
        return jsonify({'msg': 'Username already exists'}), 409
    hashed_pw = bcrypt.generate_password_hash(password).decode('utf-8')
    mongo.db.users.insert_one({'username': username, 'password': hashed_pw})
    return jsonify({'msg': 'Signup successful'}), 201

@app.route('/login', methods=['POST'])
def login():
    data = request.json
    username = data['username']
    password = data['password']
    user = mongo.db.users.find_one({'username': username})
    if user and bcrypt.check_password_hash(user['password'], password):
        session['username'] = username
        return jsonify({'msg': 'Login successful', 'username': username}), 200
    return jsonify({'msg': 'Invalid credentials'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return jsonify({'msg': 'Logged out'}), 200

@app.route('/check_auth', methods=['GET'])
def check_auth():
    if 'username' in session:
        return jsonify({'authenticated': True, 'username': session['username']})
    return jsonify({'authenticated': False})

@app.route('/static/<path:filename>')
def serve_static(filename):
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=int(os.getenv('PORT', 5000)))