
const makeAjaxRequest = (method, url) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onload = function () {
      if (this.status >= 200 && this.status < 300) {
        resolve(xhr.response)
      } else {
        reject({ // eslint-disable-line prefer-promise-reject-errors
          status: this.status,
          statusText: xhr.statusText
        })
      }
    }
    xhr.onerror = function () {
      reject({ // eslint-disable-line prefer-promise-reject-errors
        status: this.status,
        statusText: xhr.statusText
      })
    }
    xhr.send()
  })
}

export default makeAjaxRequest
