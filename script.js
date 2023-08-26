document.addEventListener("DOMContentLoaded", function() {
    const passwordInput = document.getElementById('password');
    const errorMessage = document.getElementById('error-message');
    
    passwordInput.addEventListener("focus", function() {
      this.classList.add("focused");
      this.type = "text";  // Change to text while focused
    });
  
    passwordInput.addEventListener("blur", function() {
      this.classList.remove("focused");
      this.type = "password";  // Change back to password when not focused
    });
    
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
          window.location.href = '/success';
        } else {
          errorMessage.style.display = 'block';
          errorMessage.textContent = 'Incorrect password'+ response.status;
          console.log(data.status, response.body, response.statusText);
        }
    }
  });
  