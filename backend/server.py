from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app) # Frontend backend kooda pesa ithu thevai

# Dummy database for testing
users = [
    {"username": "admin", "password": "password123"}
]

# Login Endpoint
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data.get('username')
    password = data.get('password')

    # Username, password correct-ah irukkanu check pandrom
    user_found = next((u for u in users if u['username'] == username and u['password'] == password), None)

    if user_found:
        return jsonify({"success": True, "message": "thothukite erukiyeda !!!"}), 200
    else:
        return jsonify({"success": False, "message": "Invalid username or password."}), 401

# Start the server
if __name__ == '__main__':
    print("Backend server is running on http://localhost:5000")
    app.run(port=5000, debug=True)