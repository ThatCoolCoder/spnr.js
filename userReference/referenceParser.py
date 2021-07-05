from referenceConsts import *
from referenceItem import *
from errors import *

def parseReference(reference):
    # Turn the reference from a raw string into a list of python objects

    # Split into items that need to be parsed
    itemsInitiallySplit = reference.split(MD_REFERENCE_ITEM_SPLITTER)

    # Parse each item in the list to turn it into an object
    referenceItems = []
    for idx, itemStr in enumerate(itemsInitiallySplit):
        try:
            referenceItems.append(parseReferenceItem(itemStr))

        # If there is a field missing from the item, warn the user
        except FieldMissing:
            print('Warning: field missing\nItem information:\n\n', itemStr)
            print('(item index: {})'.format(idx))
            raise FieldMissing
        
        # If there are extra fields in the item, warn the user
        except ExtraFields:
            print('Warning: extra field\nItem information:\n\n', itemStr)
            print('(item index: {})'.format(idx))
            raise ExtraFields

    return referenceItems

def parseReferenceItem(itemStr):
    # Turn a single item from a string into a python object

    itemStr = itemStr.strip('\n') # clear leading and trailing newlines
    itemFields = itemStr.split(MD_REFERENCE_ITEM_FIELD_SPLITTER) # split into fields
    try:
        referenceItem = ReferenceItem(*itemFields)

    except TypeError:
        # Check if the errors match some existing error types
        if len(itemFields) < REFERENCE_ITEM_FIELD_COUNT:
            raise FieldMissing
        elif len(itemFields) > REFERENCE_ITEM_FIELD_COUNT:
            raise ExtraFields
        # If the error is unknown, just keep it as a TypeError
        else:
            raise TypeError

    return referenceItem
