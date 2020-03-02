import React, { Component } from 'react'
import validations from './validation'
import './App.css'
import Input from './components/Input'
import Logo from './components/Logo'

const initialState = () => {
  return {
    validForm: false,
    formData: {
      email: {
        id: 0,
        value: '',
        type: 'email',
        label: 'Email',
        placeholder: 'Введите email',
        errorMessage: '',
      },
      password: {
        id: 1,
        value: '',
        type: 'password',
        label: 'Пароль',
        placeholder: 'Введите пароль',
        errorMessage: '',
      },
    },
  }
}

export default class App extends Component {
  constructor(props) {
    super(props)
    this.state = initialState()
  }

  componentDidMount() {
    this.checkValuesInputs()
  }

  checkValuesInputs() {
    const values = Object.keys(this.state.formData).map((input, index) => {
      const element = this.state.formData[input]
      return { value: element.value, type: input }
    })
    values.forEach(item => {
      if (item.value !== '') {
        item.type === 'email'
          ? this.validationEmail()
          : this.validationPassword()
      }
    })
  }

  async validationEmail() {
    const value = this.state.formData.email.value
    try {
      await Promise.all([validations.required(value), validations.email(value)])
      this.setErrorMessage('', 'email')
      return true
    } catch (error) {
      error.message && error.message === 'required'
        ? this.setErrorMessage('Введите email', 'email')
        : this.setErrorMessage('Введите корректный email', 'email')

      return false
    }
  }

  async validationPassword() {
    const value = this.state.formData.password.value
    try {
      await Promise.all([
        validations.required(value),
        validations.minLength(value, 3),
      ])
      this.setErrorMessage('', 'password')
      return true
    } catch (error) {
      error.message && error.message === 'required'
        ? this.setErrorMessage('Введите пароль', 'password')
        : this.setErrorMessage(
            'Минимальаня длинна пароля 4 символа',
            'password'
          )
      return false
    }
  }

  setErrorMessage(message, type) {
    const formData = { ...this.state.formData }
    Object.keys(formData).forEach(() => {
      formData[type].errorMessage = message
    })
    this.setState(() => {
      return { formData }
    })
  }

  handlerInput(e, type) {
    let formData = { ...this.state.formData }
    formData[type].value = e.target.value
    this.setState(() => {
      return { formData }
    })
    type && type === 'email'
      ? this.validationEmail()
      : this.validationPassword()
  }

  handlerValidationForm(response) {
    if (response && response.length) {
      let validForm = this.state.validForm
      response.includes(false) ? (validForm = false) : (validForm = true)
      this.setState(() => {
        return {
          validForm,
        }
      })
    }
  }

  resetState() {
    this.setState(initialState())
  }

  async handlerLogin(event) {
    event.preventDefault()
    try {
      const response = await Promise.all([
        this.validationEmail(),
        this.validationPassword(),
      ])
      this.handlerValidationForm(response)
      if (this.state.validForm) {
        alert('My congratulations!')
        this.resetState()
      }
    } catch (error) {
      console.log(error)
    }
  }

  render() {
    return (
      <div className="validation">
        <Logo />
        <h1 className="validation__caption">Тест валидации</h1>
        <form className="validation__form" onSubmit={e => this.handlerLogin(e)}>
          {Object.keys(this.state.formData).map((input, index) => {
            const element = this.state.formData[input]
            return (
              <Input
                key={index}
                type={element.type}
                value={element.value}
                label={element.label}
                placeholder={element.placeholder}
                errorMessage={element.errorMessage}
                onChange={e => this.handlerInput(e, input)}
              />
            )
          })}
          <input value="Войти" type="submit" disabled={this.state.validForm} />
        </form>
      </div>
    )
  }
}
