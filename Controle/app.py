from flask import Flask, render_template, session, redirect

from extensions import db, sess
from models import User
from routes import api


app = Flask(__name__)

app.config["SECRET_KEY"] = "dev-secret"
app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///app.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

app.config["SESSION_TYPE"] = "sqlalchemy"
app.config["SESSION_SQLALCHEMY"] = db

db.init_app(app)
sess.init_app(app)

app.register_blueprint(api)

with app.app_context():
    db.create_all()



@app.route('/', methods=['GET'])
def home():
    listItemTest = {"Pomme","Poire","Abricot"}
    username = session.get("user",None)
    if username is not None:
        return render_template("app.html",user=User.get_by_username(username),liste=listItemTest) #le user = ... Permet de transmettre le Model DB User...
    return render_template("auth.html")

# Page qui vérifie l'authentification
@app.route('/page2', methods=['GET'])
def pageAuth():
    username = session.get("user",None)
    if username is not None:
        return render_template("page2.html", user=User.get_by_username(username))
    return redirect("/")

# Page qui ne vérifie pas l'authentification et est accessible par tous
@app.route('/page3', methods=['GET']) 
def pageNonAuth():
    return render_template("page3.html")



if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)