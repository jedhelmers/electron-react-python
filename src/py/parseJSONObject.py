from sys import argv
import json

def txt_return(str):
    obj = json.loads(str)
    obj['sum'] = obj['a'] + obj['b']

    return json.dumps(obj)


if __name__ == '__main__':
    print(txt_return(argv[1]))