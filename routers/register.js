function submitForm() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const jsonData = {};

    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    fetch('http://localhost:3300/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        alert('Kayit başariyla tamamlandi.');

        window.location.href = 'login.html';
    })
    .catch(error => {
        console.error('Error:', error);
        alert('Kayit sirasinda bir hata oluştu. Lütfen tekrar deneyin.');
    });
}
