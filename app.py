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
        "image": "./assets/posters/rrr.svg",
        "credit": "Local artwork",
    },
    {
        "name": "Dangal",
        "type": "indian",
        "year": 2016,
        "rating": 8.4,
        "meta": "Hindi sports drama · Family watch",
        "vibe": "Top rated",
        "image": "./assets/posters/dangal.svg",
        "credit": "Sander.v.Ginkel / Local artwork",
    },
    {
        "name": "Baahubali: The Beginning",
        "type": "indian",
        "year": 2015,
        "rating": 8.1,
        "meta": "Telugu fantasy action · Pan-Indian saga",
        "vibe": "Epic",
        "image": "./assets/posters/baahubali.svg",
        "credit": "Bollywood Hungama / Local artwork",
    },
    {
        "name": "Mahanagar",
        "type": "indian",
        "year": 1963,
        "rating": 8.3,
        "meta": "Bengali drama · Satyajit Ray classic",
        "vibe": "Classic",
        "image": "./assets/posters/mahanagar.svg",
        "credit": "Local artwork",
    },
    {
        "name": "Demon Slayer: Kimetsu no Yaiba",
        "type": "anime",
        "year": 2019,
        "rating": 8.6,
        "meta": "Anime action fantasy · Arc tracker",
        "vibe": "Anime hit",
        "image": "./assets/posters/demon-slayer.svg",
        "credit": "Local artwork",
    },
    {
        "name": "Your Name",
        "type": "anime",
        "year": 2016,
        "rating": 8.8,
        "meta": "Anime romance fantasy · Movie night",
        "vibe": "Fan favorite",
        "image": "./assets/posters/your-name.svg",
        "credit": "Local artwork",
    },
    {
        "name": "Spider-Man: Across the Spider-Verse",
        "type": "movie",
        "year": 2023,
        "rating": 8.6,
        "meta": "Animated superhero film · 2h 20m",
        "vibe": "Animated",
        "image": "./assets/posters/spider-verse.svg",
        "credit": "Local artwork",
    },
    {
        "name": "Inception",
        "type": "movie",
        "year": 2010,
        "rating": 8.8,
        "meta": "Sci-fi thriller · Mind-bending cinema",
        "vibe": "IMDb-style pick",
        "image": "./assets/posters/inception.svg",
        "credit": "Local artwork",
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
