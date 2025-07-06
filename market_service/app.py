from flask import Flask, jsonify
import yfinance as yf
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/price/<symbol>")
def get_price(symbol):
    try:
        stock = yf.Ticker(symbol)
        data = stock.history(period="1d", interval="1m")
        if data.empty:
            return jsonify({"error": "No data found"}), 404
        latest = data.iloc[-1]
        return jsonify({
            "symbol": symbol.upper(),
            "price": round(latest["Close"], 2),
            "timestamp": latest.name.strftime("%Y-%m-%d %H:%M")
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(port=5001)
