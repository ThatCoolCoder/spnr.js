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

input('Did you remember to update both version numbers in /src/core.js (enter to compile)')

INPUT_FILES = readFile('inputFiles.txt').split('\n') # A list of files to join together
OUTPUT_FILE = 'build/spnr.js' # Where to output the compiled product

# Go through the input files and join them together
output = ''
for fileIdx in range(len(INPUT_FILES)):
    filename = INPUT_FILES[fileIdx]
    if len(filename) > 0:
        content = readFile(filename)
        output += content + '\n\n'

writeFile(OUTPUT_FILE, output)