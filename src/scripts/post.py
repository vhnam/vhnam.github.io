#-*- coding: UTF-8 -*-

import sys
import os
import json
from distutils.dir_util import copy_tree
from bs4 import BeautifulSoup



# Usage:
# > python post.py --blog
# > python post.py --turorials



def build(title, mode):
    makeDirectory(title, mode)
    copyImages(title, mode)
    config = readConfig(title, mode)
    index = createIndex(title, mode)
    createContent(title, index, config, mode)



def makeDirectory(title, mode):
    directory = "%s/%s" % (mode, title)

    if not os.path.exists(directory):
        os.makedirs(directory)



def copyImages(title, mode):
    fromDirectory = "src/content/%s/%s/img" % (mode, title)
    toDirectory = "%s/%s/img" % (mode, title)
    copy_tree(fromDirectory, toDirectory)



def readConfig(title, mode):
    jsonFile = "src/content/%s/%s/config.json" % (mode, title)

    with open(jsonFile, "r") as f:
        config = json.load(f)

    return config



def createIndex(title, mode):
    fromFile = "src/content/%s/%s/index.html" % (mode, title)
    toFile = "src/content/%s/%s/index.tmp.html" % (mode, title)

    f = open(fromFile, "r")
    content = f.read()
    soup = BeautifulSoup(content, "html.parser")
    f.close()

    h2Items = soup.find_all("h2")
    index = ''
    isFirst = True

    for item in h2Items:
        content = item.text
        encodedTitle = content.encode("ascii","ignore").decode("utf-8")
        newTitle = encodedTitle.replace(" ", "-")
        newTitle = newTitle.replace(",", "")
        newTitle = newTitle.replace("?", "")
        newTitle = newTitle.replace(".", "")
        newTitle = newTitle.replace("!", "")
        newTitle = newTitle.lower()

        newTag = soup.new_tag("span", id=newTitle, **{"class": "heading"})
        item.insert_after(newTag)

        newIndexItem = soup.new_tag("li")
        if (isFirst):            
            newLink = soup.new_tag("a", id="prefix-%s" % newTitle, href="#%s" % newTitle, **{"class": "index__item index--highlight"})
            isFirst = False
        else:
            newLink = soup.new_tag("a", id="prefix-%s" % newTitle, href="#%s" % newTitle, **{"class": "index__item"})  
        newLink.string = content
        newIndexItem.append(newLink)
        index = index + str(newIndexItem)

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
    newContent = newContent.replace("{{index}}", index)
    newContent = newContent.replace("{{title}}", title)
    newContent = newContent.replace("{{headline}}", config["headline"].encode("utf-8"))
    newContent = newContent.replace("{{description}}", config["description"].encode("utf-8"))
    newContent = newContent.replace("{{dateTime}}", config["dateTime"].encode("utf-8"))
    newContent = newContent.replace("{{time}}", config["time"].encode("utf-8"))

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
