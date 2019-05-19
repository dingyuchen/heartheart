from flask import Flask, request
from werkzeug import secure_filename

from heartbeat import *

app = Flask(__name__)

@app.route('/')
def home():
   return 'home'

@app.route('/uploader', methods = ['GET', 'POST'])
def upload_file():
   if request.method == 'POST':
      f = request.files['data']
      print(f.filename)
      f.save(secure_filename(f.filename))
      return predict(f.filename)

# curl -i -X POST -H "Content-Type: multipart/form-data" -F "data=@beats.wav" http://127.0.0.1:5000/uploader/

if __name__ == '__main__':
   app.run(debug = True)
