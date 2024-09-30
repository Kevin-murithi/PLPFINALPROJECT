// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent default form submission

    // Get form input values
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Validate form inputs
    if (!username || !password) {
        alert('Please fill in all fields.');
        return;
    }

    // Prepare the data for submission
    const data = {
        username,
        password
    };

    try {
        // Send a POST request to the login endpoint
        const response = await fetch('/api/users/login', {  // Corrected URL path
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Parse the response
        const result = await response.json();

        if (response.ok && result.success) {
            // Redirect to the home page on successful login
            window.location.href = '/home'; 
        } else {
            // Show error message on failed login
            alert(result.message || 'Login failed. Please check your credentials and try again.');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred. Please try again later.');
    }
});
