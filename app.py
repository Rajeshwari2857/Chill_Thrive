from flask import Flask, render_template


app = Flask(__name__)


@app.route('/')
@app.route('/home')
def chill_thrive():
    return render_template('chill_thrive.html')


@app.route('/founder')
def founder():
    return render_template("founder.html", title="Founder")


@app.route("/events")
def events():
    return render_template("events.html", title = "Events")


@app.route("/jacuzzi")
def jacuzzi():
    return render_template("jacuzzi.html", title = "Jacuzzi")


@app.route("/ice_bath")
def ice_bath():
    return render_template("ice_bath.html", title = "Ice bath")


@app.route("/steam_bath")
def steam_bath():
    return render_template("steam_bath.html", title = "Steam bath")


if __name__ == "__main__":
    app.run(debug=True)
