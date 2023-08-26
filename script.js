function checkPassword() {
    const input = document.getElementById('password').value;
    const correctPassword = 'moti'; // This should ideally not be stored in plaintext
  
    if (input === correctPassword) {
      window.location.href = 'success.html';
    } else {
      alert('Incorrect password');
    }
  }
  