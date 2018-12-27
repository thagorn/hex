from flask_socketio import Namespace

class ChatSocket(Namespace):
    def __init__(self, namespace, socketio):
        self.socketio = socketio
        self.namespace = namespace
        Namespace.__init__(self, namespace)

    def on_connect(self):
        print 'Client connected'

    def on_disconnect(self):
        print 'Client disconnected'

    def _broadcast(self, action, data):
        self.socketio.emit(action, data, namespace=self.namespace)

    def on_chat(self, message):
        print "user said:", message
        self._broadcast("chat", {"text":message})
