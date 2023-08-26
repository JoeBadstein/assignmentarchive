document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    
    passwordInput.addEventListener("keyup", function(event) {
      if (event.key === "Enter") {
        checkPassword();
      }
    });
  
    async function checkPassword() {
      const input = passwordInput.value;
      const response = await fetch(`/.netlify/functions/checkPassword?password=${input}`);
      
      if (response.status === 200) {
        sessionStorage.setItem("password", input);
        window.location.href = 'success.html';
      } else {
        errorMessage.style.display = 'block';
        errorMessage.textContent = 'Incorrect password';
      }
    }
  });
  