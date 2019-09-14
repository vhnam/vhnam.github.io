document.addEventListener(
  'DOMContentLoaded',
  function() {
    getDiaries();
    getTutorials();
  },
  false,
);

function getDiaries() {
  axios
    .get('https://vhnam.github.io/src/index/blog.json')
    .then(function(res) {
      if (200 === res.status) {
        const diaries = res.data.blog;
        const diaryNode = document.getElementById('blog-list');

        render(diaryNode, diaries);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTutorials() {
  axios
    .get('https://vhnam.github.io/src/index/tutorials.json')
    .then(function(res) {
      if (200 === res.status) {
        const tutorials = res.data.tutorials;
        const tutorialNode = document.getElementById('tutorial-list');

        render(tutorialNode, tutorials);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function render(container, list) {
  for (let index = 0; index < 5; index++) {
    element = list[index];

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
  }
}
