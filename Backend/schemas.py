from flask_marshmallow import Marshmallow
from models import Expense

ma = Marshmallow()

class ExpenseSchema(ma.SQLAlchemyAutoSchema):
    class Meta:
        model = Expense
        load_instance = True  # Optional: helps in converting JSON back to model objects