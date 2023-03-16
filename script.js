const commentForm = document.querySelector('#commentForm');
const userName = document.querySelector('#commentFormName');
const userNameError = document.querySelector('#commentFormNameError');
const text = document.querySelector('#commentFormText');
const textError = document.querySelector('#commentFormTextError');
const date = document.querySelector('#commentFormDate');
const dateError = document.querySelector('#commentFormDateError');
const submitButton = document.querySelector('.comment-form__submit');
const comments = document.querySelector('#comments');

const setValid = (elem, elemError) => {
  elem.classList.remove('invalid');
  elemError.classList.add('hidden');
  
  if(!document.querySelectorAll('.invalid').length) {
    submitButton.disabled = false;
    submitButton.classList.remove('button-disabled');
  }
}

userName.addEventListener('input', () => {
  setValid(userName, userNameError);
})

text.addEventListener('input', () => {
  setValid(text, textError);
})

date.addEventListener('change', () => {
  setValid(date, dateError);
})

const checkValid = () => {
  let isValid = true;
  
  const check = (condition, elem, elemError) => {
    if(condition) {
      elem.classList.add('invalid');
      elemError.classList.remove('hidden');
      submitButton.disabled = true;
      submitButton.classList.add('button-disabled');
      isValid = false;
    }
  }

  check(!userName.value, userName, userNameError);
  check(!text.value, text, textError);
  check(date && new Date(date.value) > new Date(), date, dateError);

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
        <button class="comment-button like" id="likeButton">
          <img src="./assets/icons/like.svg" alt="Отметить как понравившийся">
        </button>
        <button class="comment-button remove" id="removeButton">
          <img src="./assets/icons/trash.svg" alt="Удалить комментарий">
        </button>
      </div>
      <div class="column">
        <span class="comment-text">${commentFormData.text}</span>
        <span class="comment-date">${commentFormData.date}</span>
      </div>
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