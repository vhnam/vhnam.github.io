document.addEventListener('DOMContentLoaded', function() {
    getDiaries();
}, false);

function getDiaries() {
    axios.get('https://vhnam.github.io/src/indexes/blog.json').then(function(res) {
        if (200 === res.status) {
            let diaries = res.data.blog;
            let diaryNode = document.getElementById('blog-list');

            render(diaryNode, diaries);
        }
    }).catch((err) => { console.error(err) });
}

function render(container, list) {
    list.forEach(element => {
        title = document.createElement('h4');
        title.className = 'item__title';
        title.innerText = element.name;

        time = document.createElement('span');
        time.className = 'item__time';
        time.innerText = element.time;

        description = document.createElement('p');
        description.className = 'item__description';
        description.innerText = element.description;

        link = document.createElement('a');
        link.className = 'list__item';
        link.href = element.link;
        link.setAttribute('itemprop', 'url');
        link.appendChild(title);
        link.appendChild(time);
        link.appendChild(description);

        li = document.createElement('li');
        li.appendChild(link);

        container.appendChild(li);
    });
}