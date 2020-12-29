from . import db

class Album(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    # discogs_id = db.Column(db.Integer, unique=True)
    title = db.Column(db.String(80), nullable=False)
    artist = db.Column(db.String(30), nullable=False)
    year = db.Column(db.Integer)
    genre = db.Column(db.String(20))
    date_added = db.Column(db.String(100))
    cover = db.Column(db.String(300), nullable=False)
