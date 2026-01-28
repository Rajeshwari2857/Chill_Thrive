 **GWOC 2026**

# **TECHNOLOGIES USED:**  
Backend: Flask  
Frontend: Vanilla HTML, CSS, JavaScript  
Database: PostgreSQL  
Server Deployment: Render  
Database Hosting: Neon  
# **FEATURES:**
1. Error Handlers:  
For example, 404 eorror redirects to our custom erorr page.
<img width="3817" height="1896" alt="Screenshot 2026-01-27 234936" src="https://github.com/user-attachments/assets/0f2c9788-a00b-4c3a-95ac-5afda8d1d8ed" />

2. Route Protection:  
Pages that require session (like Appointment Booking page) redirect to login page if user isnt logged in.
<img width="3824" height="1906" alt="Screenshot 2026-01-28 000446" src="https://github.com/user-attachments/assets/adf2b44f-dbfa-4249-b39f-45196f39b6e5" />

3. RBAC and Dynamic navigation bar:  
Customers are redirected to "Appointment Booking page" while admin and employees are redirected to 'Admin Dashboard'.
<img width="3839" height="1910" alt="Screenshot 2026-01-28 000704" src="https://github.com/user-attachments/assets/cd237431-b434-4ff4-a2ac-82cb28234760" />

Only Admin has the access to Add an Employee and can see the option in navigation bar. 
<img width="3839" height="407" alt="Screenshot 2026-01-28 000833" src="https://github.com/user-attachments/assets/d1a6d40c-00ff-4d38-8402-bb833354878c" />

4. Appointment Booking Validation:  
Appointment is only booked if the selected slot on the selected date is not already booked.  <img width="3839" height="1838" alt="Screenshot 2026-01-28 000946" src="https://github.com/user-attachments/assets/e7dac447-d75d-4c66-bdc4-a81553189be4" />

A date and time prior to the present cannot be selected while booking.  
<img width="3824" height="1868" alt="Screenshot 2026-01-28 001747" src="https://github.com/user-attachments/assets/5e584949-7819-4ee0-8a17-b96c3c6a80db" />

# 
**SETUP:**
1. Place a .env in root. Populate it values provided in .env.example:
```
SECRET_KEY =
ADMIN_EMAIL =
ADMIN_PASSWORD =
ADMIN_NAME =
ADMIN_PHONE =
DATABASE_URL =
```
Admin credentials are used to auto-create an admin record at the time of User table creation. Database is populated with user and Appointment tables when the server runs for the first time.  
<br>
2. Use a postgresSQL service to get a connection URL and place the value in DATABASE_URL key of .env.  
<br>
3. Create a virtual environment, activate it anf install the dependencies using the following commands
```
python -m venv env
env/scripts/activate
pip install -r requirements.txt
```
4. Run the server
```
python app.py
```
   



   
 
