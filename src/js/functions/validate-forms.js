import JustValidate from 'just-validate';
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

export const validateForms = (selector, rules, afterSend, onProcessing) => {
  const forms = document.querySelectorAll(selector);

  if (!forms || forms.length === 0) {
    console.error('Нет таких форм!');
    return false;
  }

  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

  forms.forEach((form) => {
    const submitButton = form.querySelector('button[type="submit"]')
    const telSelector = form.querySelector('input[type="tel"]');

    if (telSelector) {
      const inputMask = new Inputmask('+7 (999)9999999');
      inputMask.mask(telSelector);
    }

    if (submitButton) {
      submitButton.inert = true;

      const loader = Object.assign(document.createElement('div'), {
        className: 'loader is-hidden',
      });

      submitButton.parentNode.insertBefore(loader, submitButton);

      submitButton.addEventListener('click', () => {
        loader.classList.remove('is-hidden');
        form.style.pointerEvents = 'none';
        setTimeout(() => submitButton.inert = true)
      })
    }

    const formRules = rules.map((item) => {
      const newItem = { ...item };
      if (newItem.tel && telSelector) {
        newItem.rules = [...newItem.rules, {
          rule: 'function',
          validator: function () {
            const phone = telSelector.inputmask.unmaskedvalue();
            return phone.length === 10;
          },
          errorMessage: 'Не верный телефон'
        }];
      }
      return newItem;
    });

    const validation = new JustValidate(form);

    formRules.forEach((item) => {
      const field = form.querySelector(item.ruleSelector);

      if (field) {
        const parentElement = field.closest('.js-input-validate').querySelector('.error-message') || item.errorsContainer;

        validation.addField(item.ruleSelector, item.rules, {
          errorsContainer: parentElement,
        });
      }
    });

    validation.onValidate(({fields, isValid}) => {
      onProcessing && onProcessing(form, fields, isValid)
    })

    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);
      if (telSelector) {
        let phoneNumber = telSelector.inputmask.unmaskedvalue();
        localStorage.setItem('submittedPhoneNumber', phoneNumber);
      } // Get the phone number


      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (afterSend) {
            afterSend(ev.target, xhr.status)
          }
        }
      };

      xhr.open('POST', 'mail.php', true); // Укажите правильный путь к mail.php
      xhr.send(formData);

      ev.target.reset();
    });

    validation.onFail((fields) => {
      for (let field in fields) {
        if (!fields[field].isValid) {
          const input = fields[field].elem;
          if (input) {
            if (input.tagName === 'INPUT') {
              input.value = '';
            } else if (input.tagName === 'TEXTAREA') {
              input.textContent = '';
            } else if (input.tagName === 'SELECT') {
              input.selectedIndex = -1;
            }
          }
        }
      }
    });
  });
};
