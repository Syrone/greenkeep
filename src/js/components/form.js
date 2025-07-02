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

const afterForm = (target, status) => {
  // Находим модальное окно #modal-form
  const submitButton = target.querySelector('button[type="submit"]')
  const modalForm = document.getElementById('modal-form')
  const modalThanks = document.getElementById('modal-thanks')
  const modalError = document.getElementById('modal-error')

  if (submitButton) {
    submitButton.inert = true
  }
  target.style.pointerEvents = ''
  target.querySelector('.loader').classList.add('is-hidden')
  // Закрываем #modal-form, если форма находится внутри него
  if (modalForm && window.modalInstances.has(modalForm)) {
    const modalFormInstance = window.modalInstances.get(modalForm)
    if (modalForm.contains(target)) {
      modalFormInstance.hide()
    }
  }

  // Обработка статуса ответа
  if (status === 200) {
    // Инициализируем и открываем модальное окно #modal-thanks
    if (!window.modalInstances.has(modalThanks)) {
      window.initializeModal(modalThanks)
    }
    const modalThanksInstance = window.modalInstances.get(modalThanks)
    modalThanksInstance.show()
  } else {
    // Инициализируем и открываем модальное окно #modal-error
    if (!window.modalInstances.has(modalError)) {
      window.initializeModal(modalError)
    }
    const modalErrorInstance = window.modalInstances.get(modalError)
    modalErrorInstance.show()
  }
}

const onProcessing = (target, fields, isValid) => {

  const allValid = Object.values(fields).every(field => field.isValid === true)

  target.querySelector('button[type="submit"]').inert = !allValid
  if (isValid === false || isValid === undefined) {
    target.querySelector('.loader').classList.add('is-hidden')
  }
}

validateForms('.js-form', rules, afterForm, onProcessing)
