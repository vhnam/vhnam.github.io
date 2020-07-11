document.addEventListener(
  'DOMContentLoaded',
  function () {
    getDiaries();
    getTutorials();
  },
  false,
);

function hideLoading(section) {
  const loading = document.getElementById(`loading__${section}`);
  loading.remove();
}

function displayMore(section) {
  const moreURL = document.getElementById(`more__${section}`);
  moreURL.classList.add('homepage__more--show');
}

function getDiaries() {
  axios
    .get('/src/index/blog.json')
    .then(function (res) {
      if (200 === res.status) {
        hideLoading('blog');

        const diaries = res.data.blog;
        const diaryNode = document.getElementById('blog-list');

        render(diaryNode, diaries);

        if (diaries.length > 5) {
          displayMore('blog');
        }
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function getTutorials() {
  axios
    .get('/src/index/tutorials.json')
    .then(function (res) {
      if (200 === res.status) {
        hideLoading('tutorials');

        const tutorials = res.data.tutorials;
        const tutorialNode = document.getElementById('tutorial-list');

        render(tutorialNode, tutorials);

        if (tutorials.length > 5) {
          displayMore('tutorials');
        }
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
    time.className = 'item__time my-1';
    time.innerText = element.time;

    description = document.createElement('p');
    description.className = 'item__description';
    description.innerText = element.description;

    li = document.createElement('li');
    li.className = 'mb-lg-4';
    li.appendChild(title);
    li.appendChild(time);
    li.appendChild(description);

    container.appendChild(li);
  }
}
