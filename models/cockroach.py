import psycopg2
import os
from dotenv import load_dotenv

load_dotenv()

def _setup():
    # Define your connection string
    connection_string = os.getenv('CONNECTION_STRING')

    try:
        connection = psycopg2.connect(connection_string)
        print("Connected to CockroachDB")
        return connection
    except psycopg2.Error as e:
        print("Error connecting to CockroachDB:", e)
        return None
    
# HELPERS #

def average(data):
    return sum(data) / len(data)
    
CONN = _setup()
CURSOR = CONN.cursor()
    
def getData(sql, values = ()):
    if not CURSOR:
        return
    
    CURSOR.execute(sql, values)
    
    rows = CURSOR.fetchall()
    
    return rows

def updateRow(sql, values):
    if not CURSOR:
        return
    
    CURSOR.execute(sql, values)
    
    CONN.commit()
    
def inputToSQL(category, name = ''):
    
    if category == 'get_all':
        sql = 'SELECT * FROM public.plants main, public."plant-data" data ORDER BY data."createdAt" ASC LIMIT 25'
        dataRecieved = getData(sql)
        
        if dataRecieved == []:
            return {}
        
        res = {}
        
        for d in dataRecieved:
            if d[1] not in res:
                res[d[1]] = {
                    'name': d[1],
                    'isWatering': d[2],
                    'startTime': -1,
                    'endTime': -1,
                    'moistureValue': [],
                    'sunExposure': [],
                }
            
            res[d[1]]['startTime'] = min(res[d[1]]['startTime'], d[3]) if res[d[1]]['startTime'] != -1 else d[3]
            res[d[1]]['endTime'] = max(res[d[1]]['endTime'], d[4]) if res[d[1]]['endTime'] != -1 else d[4]
            
            res[d[1]]['moistureValue'].append(d[8])
            res[d[1]]['sunExposure'].append(d[7])
            
        for key in res:
            res[key]['moistureValue'] = average(res[key]['moistureValue'])
            res[key]['sunExposure'] = average(res[key]['sunExposure'])
        
        return [res[key] for key in res]
    
    if category == 'get_specific':
        sql = ['SELECT * ',
                'FROM public.plants main',
                'INNER JOIN public."plant-data" data ON main."name"=data."name"',
                'WHERE main."name" = %s',
                'ORDER BY data."createdAt" ASC',
                'LIMIT 25']
        
        dataRecieved = getData(" ".join(sql), (name,))
        
        if dataRecieved == []:
            return {}
        
        res = {
            'name': dataRecieved[0][1],
            'isWatering': dataRecieved[0][2],
            'startTime': min(indiv[3] for indiv in dataRecieved),
            'endTime': max(indiv[3] for indiv in dataRecieved),
            'moistureValue': average([indiv[8] for indiv in dataRecieved]),
            'sunExposure': average([indiv[7] for indiv in dataRecieved]),
        }
        
        return res
    
    if category in ('water', 'not_water'):
        return updateRow(f'UPDATE public.plants SET "isWatering"= %s WHERE name= %s', (category == 'water', name))
