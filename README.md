# Nam Vo's blog

## Development

```
npm run sass:watch
webpack -w
```

**Note:** If you have problem with SASS, please follow this steps

```
sudo gem install -n /usr/local/bin sass
sudo gem install -n /usr/local/bin compass
```

## Post a content

#### 1. create content folder

```
mkdir src/content/blog/<TITLE> # for blog
cd src/content/blog/<TITLE>

mkdir src/content/tutorial/<TITLE> # for tutorial
cd src/content/tutorial/<TITLE>
```

#### 2. create images folder

```
mkdir img
```

#### 3. create metadata file

```
touch config.json
```

```json
{
  "headline": "",
  "description": "",
  "time": "Ngày <DAY> tháng <MONTH> năm <YEAR>",
  "dateTime": "<YEAR>-<MONTH>-<DAY>"
}
```

#### 4. create index.html

```
touch index.html
```

#### 5. Writing

You should copy content of other file in `/src/content/blog/**/index.html` or `/src/content/tutorials/**/index.html`

#### 6. Build

```
npm run build
cd ../../../scripts
python posts.py --tutorial # for tutorial
python posts.py --blog # for blog
python index.py
python sitemap.py
```
