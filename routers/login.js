function submitForm() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const loginData = {
        email: email,
        password: password
    };

    fetch('http://localhost:3300/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
    })
    .then(response => {
        if (response.ok) {
            window.location.href = '../index.html'; 
        } else {
            throw new Error('Invalid email or password');
        }
    })
    .catch(error => {
        console.error('Giris Hatasi:', error);
        alert('Giriş basarisiz oldu. Lütfen e-posta ve sifrenizi kontrol edin.');
    });
}