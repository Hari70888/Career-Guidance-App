from flask import Blueprint, request, jsonify
from pymongo import MongoClient, errors
from bson.objectid import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import os
import logging
from dotenv import load_dotenv

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


# Load environment variables
load_dotenv()

# MongoDB connection
try:
    client = MongoClient(os.getenv('MONGO_URI'), serverSelectionTimeoutMS=5000)
    client.server_info()  # Force a call to check connection
    db = client.career_guidance
    users = db.users
    logger.info("Successfully connected to MongoDB")
except errors.ServerSelectionTimeoutError as e:
    logger.error(f"Failed to connect to MongoDB: {e}")
    raise


auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/api/health', methods=['GET'])
def health_check():
    try:
        # Test MongoDB connection
        client.server_info()
        return jsonify({
            'status': 'healthy',
            'database': 'connected'
        }), 200
    except errors.PyMongoError as e:
        logger.error(f"MongoDB connection error: {e}")
        return jsonify({
            'status': 'unhealthy',
            'database': 'disconnected',
            'error': str(e)
        }), 500


@auth_bp.route('/api/signup', methods=['POST'])
def signup():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    first_name = data.get('first_name')
    last_name = data.get('last_name')
    
    if not email or not password or not first_name or not last_name:
        return jsonify({'error': 'All fields are required'}), 400
        
    if users.find_one({'email': email}):
        return jsonify({'error': 'User already exists'}), 400
        
    hashed_password = generate_password_hash(password)
    user = {
        'email': email,
        'password': hashed_password,
        'first_name': first_name,
        'last_name': last_name
    }
    try:
        result = users.insert_one(user)
        if result.inserted_id:
            logger.info(f"User created successfully: {email}")
            return jsonify({
                'message': 'User created successfully',
                'user': {
                    'first_name': first_name,
                    'last_name': last_name,
                    'email': email
                }
            }), 201
        else:
            logger.error("Failed to insert user into MongoDB")
            return jsonify({'error': 'Failed to create user'}), 500
    except errors.PyMongoError as e:
        logger.error(f"Database error during signup: {e}")
        return jsonify({'error': 'Database error occurred'}), 500


@auth_bp.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    
    user = users.find_one({'email': email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({'error': 'Invalid credentials'}), 401
        
    return jsonify({
        'message': 'Login successful',
        'user_id': str(user['_id']),
        'first_name': user['first_name'],
        'last_name': user['last_name']
    }), 200
