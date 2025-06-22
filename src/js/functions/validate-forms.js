import JustValidate from 'just-validate';
import Inputmask from "../../../node_modules/inputmask/dist/inputmask.es6.js";

export const validateForms = (selector, rules, afterSend) => {
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
    const telSelector = form.querySelector('input[type="tel"]');
    const dorpdown = telSelector.closest('.js-input-validate')?.querySelector('.dropdown');
    const dropdownToggle = dorpdown?.querySelector('.dropdown-toggle');
    const dorpdownChoices = dorpdown?.querySelectorAll('.dropdown-menu-choice');

    if (telSelector) {
      const defaultMask = new Inputmask(window.PHONES_MASK['ru'].mask);
      defaultMask.mask(telSelector);
      telSelector.dataset.maskLength = window.PHONES_MASK['ru'].length;
    }

    if (dropdownToggle && telSelector && dorpdownChoices) {
      dorpdownChoices.forEach((btn) => {
        btn.addEventListener('click', () => {
          const countryCode = btn.dataset.country;
          const selectedMask = window.PHONES_MASK[countryCode];

          if (selectedMask) {
            telSelector.value = '';
            telSelector.placeholder = window.PHONES_MASK[countryCode].mask;
            Inputmask.remove(telSelector);
            const newMask = new Inputmask(selectedMask.mask);
            newMask.mask(telSelector);
            telSelector.dataset.maskLength = selectedMask.length;

            const img = dropdownToggle.querySelector('img');
            const source = dropdownToggle.querySelector('source');
            if (img && source) {
              img.src = `./img/input-phone/${countryCode}.png`;
              source.srcset = `./img/input-phone/${countryCode}.webp`;
            }
          }
        });
      });
    }

    const formRules = rules.map((item) => {
      // Создаем копию объекта правил для каждой формы
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

    validation.onSuccess((ev) => {
      let formData = new FormData(ev.target);
      if (telSelector) {
        let phoneNumber = telSelector.inputmask.unmaskedvalue();
        localStorage.setItem('submittedPhoneNumber', phoneNumber);
      } // Get the phone number


      let xhr = new XMLHttpRequest();

      xhr.onreadystatechange = function () {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            if (afterSend) {
              afterSend(ev.target);
            }
            console.log('Отправлено');
          } else {
            console.error('Ошибка при отправке формы');
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
