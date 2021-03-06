document.addEventListener(
  'DOMContentLoaded',
  function () {
    getTutorials();
  },
  false,
);

function hideLoading() {
  const loading = document.getElementById(`loading`);
  loading.remove();
}

function getTutorials() {
  axios
    .get('/src/index/tutorials.json')
    .then(function (res) {
      if (200 === res.status) {
        hideLoading();

        const diaries = res.data.tutorials;
        const diaryNode = document.getElementById('tutorials-list');

        render(diaryNode, diaries);
      }
    })
    .catch((err) => {
      console.error(err);
    });
}

function render(container, list) {
  list.forEach((element) => {
    title = document.createElement('a');
    title.className = 'item__title';
    title.href = element.link;
    title.innerText = element.name;

    time = document.createElement('span');
    time.className = 'item__time';
    time.className = 'item__time my-1';
    time.innerText = element.time;

    description = document.createElement('p');
    description.className = 'item__description';
    description.innerText = element.description.replace(/&quote;/g, '"');

    li = document.createElement('li');
    li.className = 'mb-lg-4';
    li.appendChild(title);
    li.appendChild(time);
    li.appendChild(description);

    container.appendChild(li);
  });
}
