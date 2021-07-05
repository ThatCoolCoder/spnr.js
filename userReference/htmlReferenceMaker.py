from referenceParser import *
from codeSectionFormatter import *
from errors import *

# file read/write stuff
def writeFile(pathToFile, contents):
    file = open(pathToFile, 'w+', encoding='utf-8')
    file.write(contents)
    file.close()

def readFile(pathToFile):
    file = open(pathToFile, 'r', encoding='utf-8')
    contents = file.read()
    file.close()
    return contents

def createFile(pathToFile, contents=''):
    # Attempt to create the file. Return a bool indicating success or not

    success = False
    try:
        file = open(pathToFile, 'x', encoding='utf-8')
        file.write(contents)
        file.close()
        success = True
    except:
        success = False
    return success

INPUT_FILE = 'rawReference.txt'
OUTPUT_DIR = 'htmlReference'

HTML_DOC_TEMPLATE = readFile('htmlReferenceTemplate.html')
HTML_CONTENTS_TEMPLATE = readFile('htmlContentsTemplate.html')
HTML_CONTENTS_ITEM_TEMPLATE = readFile('htmlContentsItemTemplate.html')
CONTENTS_PAGE_NAME = OUTPUT_DIR + '/index.html'
HTML_CODE_SECTION_OPEN = '<code>'
HTML_CODE_SECTION_CLOSE = '</code>'

def createFileNameFromItem(item, ):
    # Create a file name for the item based on its name
    return OUTPUT_DIR + '/' + item.basicName + '.html'

def initFiles(referenceItems):
    # Create or clear a file for each item

    for item in referenceItems:
        success = createFile(createFileNameFromItem(item))
        # if the file was maybe already existing, clear it instead
        if not success:
            writeFile(createFileNameFromItem(item), '')

def makeHtmlDoc(item):
    # Format the item's info into the HTML doc template to make a complete document
    
    htmlDoc = HTML_DOC_TEMPLATE.format(item.basicName, item.basicName, item.elaboratedName, \
        item.example, item.description, item.definedIn, item.link)
    return htmlDoc

def createAndSaveReferencePages(referenceItems):
    # Create the page for each item and then save the page
    
    for item in referenceItems:
        writeFile(createFileNameFromItem(item), makeHtmlDoc(item))

def createContentsPage(referenceItems):
    # Create a page to display the contents of the reference

    contentsWithoutHtmlWrapper = ''
    for item in referenceItems:
        contentsWithoutHtmlWrapper += createContentsLink(item)
    fullContentsPage = HTML_CONTENTS_TEMPLATE.format(contentsWithoutHtmlWrapper)
    writeFile(CONTENTS_PAGE_NAME, fullContentsPage)

def createContentsLink(item):
    # Create a link for the contents page that links to the item's own page

    fileName = createFileNameFromItem(item)
    # Chop off the output dir and the slash following it because the links are...
    # ... relative to the inside of the output dir
    fileName = fileName[len(OUTPUT_DIR) + 1:]

    return HTML_CONTENTS_ITEM_TEMPLATE.format(fileName, item.basicName)

# Try to read the complete raw reference then try turning it into a list of python objects
try:
    referenceItems = parseReference(readFile(INPUT_FILE))
except FieldMissing:
    input('\nEnter to close') # It's been handled by the parser, so don't print error info
except ExtraFields:
    input('\nEnter to close') # It's been handled by the parser, so don't print error info

input('Did you remember to update the version in /userReference/htmlContentsTemplate.html? (enter to make reference)')

initFiles(referenceItems)
formatCodeSections(referenceItems, HTML_CODE_SECTION_OPEN, HTML_CODE_SECTION_CLOSE)
createAndSaveReferencePages(referenceItems)
createContentsPage(referenceItems)
