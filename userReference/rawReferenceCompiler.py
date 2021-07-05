from referenceConsts import *

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

INPUT_FILES = readFile('rawReferenceFiles.txt').split('\n') # A list of files to compile is
OUTPUT_FILE = 'rawReference.txt' # Where the compiled reference is saved

# Go through the input files and join them together
output = ''
for fileIdx in range(len(INPUT_FILES)):
    filename = INPUT_FILES[fileIdx]
    if len(filename) > 0:
        content = readFile(filename)
        output += content

        # If there are more files, the put a splitter
        isLastFile = (fileIdx == len(INPUT_FILES) - 1)
        if not isLastFile:
            # The newlines here aren't actually needed but they make it neater for debugging.
            # If minification is needed, they can be removed
            output += '\n\n' + MD_REFERENCE_ITEM_SPLITTER + '\n\n'

# Save the result
writeFile(OUTPUT_FILE, output)

