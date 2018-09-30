document.addEventListener('DOMContentLoaded', function() {
    getDiaries();
}, false);

function getDiaries() {
    axios.get('https://vhnam.github.io/src/index/blog.json').then(function(res) {
        if (200 === res.status) {
            let diaries = res.data.blog;
            let diaryNode = document.getElementById('blog-list');

            render(diaryNode, diaries);
        }
    }).catch((err) => { console.error(err) });
}

function render(container, list) {
    list.forEach(element => {
        title = document.createElement('a');
        title.className = 'item__title';
        title.href = element.link;
        title.innerText = element.name;

        time = document.createElement('span');
        time.className = 'item__time';
        time.innerText = element.time;

        description = document.createElement('p');
        description.className = 'item__description';
        description.innerText = element.description;

        li = document.createElement('li');
        li.appendChild(title);
        li.appendChild(time);
        li.appendChild(description);

        container.appendChild(li);
    });
}
