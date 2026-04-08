# SpendWise - Personal Finance Tracker

SpendWise is a full-stack web application designed for structured expense tracking. Built with a focus on **Interface Safety** and **Predictable Logic**, it allows users to log expenditures and categorize them for better financial visibility.

## 🚀 Quick Start

### 1. Prerequisites
* Python 3.12+
* Node.js & npm
* MySQL Server

### 2. Backend Setup
1. Navigate to `/Backend`
2. Create a virtual environment: `python -m venv .venv`
3. Activate it: `.venv\Scripts\activate`
4. Install dependencies: `pip install -r requirements.txt`
5. Run the app: `python app.py`

### 3. Frontend Setup
1. Navigate to `/frontend`
2. Install dependencies: `npm install`
3. Run the development server: `npm run dev`

## 🛠️ Key Technical Decisions

1. Relational Database (MySQL)
I chose MySQL over NoSQL because financial data requires **Strict Consistency**. By using a relational schema, I ensured **Referential Integrity** (an expense cannot exist without a valid user ID).

2. Validation Layer (Marshmallow)
To satisfy the **Interface Safety** requirement, I implemented Marshmallow schemas. This ensures that incoming JSON data is validated for type and presence before it ever interacts with the database models.

3. Decoupled Architecture
The project uses a clear separation between the **Flask REST API** and the **React (Vite) Frontend**. This allows for better **Change Resilience**, as the frontend styling can be overhauled without touching the core business logic in the backend.

4. Tailwind CSS for UX
I utilized Tailwind CSS to create a clean, centered, and responsive UI, focusing on **Simplicity** and ease of use.


## 🧩 System Architecture
The application follows a standard **Three-Tier Architecture**:
1. **Presentation Tier:** React.js (Vite) utilizing Tailwind CSS for a responsive, component-based UI.
2. **Logic Tier:** Flask (Python) REST API handling business logic and ORM operations.
3. **Data Tier:** MySQL Relational Database ensuring ACID compliance for financial records.

I implemented a **JSON-based communication contract** between the tiers, using CORS for secure cross-origin resource sharing.