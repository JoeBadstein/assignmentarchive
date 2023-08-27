from flask import Flask, render_template, request, redirect, url_for, session
from flask_socketio import SocketIO, join_room
from replit import db
from datetime import datetime, timedelta
import json
from claude_api import Client
import os

app = Flask(__name__)
app.config['SECRET_KEY'] = 'supersecret'
socketio = SocketIO(app)
claudeapi = Client(os.environ['claudekey'])
@app.route('/', methods=['GET', 'POST'])
def set_password():
    if request.method == 'POST':
        password = request.form.get('password')
        if not password:
            return
        if password.lower() == 'deletedb':
            for keys in db.keys():
                del db[keys]
            print("all listeners deleted")
        elif password in db:
            return redirect(url_for('existing_password'))
        else:
            db[password] = json.dumps({"created_at": datetime.utcnow().strftime('%Y-%m-%d %H:%M:%S')})
            return redirect(url_for('new_password_success'))
    return render_template('set_password.html')

@app.route('/new-password-success')
def new_password_success():
    return render_template('new_password_success.html')

@app.route('/existing-password')
def existing_password():
    return render_template('existing_password.html')

@socketio.on('join')
def on_join(data):
    password = data['password']
    join_room(f"response_{password}")
  
def call_claude_ai_api(query, attatchpath=None):
  print("sending to claude\n\n\n\n\n\n\n\n\n\n")
  response=claudeapi.send_message(query, conversation_id = claudeapi.create_new_chat()['uuid'])
  print(response)
  return response


@socketio.on('new_question')
def handle_new_question(data):
    password = data['password']
    question = data['question']
    # Replace this with your Claude AI API function
    response = call_claude_ai_api(question)
    
    # Emit the response to the 'response' room
    socketio.emit('response', {'response': response}, room=f"response_{password}")

if __name__ == '__main__':
    socketio.run(app, debug=True, host='0.0.0.0')



