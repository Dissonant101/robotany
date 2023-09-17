import cockroach as roach
import bento as bn
import cohereDriver as ch

def makeRequest(input):

    identified = bn.categorize(input)

    if identified == 'get_all':
        name = ''
    else:
        name = ch.extractName(input)

    if not name and identified == 'get_specific':
        identified = 'get_all'
    elif not name and identified in ('water', 'not_water'):
        return "Uh oh - couldn't get a read on that name! Try again."
    elif name:
        name = name[1:]

    return roach.inputToSQL(identified, name)

print(makeRequest('Please water my plant Jerry!!'))
print(makeRequest('How is Jerry doing?'))