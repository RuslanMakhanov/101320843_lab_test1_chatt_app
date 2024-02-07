document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const loginData = {
        username: document.getElementById('username').value,
        password: document.getElementById('password').value,
    };

    fetch('/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => response.json())
    .then(data => {
        if(data.success) {
            console.log('Login successful:', data);
        } else {
            console.log('Login failed:', data.message);
        }
    })
    .catch((error) => {
        console.error('Error:', error);
    });
});
