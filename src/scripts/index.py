# -*- coding: UTF-8 -*-

import sys
import json
import os
import codecs
from datetime import datetime as dt


def readConfig(title, mode):
    jsonFile = "/content/%s/%s/config.json" % (mode, title)
    abspath = os.path.abspath('.')
    path = abspath.replace("/scripts", jsonFile)

    with open(path, "r") as f:
        config = json.load(f)

    return config


def checkTypo(str):
    length = len(str)

    if "." != str[length - 1]:
        str = str + "."

    return str


def getIndexItem(title, mode):
    config = readConfig(title, mode)
    return """{
            "name": "%s",
            "link": "/%s/%s/",
            "datetime": "%s",
            "time": "%s",
            "description": "%s"
        },""" % (
        config["headline"].encode("utf-8"),
        mode, title,
        config["dateTime"].encode("utf-8"),
        config["time"].encode("utf-8"),
        checkTypo(config["description"].encode("utf-8"))
    )


def sort_by_datetime(item):
    date_str = item["datetime"]
    return dt.strptime(date_str, '%Y-%m-%d')


def main():
    print "Processing..."

    categories = ["blog", "tutorials"]
    abspath = os.path.abspath('.')

    for category in categories:
        data = ""
        directories = os.listdir(os.path.join(
            abspath, "../content/%s" % category))

        for directory in directories:
            data = data + getIndexItem(directory, category)

        data = data[:-1]
        json_string = """{ "%s": [%s] }""" % (category, data)
        json_object = json.loads(json_string)
        list_by_category = json_object[category]
        sorted_list = sorted(
            list_by_category, key=sort_by_datetime, reverse=True)
        json_object[category] = sorted_list

        path = abspath.replace("/scripts", "/index/%s.json" % category)

        with codecs.open(path, "w", encoding="utf-8") as file:
            file.write(json.dumps(json_object, ensure_ascii=False))

        print "Wrote %s.json" % category

    print "Build complete!"


if __name__ == "__main__":
    main()
