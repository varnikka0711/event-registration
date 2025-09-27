// script.js
const form = document.querySelector('form');
const message = document.createElement('p');
form.appendChild(message);

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fname = document.getElementById('fname').value.trim();
    const lname = document.getElementById('lname').value.trim();
    const email = document.getElementById('email').value.trim();

    // Basic validation
    if (!fname || !lname || !email) {
        message.textContent = "Please fill all fields.";
        message.style.color = "red";
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        message.textContent = "Please enter a valid email.";
        message.style.color = "red";
        return;
    }

    // Send data to backend
    try {
        const response = await fetch('/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ fname, lname, email })
        });

        const data = await response.json();
        if (data.success) {
            message.textContent = "Registration successful!";
            message.style.color = "green";
            form.reset();
        } else {
            message.textContent = "Something went wrong.";
            message.style.color = "red";
        }
    } catch (error) {
        console.error(error);
        message.textContent = "Error connecting to server.";
        message.style.color = "red";
    }
});
