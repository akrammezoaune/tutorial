from flask import Flask, render_template, request
from flask import redirect
from flask import jsonify
import json



from flaskext.mysql import MySQL

app = Flask(__name__)

mysql = MySQL()

#la connexion avec la base de donne db_university2 (erreur de frappe l hors de la saisie des commande sql j ai cree db_university2 a lieu de db_university)
app.config['MYSQL_DATABASE_HOST'] 	  = 'localhost'
app.config['MYSQL_DATABASE_PORT'] 	  = 3306
app.config['MYSQL_DATABASE_USER'] 	  = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'pass_root'
app.config['MYSQL_DATABASE_DB'] 	  = 'db_university2'


mysql.init_app(app)


app = Flask(__name__)


@app.route('/')
def index():
	return render_template('index.html')
	
@app.route('/api/data')
def doGetData():
	conn = mysql.connect()	 
	cursor =conn.cursor()	 
	cursor.execute("SELECT annee , count(nom) as nb_etu from resultats group by annee")	 
	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)



@app.route('/api/data3')
def doGetData2():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	
    
	tuple_years = cursor.fetchall()

	liste_years =  [item[0] for item in tuple_years]
	data["years"]=	liste_years

	cursor.execute("SELECT DISTINCT specialite FROM resultats")	

	specialite_tp = cursor.fetchall()
	liste_specialite =  [item[0] for item in specialite_tp]
	
	for specialite in liste_specialite:
		cursor.execute("SELECT count(nom) as nb_etu FROM resultats WHERE specialite='"+specialite+"' group by annee")	
		nb_tuple = cursor.fetchall()
		nb_list =  [item[0] for item in nb_tuple]
		data["datasets"].append({"label":specialite, "data":nb_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON

@app.route('/api/data2')
def doGetData3():
	
	data = {"years":[], "datasets":[]}
	
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT DISTINCT annee FROM resultats")	
    
	years_tuple = cursor.fetchall()

	years_list =  [item[0] for item in years_tuple]
	data["years"]=years_list	

	cursor.execute("SELECT DISTINCT sexe FROM resultats")	

	sexe_tuple = cursor.fetchall()
	sexe_list =  [item[0] for item in sexe_tuple]
	
	for sexe in sexe_list:
		cursor.execute("SELECT count(nom) as nb FROM resultats WHERE sexe='"+sexe+"' group by annee")	
		nb_tuple = cursor.fetchall()
		nb_list =  [item[0] for item in nb_tuple]
		data["datasets"].append({"label":sexe, "data":nb_list})	
	
	data_JSON = json.dumps(data)	
	return data_JSON 

@app.route('/api/data4')
def doGetData4():
	conn = mysql.connect()	
	cursor =conn.cursor()	
	cursor.execute("SELECT annee , count(nom) as nb_etu from resultats where moyenne >=16 group by annee ")	

	data = cursor.fetchall()	
	row_headers=[x[0] for x in cursor.description]

	cursor.close()

	json_data=[]
	for result in data:
		json_data.append(dict(zip(row_headers,result)))					
					
	return jsonify(json_data)


if __name__ == '__main__':
	app.run(debug=True, port=5000)
	