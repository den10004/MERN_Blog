class FormValidator {
  constructor(form) {
    this.form = form;
    this.error = Array.from(this.form.querySelectorAll('.error'))

  }

  setEvent() {
    this.form.addEventListener('input', (evt) => {

      const inputs = Array.from(this.form.querySelectorAll('input'));
      const button = this.form.querySelector('button')
      this.isFieldValid(evt.target);

      if (inputs.every(this.checkInputValidity)) {

        this.buttonState(button, true)
      } else {
        this.buttonState(button, false)
      }

    })

  }

  isFieldValid(input) {
    const error = input.nextElementSibling;
    this.checkInputValidity(input)
    error.textContent = input.validationMessage;

  }

  checkInputValidity(input) {

    if (input.validity.valueMissing) {
  
      input.setCustomValidity('Это обязательное поле');
      return false;
    }

    if (input.validity.tooShort || input.validity.tooLong) {
      input.setCustomValidity('Должно быть от 2 до 30 символов');
      return false;
    }

    if (input.validity.typeMismatch && input.type === 'url') {
      input.setCustomValidity('Здесь должна быть ссылка');
      return false;

    } else {
      input.setCustomValidity('');
      return true;
    }

  }

  buttonState(button, state) {
    if (state === false) {
      button.setAttribute('disabled', 'true');
      button.classList.add('popup__button_disabled');

    } else if (state === true) {
      button.removeAttribute('disabled');
      button.classList.remove('popup__button_disabled');
    }
  }

  clearErrors() {
    this.error.forEach(er => {
      er.textContent = "";
    })
  }
}

