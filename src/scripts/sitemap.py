#-*- coding: UTF-8 -*-

import sys
import json
import os
import string
from xml.sax.saxutils import escape
from datetime import datetime as dt



def readConfig(title, mode):
    jsonFile = "src/content/%s/%s/config.json" % (mode, title)

    with open(jsonFile, "r") as f:
        config = json.load(f)

    return config



def createSitemapItem(title, mode):
    config = readConfig(title, mode)
    return [
        "https://vhnam.github.io/%s/%s" % (mode, title),
        config["dateTime"].encode("utf-8")
    ]



def make_datetime(lst):
    date_str = lst[1]
    print dt.strptime(date_str, '%Y-%m-%d')
    return dt.strptime(date_str, '%Y-%m-%d')



def main():
    print "Processing..."

    categories = ["blog", "tutorials"]
    data = []

    for category in categories:
        directories = os.listdir("src/content/%s" % category)

        inner_template = string.Template('    <url><loc>${link}</loc><lastmod>${time}</lastmod></url>')
        outer_template = string.Template("""<?xml version="1.0" encoding="UTF-8"?>
        <urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9">
        ${document_list}
        </urlset>
        """)

        for directory in directories:
            data.append(createSitemapItem(directory, category))

    data = sorted(data, key=make_datetime, reverse=True)
    inner_contents = [inner_template.substitute(link=link, time=time) for (link, time) in data]
    sitemap = outer_template.substitute(document_list='\n'.join(inner_contents))

    with open("sitemap.xml", "w") as file:
        file.write(sitemap)

    print "Build complete!"



if __name__== "__main__":
    main()
