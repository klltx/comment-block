const commentForm = document.querySelector('#commentForm');
const userName = document.querySelector('#commentFormName');
const text = document.querySelector('#commentFormText');
const date = document.querySelector('#commentFormDate');
const comments = document.querySelector('#comments');

userName.addEventListener('input', () => {
  userName.classList.remove('invalid');
})

text.addEventListener('input', () => {
  text.classList.remove('invalid');
})

const checkValid = () => {
  let isValid = true;

  if(!userName.value) {
    userName.classList.add('invalid');
    isValid = false;
  }
  
  if(!text.value) {
    text.classList.add('invalid');
    isValid = false;
  }

  return isValid;
}

const convertDate = (date) => {
  const dateNow = new Date();
  const commentDate = date ? new Date(date) : new Date();
  
  const doubleNumber = (num) => num < 10 ? '0' + num : num;
  const time = `${doubleNumber(dateNow.getHours())}:${doubleNumber(dateNow.getMinutes())}`;

  const daysDifference = (dateNow - commentDate) / (24 * 60 * 60 * 1000);

  if(daysDifference < 1) return `сегодня, ${time}`;
  if(daysDifference < 2) return `вчера, ${time}`;
  return `${commentDate.toLocaleDateString()}, ${time}`;
}

const addComment = (wrapper, commentFormData) => {
  wrapper.insertAdjacentHTML('afterbegin', `
    <div class="comment comment-${commentFormData.id}">
      <span>${commentFormData.userName}</span>
      <span>${commentFormData.text}</span>
      <span>${commentFormData.date}</span>
      <button class="remove" id="removeButton">Удалить</button>
      <button class="like" id="likeButton">Понравилось</button>
    </div>`);

  const comment = document.querySelector(`.comment-${commentFormData.id}`);
  
  comment
    .querySelector('#removeButton')
    .addEventListener('click', () => {
      comment.remove();
    })

  const likeButton = comment.querySelector('#likeButton');
  likeButton.addEventListener('click', () => {
    likeButton.classList.toggle('active');
  })
}

commentForm.addEventListener('submit', (e) => {
  e.preventDefault();

  if(checkValid()) {
    addComment(comments, {
      id: comments.children.length,
      userName: userName.value,
      text: text.value,
      date: convertDate(date.value),
    });

    text.value = '';
    date.value = '';
  }
});