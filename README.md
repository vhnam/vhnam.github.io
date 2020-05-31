# Nam Vo's blog

## Development

```
npm run sass:watch
webpack -w
```

## Fixing SASS issue

```
  sudo gem install -n /usr/local/bin sass
  sudo gem install -n /usr/local/bin compass
```

## Post a content

### create content folder

```
mkdir src/content/blog/<TITLE> # for blog
cd src/content/blog/<TITLE>

mkdir src/content/tutorial/<TITLE> # for tutorial
cd src/content/tutorial/<TITLE>
```

### create images folder

mkdir img

### create metadata file

touch config.json

```json
{
  "headline": "",
  "description": "",
  "time": "Ngày <DAY> tháng <MONTH> năm <YEAR>",
  "dateTime": "<YEAR>-<MONTH>-<DAY>"
}
```

### create index.html

touch index.html

### Writing

### Deploy

```
cd ../../../scripts
python posts.py --tutorial # for tutorial
python posts.py --blog # for blog
python index.py
python sitemap.py
```
