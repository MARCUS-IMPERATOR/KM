const loginForm = document.getElementById('login-form');
const loginMessage = document.getElementById('login-message');

loginForm.addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent default form submission

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://localhost:4202/users');
        if (!response.ok) {
            throw new Error(`Failed to fetch users: ${response.statusText}`);
        }
            
        const users = await response.json(); // Parse the JSON response
        const hashedPassword= await hashPassword(password);
        const user = users.find(user => user.email === email && user.password === hashedPassword);

        if (user) {
            loginMessage.textContent = 'Login successful!';
            console.log('Login successful:', user); // Placeholder for further actions
            localStorage.setItem('user', JSON.stringify(user));
            window.location.href = "../index.html";
        } else {
            loginMessage.textContent = 'Login failed. Please check your email and password.';
        }
    } catch (error) {
        console.error('Error:', error);
        loginMessage.textContent = 'Login failed. Please check your email and password.';
    }
        function hashPassword(password)
        {
            return `hashed_${password}`;
        }    

});





 