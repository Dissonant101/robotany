from flask import Flask, jsonify, request
import main as Driver
import os
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

data = {
    'message': 'Hello, World!'
}

@app.route('/api', methods=['GET'])
def get_message():
    rq = request.args
    res = Driver.makeRequest(rq.get('input'))
    return jsonify({ 'response': res })

if __name__ == 'main':
    port = int(os.environ.get('PORT', 5000))
    app.run(debug=True, host='0.0.0.0', port=port)