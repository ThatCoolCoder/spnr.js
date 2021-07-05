# Minify spnr.js using rjsmin https://github.com/ndparker/rjsmin

from sys import argv
from rjsmin import jsmin

# file read/write stuff
def writeFile(pathToFile, contents):
    file = open(pathToFile, 'w+', encoding='utf-8')
    file.write(str(contents))
    file.close()

def readFile(pathToFile):
    file = open(pathToFile, 'r', encoding='utf-8')
    contents = file.read()
    file.close()
    return contents

# Main program

if len(argv) > 1:
    INPUT_FILE = argv[1]
else:
    INPUT_FILE = 'build/spnr.js'
if len(argv) > 2:
    OUTPUT_FILE = argv[2]
else:
    OUTPUT_FILE = 'build/spnr.min.js'

def fatalError(message):
    input('Fatal error: ' + message + ' (press enter to quit)')
    quit()

unminifiedSpnr = None
minifiedSpnr = None
try:
    unminifiedSpnr = readFile(INPUT_FILE)
except:
    fatalError('Could not open ' + INPUT_FILE)

minifiedSpnr = jsmin(unminifiedSpnr, keep_bang_comments=True)

try:
    writeFile(OUTPUT_FILE, minifiedSpnr)
except:
    fatalError('Could not write minified spnr to ' + OUTPUT_FILE)