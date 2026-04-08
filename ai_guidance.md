# AI Guidance Rules for SpendWise
1. **Schema Validation**: All incoming API data must be validated using Marshmallow before database insertion.
2. **Type Safety**: All Python functions must include type hints.
3. **ORM Usage**: Use SQLAlchemy for all database interactions; no raw SQL strings.
4. **Error Handling**: Use try-except blocks for database operations and return consistent JSON error messages.


Prompts Used: "Generating Flask-SQLAlchemy boilerplates," "Tailwind CSS centered card layouts."

Human Verification: "I manually corrected the CORS configuration when the AI-generated code caused connection errors."

Constraint Compliance: "I ensured all AI suggestions followed the 'No Over-engineering' rule to keep the codebase simple."