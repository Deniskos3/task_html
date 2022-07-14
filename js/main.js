// Проверка на пустое поле
function Validate(value, minValue) {
  return value.trim().length <= minValue;
}

// Модалка успешного ответа
function SuccessModal(message) {
  let errorBlock = document.getElementsByClassName("success")[0];
  errorBlock.getElementsByTagName("p")[0].innerHTML = message;
  errorBlock.classList.add("d-flex");
}

// Выводим модалку с ошибкой
function ErrorModal(message) {
  let errorBlock = document.getElementsByClassName("error")[0];
  errorBlock.getElementsByTagName("p")[0].innerHTML = message;
  errorBlock.classList.add("d-flex");
}

// Подключаю маску для номера
IMask(document.getElementsByName("phone")[0], {
  mask: "+{7}(000)000-00-00",
});

// Библиотека для просмотра картинок
lightGallery(document.getElementsByClassName("products")[0], {
  selector: ".imb_block",
});

// Код дублируется, но решил это пока не исправлять, так как это тестовое задание
document.getElementById("close").addEventListener("click", function (e) {
  document.getElementsByClassName("error")[0].classList.remove("d-flex");
});

document
  .getElementById("close_success")
  .addEventListener("click", function (e) {
    document.getElementsByClassName("success")[0].classList.remove("d-flex");
  });

// Убираю точку в инпуте
document.getElementsByName("name")[0].addEventListener("keyup", function (e) {
  this.value = String(e.target.value).replace(".", "");
});

document.getElementById("send").addEventListener("click", async function (e) {
  e.preventDefault();

  let name = document.getElementsByName("name")[0].value;
  let street = document.getElementsByName("street")[0].value;
  let phone = document.getElementsByName("phone")[0].value;

  if (Validate(name, 1))
    return ErrorModal("Имя должно быть больше одной буквы");
  if (Validate(street, 5)) return ErrorModal("Введите корректный адресс");
  if (Validate(phone, 15)) return ErrorModal("Введите корректный номер");

  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name,
        street: street,
        phone: phone,
      }),
    });
    const json = await response.json();
    SuccessModal("Данный были успешно отправлены");
  } catch (error) {
    ErrorModal(`Ошибка ${error}`);
  }
});
