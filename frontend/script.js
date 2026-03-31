document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault(); 

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const messageEl = document.getElementById('message');
    
    // Get the new elements we want to control
    const loginForm = document.getElementById('loginForm');
    const popupImage = document.getElementById('popupImage');
    const title = document.getElementById('title');
    try {
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });

        const data = await response.json();

        if (data.success) {
            // --- SUCCESS: POP UP THE IMAGE ---
            messageEl.style.color = 'green';
            messageEl.textContent = data.message;
            
            // 1. Hide the login form
            loginForm.style.display = 'none';
            
            // 2. Change the title
            title.textContent = "Success!";
            
            // 3. Show the image (The Pop-up effect)
            popupImage.style.display = 'block';

        } else {
            // --- FAILED LOGIN ---
            messageEl.style.color = 'red';
            messageEl.textContent = data.message;
        }
    } catch (error) {
        console.error('Error:', error);
        messageEl.style.color = 'red';
        messageEl.textContent = 'Cannot connect to the server.';
    }
});