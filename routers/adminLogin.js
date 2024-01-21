function adminLogin() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch('http://localhost:3300/adminlogin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error(response.statusText);
        }
    })
    .then(data => {
        window.location.href = data.redirect;
    })
    .catch(error => {
        console.error('Login Error:', error.message);

        if (error.message.includes('permissions')) {
            alert('You do not have permission for admin login.');
        } else {
            alert('Login failed. Please check your email and password.');
        }
    });
}