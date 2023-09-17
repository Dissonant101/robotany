import requests

PORT = 3000

dictionary = {'Update on plant': 'get_specific', 
              'Get status': 'get_specific', 
              'Water plant': 'water',
              'Increase moisture': 'water',
              'Get basic info': 'get_specific',
              'Stop watering plant': 'not_water',
              'Unknown': 'get_all',
              'Doing': 'get_specific'
              }

def categorize(input):
    input = {
        'text': input,
        'categories': list(dictionary.keys())
    }

    res = requests.post(url=f'http://0.0.0.0:{PORT}/categorize', json=input).json()

    # print(res.json())

    if (res == {}):
        return 'get_all'
    # print()
    return dictionary[max(res, key=res.get)]


