#-*- coding: UTF-8 -*-

import sys
import os
from distutils.dir_util import copy_tree
import json



# Usage:
# > python tutorials.py



def build(title, mode):
    makeDirectory(title, mode)
    copyImages(title, mode)
    config = readConfig(title, mode)
    createContent(title, config, mode)



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



def createContent(title, config, mode):
    templateFile = "src/template/matt-falrey__tutorials.html"
    fromFile = "src/content/%s/%s/index.html" % (mode, title)
    toFile = "%s/%s/index.html" % (mode, title)

    f = open(templateFile, "r")
    template = f.read()
    f.close()

    f = open(fromFile, "r")
    content = f.read()
    f.close()

    newContent = template.replace("{{content}}", content)
    newContent = newContent.replace("{{title}}", title)
    newContent = newContent.replace("{{headline}}", config["headline"].encode('utf-8'))
    newContent = newContent.replace("{{description}}", config["description"].encode('utf-8'))
    newContent = newContent.replace("{{dateTime}}", config["dateTime"].encode('utf-8'))
    newContent = newContent.replace("{{time}}", config["time"].encode('utf-8'))

    f = open(toFile, "w+")
    f.write(newContent)
    f.close()



def main():
    # directories = os.listdir('src/content/tutorials')

    # for directory in directories:
    #     build(directory, 'tutorials')

    build("to-da-an-hanh-voi-redux-nhu-the-nao", 'tutorials')



if __name__== "__main__":
    main()
