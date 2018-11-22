#-*- coding: UTF-8 -*-

import sys
import os
import json
import re
from distutils.dir_util import copy_tree
from bs4 import BeautifulSoup
from xml.sax.saxutils import escape


# Usage:
# > python post.py --blog
# > python post.py --turorials



def build(title, mode):
    makeDirectory(title, mode)
    copyResources(title, mode)

    config = readConfig(title, mode)
    index = createIndex(title, mode)
    createContent(title, index, config, mode)



def makeDirectory(title, mode):
    directory = "%s/%s" % (mode, title)

    if not os.path.exists(directory):
        os.makedirs(directory)



def copyResources(title, mode):
    resouces = ["img", "css", "js"]

    for item in resouces:
        fromDirectory = "src/content/%s/%s/%s" % (mode, title, item)

        if os.path.exists(fromDirectory):
            toDirectory = "%s/%s/%s" % (mode, title, item)
            copy_tree(fromDirectory, toDirectory)



def readConfig(title, mode):
    jsonFile = "src/content/%s/%s/config.json" % (mode, title)

    with open(jsonFile, "r") as f:
        config = json.load(f)

    return config



def encodeHeading(heading):
    encodedHeading = heading.encode("ascii", "ignore").decode("utf-8")
    newHeading = encodedHeading.replace(" ", "-")
    newHeading = newHeading.replace(",", "")
    newHeading = newHeading.replace("?", "")
    newHeading = newHeading.replace(".", "")
    newHeading = newHeading.replace("!", "")
    newHeading = newHeading.lower()
    return newHeading



def isGreater(currentHeading, prevHeading):
    currentIndex = re.findall(r'\d+', currentHeading)
    prevIndex = re.findall(r'\d+', prevHeading)

    if (int(currentIndex[0]) > int(prevIndex[0])):
        return False
    return True



def createIndex(title, mode):
    fromFile = "src/content/%s/%s/index.html" % (mode, title)
    toFile = "src/content/%s/%s/index.tmp.html" % (mode, title)

    f = open(fromFile, "r")
    content = f.read()
    soup = BeautifulSoup(content, "html.parser")
    f.close()

    index = "<ul>"
    prevHeading = "h2"
    isFirst = True
    headingItems = soup.find_all(["h2", "h3", "h4"])
    
    for heading in headingItems:
        title = encodeHeading(heading.text)

        newTag = soup.new_tag("span", id=title, **{"class": "heading"})
        heading.insert_before(newTag)

        if (heading.name != prevHeading):
            if (isGreater(heading.name, prevHeading)):
                index = index + "</ul>"
            else:
                index = index + "<ul>"

        className = "index__item"
        if isFirst:
            className = "index__item index--highlight"
            isFirst = False
        index = index + '<li><a id="prefix-%s" href="#%s" class="%s">%s</a></li>' % (title, title, className, heading.text)

        prevHeading = heading.name

    index = index + "</ul>"

    with open(toFile, "w") as file:
        file.write(str(soup))

    return index



def createContent(title, index, config, mode):
    templateFile = "src/template/winter-wonder.html"
    fromFile = "src/content/%s/%s/index.tmp.html" % (mode, title)
    toFile = "%s/%s/index.html" % (mode, title)

    f = open(templateFile, "r")
    template = f.read()
    f.close()

    f = open(fromFile, "r")
    content = f.read()
    f.close()

    newContent = template.replace("{{content}}", content)
    newContent = newContent.replace("{{index}}", index.encode("utf-8"))
    newContent = newContent.replace("{{title}}", title)
    newContent = newContent.replace("{{headline}}", config["headline"].encode("utf-8"))
    newContent = newContent.replace("{{description}}", config["description"].encode("utf-8"))
    newContent = newContent.replace("{{dateTime}}", config["dateTime"].encode("utf-8"))
    newContent = newContent.replace("{{time}}", config["time"].encode("utf-8"))
    newContent = newContent.replace("{{mode}}", mode.encode("utf-8"))

    f = open(toFile, "w+")
    f.write(newContent)
    f.close()



def main():
    category = sys.argv[1]

    print "Processing..."

    if ("--blog" == category or "--tutorials" == category):
        category = category.replace("--", "")
        directories = os.listdir("src/content/%s" % category)

        for directory in directories:
            build(directory, category)

        print "Build complete!"
    else:
        print "Invalid params"



if __name__== "__main__":
    main()
