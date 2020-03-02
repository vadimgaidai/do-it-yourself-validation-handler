const validations = {
  required: value => {
    return new Promise(resolve => {
      if (value) {
        resolve()
      } else {
        throw new Error('required')
      }
    })
  },
  email: email => {
    const reg = /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
    return new Promise(resolve => {
      if (reg.test(String(email))) {
        resolve()
      } else {
        throw new Error('email')
      }
    })
  },
  minLength: (value, length) => {
    return new Promise(resolve => {
      if (value && value.length > length) {
        resolve()
      } else {
        throw new Error('minLength')
      }
    })
  },
}

export default validations
