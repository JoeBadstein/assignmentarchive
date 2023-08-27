

document.addEventListener('DOMContentLoaded', function() {
    var socket = io.connect(location.origin);
    console.log("socket on")
    socket.on('response', function(data) {
        console.log("response received", data.response)
        var sentences = data.response.split('. ');
        var i = 0;
        var intervalId = setInterval(function() {
            if (i >= sentences.length) {
                clearInterval(intervalId);
            } else {
                new SpeechSynthesisUtterance(sentences[i]);
                i++;
            }
        }, 45000);
    });


  
    var passwordInput = document.getElementById('password');
    passwordInput.addEventListener('change', function() {
        var password = passwordInput.value;
        var question = "Your question here"; // Replace with actual question
        socket.emit('new_question', {'password': password, 'question': question});
    });
});
