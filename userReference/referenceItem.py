class ReferenceItem:
    def __init__(self, basicName, elaboratedName, example, description, definedIn, link):
        self.basicName = basicName
        self.elaboratedName = elaboratedName
        self.example = example
        self.description = description
        self.definedIn = definedIn
        self.link = link # I'm honestly not sure if link will remain