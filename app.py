from flask import Flask, render_template, send_from_directory
import os
from datetime import datetime

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html', year=datetime.now().year)

@app.route('/quem-somos')
def about():
    return render_template('pages/about.html', year=datetime.now().year)

@app.route('/fale-conosco')
def contact():
    return render_template('pages/contact.html', year=datetime.now().year)

@app.route('/seguranca-e-privacidade')
def privacy():
    return render_template('pages/privacy.html', year=datetime.now().year)

@app.route('/politica-de-troca')
def exchange():
    return render_template('pages/exchange.html', year=datetime.now().year)

@app.route('/envio-da-encomenda')
def order_shipping():
    return render_template('pages/shipping.html', year=datetime.now().year)

@app.route('/politica-de-entrega')
def delivery():
    return render_template('pages/delivery.html', year=datetime.now().year)

@app.route('/perguntas-frequentes')
def faq():
    return render_template('pages/faq.html', year=datetime.now().year)

@app.route('/static/<path:filename>')
def serve_static(filename):
    if filename.startswith('assets/'):
        return send_from_directory('attached_assets', filename.replace('assets/', '', 1))
    return send_from_directory('static', filename)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=8080, debug=True)