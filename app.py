import json
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
from pathlib import Path
from urllib.parse import urlparse

ROOT = Path(__file__).resolve().parent

TITLES = [
    {
        "name": "RRR",
        "type": "indian",
        "year": 2022,
        "rating": 8.7,
        "meta": "Telugu epic action · Hindi/Tamil/Malayalam/Kannada dubs",
        "vibe": "Indian blockbuster",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Alia%20Bhatt%20at%20RRR%20promotions.jpg",
        "credit": "Wikimedia Commons",
    },
    {
        "name": "Dangal",
        "type": "indian",
        "year": 2016,
        "rating": 8.4,
        "meta": "Hindi sports drama · Family watch",
        "vibe": "Top rated",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Film%20set%20Dangal%20%282%29.jpg",
        "credit": "Sander.v.Ginkel / Wikimedia Commons",
    },
    {
        "name": "Baahubali: The Beginning",
        "type": "indian",
        "year": 2015,
        "rating": 8.1,
        "meta": "Telugu fantasy action · Pan-Indian saga",
        "vibe": "Epic",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Baahubali%20cast.jpg",
        "credit": "Bollywood Hungama / Wikimedia Commons",
    },
    {
        "name": "Mahanagar",
        "type": "indian",
        "year": 1963,
        "rating": 8.3,
        "meta": "Bengali drama · Satyajit Ray classic",
        "vibe": "Classic",
        "image": "https://commons.wikimedia.org/wiki/Special:FilePath/Poster%20Mahanagar%20by%20Satyajit%20Ray.jpg",
        "credit": "Wikimedia Commons",
    },
    {
        "name": "Demon Slayer: Kimetsu no Yaiba",
        "type": "anime",
        "year": 2019,
        "rating": 8.6,
        "meta": "Anime action fantasy · Arc tracker",
        "vibe": "Anime hit",
        "image": "https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=900&q=80",
        "credit": "Unsplash",
    },
    {
        "name": "Your Name",
        "type": "anime",
        "year": 2016,
        "rating": 8.8,
        "meta": "Anime romance fantasy · Movie night",
        "vibe": "Fan favorite",
        "image": "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?auto=format&fit=crop&w=900&q=80",
        "credit": "Unsplash",
    },
    {
        "name": "Spider-Man: Across the Spider-Verse",
        "type": "movie",
        "year": 2023,
        "rating": 8.6,
        "meta": "Animated superhero film · 2h 20m",
        "vibe": "Animated",
        "image": "https://images.unsplash.com/photo-1608889825103-eb5ed706fc64?auto=format&fit=crop&w=900&q=80",
        "credit": "Unsplash",
    },
    {
        "name": "Inception",
        "type": "movie",
        "year": 2010,
        "rating": 8.8,
        "meta": "Sci-fi thriller · Mind-bending cinema",
        "vibe": "IMDb-style pick",
        "image": "https://images.unsplash.com/photo-1485846234645-a62644f84728?auto=format&fit=crop&w=900&q=80",
        "credit": "Unsplash",
    },
]

class OtakuReelHandler(SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=str(ROOT), **kwargs)

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path == "/api/titles":
            payload = json.dumps({"titles": TITLES}, ensure_ascii=False).encode("utf-8")
            self.send_response(200)
            self.send_header("Content-Type", "application/json; charset=utf-8")
            self.send_header("Content-Length", str(len(payload)))
            self.end_headers()
            self.wfile.write(payload)
            return
        super().do_GET()

if __name__ == "__main__":
    server = ThreadingHTTPServer(("0.0.0.0", 4173), OtakuReelHandler)
    print("OtakuReel running at http://localhost:4173")
    server.serve_forever()
