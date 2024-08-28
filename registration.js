form.addEventListener('submit', function(e) {
    e.preventDefault();  // Prevent the default form submission

    const formData = new FormData(form);
    const userData = Object.fromEntries(formData.entries());

    // Send a POST request to the server
    fetch('http://localhost:3000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Registration successful!');
            window.location.href = 'indexv2.html'; // Redirect after successful registration
        } else {
            alert('Registration failed: ' + data.message);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred during registration.');
    });
});
