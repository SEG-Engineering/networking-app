User Registration:

Users can register by providing their email, password, and other required details.
The password is hashed and stored securely in the database.
A JWT is issued upon successful registration.
User Login:

Users log in with their email and password.
On successful login, a JWT is issued, and the session is managed.
Forgot My Password:

Users can request a password reset.
A reset token is sent via email, and the user can reset their password using this token.
Remember Me:

A long-lived JWT (or refresh token) is issued to manage persistent sessions.
