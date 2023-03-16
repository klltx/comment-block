const commentForm = document.querySelector('#commentForm');
const userName = document.querySelector('#commentFormName');
const userNameError = document.querySelector('#commentFormNameError');
const text = document.querySelector('#commentFormText');
const textError = document.querySelector('#commentFormTextError');
const date = document.querySelector('#commentFormDate');
const dateError = document.querySelector('#commentFormDateError');
const comments = document.querySelector('#comments');

userName.addEventListener('input', () => {
  userName.classList.remove('invalid');
  userNameError.classList.add('hidden');
})

text.addEventListener('input', () => {
  text.classList.remove('invalid');
  textError.classList.add('hidden');
})

date.addEventListener('change', () => {
  date.classList.remove('invalid');
  dateError.classList.add('hidden');
})

const checkValid = () => {
  let isValid = true;

  if(!userName.value) {
    userName.classList.add('invalid');
    userNameError.classList.remove('hidden');
    isValid = false;
  }
  
  if(!text.value) {
    text.classList.add('invalid');
    textError.classList.remove('hidden');
    isValid = false;
  }

  if(date && new Date(date.value) > new Date()) {
    date.classList.add('invalid');
    dateError.classList.remove('hidden');
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
      <div class="row">
        <span class="comment-name">${commentFormData.userName}</span>
        <span class="comment-date">${commentFormData.date}</span>
        <button class="comment-button remove" id="removeButton">
          <img src="./assets/icons/trash.svg" alt="Удалить комментарий">
        </button>
        <button class="comment-button like" id="likeButton">
          <img src="./assets/icons/like.svg" alt="Отметить как понравившийся">
        </button>
      </div>
      <span class="comment-text">${commentFormData.text}</span>
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