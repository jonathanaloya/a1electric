from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer
import os
from pathlib import Path
from urllib.parse import unquote, urlsplit


ROOT = Path(__file__).resolve().parent
PORT = int(os.environ.get("PORT", "8080"))


class CleanUrlHandler(SimpleHTTPRequestHandler):
    def translate_path(self, path):
        request_path = unquote(urlsplit(path).path)

        if request_path == "/":
            return str(ROOT / "index.html")

        clean_path = request_path.lstrip("/")
        file_path = ROOT / clean_path

        if file_path.is_file():
            return str(file_path)

        html_path = ROOT / f"{clean_path}.html"
        if html_path.is_file():
            return str(html_path)

        return str(file_path)


if __name__ == "__main__":
    server = ThreadingHTTPServer(("localhost", PORT), CleanUrlHandler)
    print(f"A1 Electricals site running at http://localhost:{PORT}")
    server.serve_forever()
