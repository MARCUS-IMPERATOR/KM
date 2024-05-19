const signupForm = document.getElementById('signup-form');
const signupMessage = document.getElementById('signup-message');

signupForm.addEventListener('submit', async (event) => {
    event.preventDefault(); 

    const firstName = document.getElementById('first-name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;


    const hashedPassword = await hashPassword(password); 

    const newUser = {
        id: Math.floor(Math.random() * 100000) + 1, 
        firstName,
        email,
        password: hashedPassword
    };

    try {
        const response = await fetch('http://localhost:4202/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(newUser)
        });

        if (!response.ok) {
            throw new Error(`Error adding user: ${response.statusText}`);
        }

        signupMessage.textContent = 'Signup successful!';
        signupForm.reset();
    } catch (error) {
        console.error('Error:', error);
        signupMessage.textContent = 'Signup failed. Please try again.';
    }
});


// Consider using bcrypt or a similar library
function hashPassword(password) {
  
    return `hashed_${password}`; 
}
