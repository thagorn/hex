from flask import Flask, render_template
from flask_socketio import SocketIO
from flask_login import login_required, login_user, LoginManager

from user.user import User
from urlactions.mapaction import MapAction
from sockets.chatsocket import ChatSocket

app = Flask(__name__, template_folder="../templates", static_folder="../static")
login_manager = LoginManager()
app.config['SECRET_KEY'] = 'extra secret key'
PORT = 8080
HOST = '0.0.0.0'

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/chat")
@login_required
def chat_screen():
    return render_template("chat.html")

@app.route("/login", methods=["POST"])
def login():
    login_user()

@login_manager.user_loader
def load_user(user_id):
    return User(user_id)

def register_sockets(socketio):
    socketio.on_namespace(ChatSocket("/chatsocket", socketio))

def register_urls():
    app.add_url_rule("/map/<action>", view_func=MapAction.as_view('mapaction'))

def main():
    socketio = SocketIO(app)
    login_manager.init_app(app)
    register_urls()
    register_sockets(socketio)

    socketio.run(app, port=PORT, host=HOST, debug=True)

if __name__ == '__main__':
    main()
