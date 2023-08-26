async function checkPassword() {
    const input = document.getElementById('password').value;
    const response = await fetch(`/.netlify/functions/checkPassword?password=${input}`);
    
    if (response.status === 200) {
      window.location.href = 'success.html';
    } else {
      alert('Incorrect password');
    }
  }
  