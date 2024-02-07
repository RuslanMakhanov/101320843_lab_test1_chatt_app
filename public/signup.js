document.getElementById('signupForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const userData = {
        username: document.getElementById('username').value,
        firstname: document.getElementById('firstname').value,
        lastname: document.getElementById('lastname').value,
        password: document.getElementById('password').value,
    };

    // Send a POST request to the server with the user data
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // Redirect to login page or show a success message
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
