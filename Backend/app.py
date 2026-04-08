import os
from flask_cors import CORS
import urllib.parse
from flask import Flask, jsonify, request
from flask_cors import CORS
from models import db, Expense
from schemas import ma, ExpenseSchema

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

DATABASE_URL = os.environ.get('DATABASE_URL')

# 1. Database Configuration
raw_password = "Chanikya@123"
safe_password = urllib.parse.quote_plus(raw_password)
app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+mysqlconnector://root:{safe_password}@localhost/spendwise_db'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# 2. Initialize Extensions
db.init_app(app)
ma.init_app(app)
expense_schema = ExpenseSchema()
expenses_schema = ExpenseSchema(many=True)


# 3. Routes
@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({"status": "success", "message": "Backend is running!"})


@app.route('/api/expenses', methods=['GET'])
def get_expenses():
    all_expenses = Expense.query.all()
    return jsonify(expenses_schema.dump(all_expenses))


@app.route('/api/expenses', methods=['POST'])
def add_expense():
    data = request.get_json()
    new_expense = Expense(
        title=data['title'],
        amount=data['amount'],
        category=data.get('category', 'General'),
        user_id=1
    )
    db.session.add(new_expense)
    db.session.commit() # <--- CRITICAL LINE
    return jsonify({"message": "Success"}), 201

if DATABASE_URL:
    # Render/Aiven fix: Ensure it uses the pymysql driver
    if DATABASE_URL.startswith("mysql://"):
        DATABASE_URL = DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    # Your local connection
    app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:password@localhost/spend_wise'

CORS(app)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)