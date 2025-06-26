import { validateForms } from '../functions/validate-forms.js'

const rules = [
  {
    ruleSelector: 'input[type="email"]',
    errorsContainer: document.querySelector('.input-phone .error-message'),
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Обязательное поле',
      }
    ]
  },
  {
    ruleSelector: 'input[type="tel"]',
    errorsContainer: document.querySelector('.input-phone .error-message'),
    tel: true,
    rules: [
      {
        rule: 'required',
        value: true,
        errorMessage: 'Обязательное поле',
      }
    ]
  },
  {
    ruleSelector: 'input[name="policy"]',
    errorsContainer: document.querySelector('.checkbox .error-message'),
    rules: [
      {
        rule: 'required',
        errorMessage: 'Вы должны согласиться с условиями',
      }
    ],
  },
]

const afterForm = (form) => {
  console.log('Форма успешно отправлена:', form)
}

validateForms('.js-form', rules, afterForm)
