const form = document.querySelector('.feedback-form');
const emailInput = document.querySelector('input[name="email"]');
const messageTextarea = document.querySelector('textarea[name="message"]');
const throttle = require('lodash.throttle');

/* Создаём объект с данными из полей инпута */
let userData = {};

/* Проверяем, есть ли данные в локальном хранилище, если да, то записываем их в наш объект и присваиваем значения свойств объекта
соответствующим полям ввода */
populateForm();

form.addEventListener('input', throttle(onFillFormFields, 500));
form.addEventListener('submit', formSubmit);

function onFillFormFields(e) {
  /* При событии инпут в форме собираем value инпута и поля для текста, после чего записываем их в объект */
  if (e.target === emailInput) {
    userData.email = emailInput.value;
  } else {
    userData.message = messageTextarea.value;
  }
  /* Закидываем наш объект в локальное хранилище */
  localStorage.setItem('feedback-form-state', JSON.stringify(userData));
}

function formSubmit(e) {
  e.preventDefault();

  /* При сабмите проверяем данные в объекте и если какое-то из свойств пустое или отсутствует - выдаём ошибку пользователю */
  let { email, message } = userData;
  if (!email || !message) {
    return alert('Заполните все поля формы');
  }

  /* По ТЗ консолим объект с собранной инфой */
  console.log(userData);

  /* Удаляем инфу из хранилища, очищаем форму и данные  */
  localStorage.removeItem('feedback-form-state');
  e.currentTarget.reset();
  userData = {};
  // userData.email = '';
  // userData.message = '';
}

function populateForm() {
  const savedUserData = JSON.parse(localStorage.getItem('feedback-form-state'));

  if (savedUserData) {
    const { email, message } = savedUserData;
    userData.email = email;
    userData.message = message;
    if (email) {
      emailInput.value = email;
    }
    if (message) {
      messageTextarea.value = message;
    }
  }
}
