import os
import requests

BASE_URL = "http://127.0.0.1:8000/api/"


def upload_csv(file_path, auth):
    with open(file_path, "rb") as f:
        filename = os.path.basename(file_path)
        # include filename and explicit content type
        files = {"file": (filename, f, "text/csv")}
        r = requests.post(
            f"{BASE_URL}upload/",
            files=files,
            auth=(auth['username'], auth['password']),
            timeout=30,
        )

    # Provide clearer error message containing backend response body
    if not r.ok:
        try:
            err = r.json()
        except Exception:
            err = r.text
        raise Exception(f"Upload failed: {err}")

    return r.json()

def get_latest_summary(auth):
    r = requests.get(f"{BASE_URL}summary/latest/", auth=(auth['username'], auth['password']))
    r.raise_for_status()
    return r.json()

def get_history(auth):
    r = requests.get(f"{BASE_URL}history/", auth=(auth['username'], auth['password']))
    r.raise_for_status()
    return r.json()

def download_pdf(auth, save_path):
    r = requests.get(f"{BASE_URL}report/pdf/", auth=(auth['username'], auth['password']), stream=True)
    r.raise_for_status()
    with open(save_path, "wb") as f:
        for chunk in r.iter_content(chunk_size=8192):
            f.write(chunk)
