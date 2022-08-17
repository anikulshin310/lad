var formElement = document.forms["formElement"];

formElement.onfocus = function (evt) {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
  evt.target.classList.add("focused");
};
formElement.addEventListener("focus", formElement.onfocus, true);

formElement.onblur = function () {
  var activeElement = formElement.querySelector(".focused");
  if (activeElement) {
    activeElement.classList.remove("focused");
  }
};
formElement.addEventListener("blur", formElement.onblur, true);
