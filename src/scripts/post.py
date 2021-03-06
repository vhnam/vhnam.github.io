# -*- coding: UTF-8 -*-

import sys
import os
import json
import re
from distutils.dir_util import copy_tree
from bs4 import BeautifulSoup
from xml.sax.saxutils import escape
from slimmer import html_slimmer


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
    directory = "/%s/%s" % (mode, title)
    abspath = os.path.abspath('.')
    path = abspath.replace("/src/scripts", directory)

    if not os.path.exists(path):
        os.makedirs(path)


def copyResources(title, mode):
    resouces = ["img", "css", "js"]
    abspath = os.path.abspath('.')

    for item in resouces:
        fromDirectory = abspath.replace(
            "/scripts", "/content/%s/%s/%s" % (mode, title, item))

        if os.path.exists(fromDirectory):
            toDirectory = abspath.replace(
                "/src/scripts", "/%s/%s/%s" % (mode, title, item))
            copy_tree(fromDirectory, toDirectory)


def readConfig(title, mode):
    jsonFile = "/content/%s/%s/config.json" % (mode, title)
    abspath = os.path.abspath('.')
    path = abspath.replace("/scripts", jsonFile)

    with open(path, "r") as f:
        config = json.load(f)

    return config


def encodeHeading(heading):
    encodedHeading = heading.encode("ascii", "ignore").decode("utf-8")
    newHeading = encodedHeading.replace(" ", "-")
    newHeading = newHeading.replace(",", "")
    newHeading = newHeading.replace("?", "")
    newHeading = newHeading.replace(".", "")
    newHeading = newHeading.replace("!", "")
    newHeading = newHeading.replace("(", "")
    newHeading = newHeading.replace(")", "")
    newHeading = newHeading.lower()
    return newHeading


def isGreater(currentHeading, prevHeading):
    currentIndex = re.findall(r'\d+', currentHeading)
    prevIndex = re.findall(r'\d+', prevHeading)

    if (int(currentIndex[0]) > int(prevIndex[0])):
        return False
    return True


def createIndex(title, mode):
    abspath = os.path.abspath('.')
    fromFile = abspath.replace(
        "/scripts", "/content/%s/%s/index.html" % (mode, title))
    toFile = abspath.replace(
        "/scripts", "/content/%s/%s/index.tmp.html" % (mode, title))

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
        index = index + '<li><a id="prefix-%s" href="#%s" class="%s">%s</a></li>' % (
            title, title, className, heading.text)

        prevHeading = heading.name

    index = index + "</ul>"

    with open(toFile, "w") as file:
        file.write(str(soup))

    return index


def importStylesheets(mode, title):
    stylesheets = ''
    abspath = os.path.abspath('.')
    path = abspath.replace(
        "/scripts", "/content/%s/%s/css" % (mode, title))

    if os.path.isdir(path):
        files = os.listdir(path)

        for file in files:
            stylesheets = stylesheets + \
                '<link rel="stylesheet" href="css/%s">' % (file)

    return stylesheets


def importScripts(mode, title):
    scripts = ''
    abspath = os.path.abspath('.')
    path = abspath.replace(
        "/scripts", "/content/%s/%s/js" % (mode, title))

    if os.path.isdir(path):
        files = os.listdir(path)

        for file in files:
            scripts = scripts + '<script src="js/%s"></script>' % (file)

    return scripts


def createContent(title, index, config, mode):
    abspath = os.path.abspath('.')
    templateFile = abspath.replace("/scripts", "/template/winter-wonder.html")
    fromFile = abspath.replace(
        "/scripts", "/content/%s/%s/index.tmp.html" % (mode, title))
    toFile = abspath.replace(
        "/src/scripts", "/%s/%s/index.html" % (mode, title))

    f = open(templateFile, "r")
    template = f.read()
    f.close()

    f = open(fromFile, "r")
    content = f.read()
    f.close()

    stylesheets = importStylesheets(mode, title)
    scripts = importScripts(mode, title)

    newContent = template.replace("{{content}}", content)
    newContent = newContent.replace("{{index}}", index.encode("utf-8"))
    newContent = newContent.replace("{{title}}", title)
    newContent = newContent.replace(
        "{{headline}}", config["headline"].encode("utf-8"))
    newContent = newContent.replace(
        "{{description}}", config["description"].encode("utf-8"))
    newContent = newContent.replace(
        "{{dateTime}}", config["dateTime"].encode("utf-8"))
    newContent = newContent.replace("{{time}}", config["time"].encode("utf-8"))
    newContent = newContent.replace("{{mode}}", mode.encode("utf-8"))
    newContent = newContent.replace(
        "{{stylesheets}}", stylesheets.encode("utf-8"))
    newContent = newContent.replace("{{scripts}}", scripts.encode("utf-8"))

    minified = html_slimmer(newContent.replace(
        '\n', '').replace('\t', '').replace('\r', '')).strip()

    f = open(toFile, "w+")
    f.write(minified)
    f.close()


def main():
    category = sys.argv[1]

    print "Processing..."

    if ("--blog" == category or "--tutorials" == category or "--music" == category):
        category = category.replace("--", "")
        path = os.path.abspath('.')
        directories = os.listdir(os.path.join(
            path, "../content/%s" % category))

        for directory in directories:
            build(directory, category)

        print "Build complete!"
    else:
        print "Invalid params"


if __name__ == "__main__":
    main()
