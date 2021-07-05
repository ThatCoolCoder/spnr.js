from referenceConsts import *
from referenceItem import *
from errors import *

def strInsert(sourceStr, insertStr, pos):
    return sourceStr[:pos]+insertStr+sourceStr[pos:]

def strRemove(sourceStr, removeStartIdx, removeEndIdx):
    return sourceStr[:removeStartIdx] + sourceStr[removeEndIdx:]

def formatCodeSections(referenceItems, codeSectionStart, codeSectionEnd):
    # Put codeSectionStart and codeSectionEnd around blocks of code
    
    for item in referenceItems:
        codeSectionOpen = False # Whether a code section is currently open

        while MD_REFERENCE_CODE_SECTION_INDICATOR in item.description:
            idx = item.description.find(MD_REFERENCE_CODE_SECTION_INDICATOR)

            # Remove the markdown code section indicator
            endIdx = idx + len(MD_REFERENCE_CODE_SECTION_INDICATOR)
            newDescription = strRemove(item.description, idx, endIdx)

            # If a code section is open, then insert code section end
            if codeSectionOpen:
                newDescription = strInsert(newDescription, codeSectionEnd, idx)
                codeSectionOpen = False
            # Else, open a new code section by inserting code section start
            else:
                newDescription = strInsert(newDescription, codeSectionStart, idx)
                codeSectionOpen = True

            item.description = newDescription
        if codeSectionOpen:
            print('Error: Code section not closed in ' + item.basicName)
            raise CodeSectionNotClosed
