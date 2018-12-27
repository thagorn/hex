from flask import render_template
from flask.views import View

class MapAction(View):
    def dispatch_request(self, action):
        print action
        return render_template("chat.html")
