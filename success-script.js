document.addEventListener("DOMContentLoaded", function() {
    const password = sessionStorage.getItem("password");
    
    fetch(`/.netlify/functions/checkPassword?password=${password}`)
      .then(response => {
        if (response.status === 200) {
          document.getElementById("content").style.display = "block";
        } else {
          window.location.href = "index.html";
        }
      })
      .catch(() => window.location.href = "index.html");
  });
  