import json

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

PACKAGE_FILE = 'package.json'
INPUT_FILES = readFile('scripts/inputFiles.txt').split('\n') # A list of files to join together
OUTPUT_FILE = 'build/spnr.js' # Where to output the compiled product

version = json.loads(readFile(PACKAGE_FILE))['version']

# Go through the input files and join them together
output = ''
for fileIdx in range(len(INPUT_FILES)):
    filename = INPUT_FILES[fileIdx]
    if len(filename) > 0:
        content = readFile(filename)
        content = content.replace('$$spnr-version$$', version)
        output += content + '\n\n'

writeFile(OUTPUT_FILE, output)