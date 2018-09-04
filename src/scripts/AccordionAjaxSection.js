import Accordion from './Accordion'

/**
* @description
* AccordionAjaxSection
*
* @class
* @param {(string|Object)} accordionElement - Id or a reference to the DOM element
* @param {string} sectionElement - Name of the accordion section title element
* @param {number} [options.openSection=1] - Initialize the accordion with this section open, don't declare to have all section closed
* @param {boolean} [options.onlyOneOpen=false] - Only one section opened at a time
* @param {string} userName - Github username to fetch data from github's API
*/
export default class AccordionAjaxSection extends Accordion {
  static ajaxSectionClass = 'Accordion-ajaxSection'

  constructor(accordionElement, sectionElement = '', options = {}, userName) {
    super(accordionElement, sectionElement, options)
    this.userName = userName
    this.handleClick = this.handleClick.bind(this)
  }

  static makeAjaxRequest(method, url) {
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

  /**
   * Overrides parent function to add Ajax content loading for the clocked section
   *
   * @param {object} e - Element the click occured on
   */
  async handleClick(e) {
    const { target } = e
    if (!target.className.includes(AccordionAjaxSection.ajaxSectionClass)) {
      super.handleClick(e)
    } else {
      try {
        let response = await AccordionAjaxSection.makeAjaxRequest('GET', `https://api.github.com/users/${this.userName}`)
        response = JSON.parse(response)
        const { nextElementSibling } = target
        console.log(response) // eslint-disable-line no-console

        nextElementSibling.getElementsByTagName('img')[0].src = response.avatar_url
        nextElementSibling.getElementsByTagName('p')[0].innerHTML = response.name
        const webLink = nextElementSibling.getElementsByTagName('a')[0]
        webLink.href = response.blog
        webLink.innerHTML = response.blog
        const githubLink = nextElementSibling.getElementsByTagName('a')[1]
        githubLink.href = response.html_url
        githubLink.innerHTML = response.html_url

        super.handleClick(e)
      } catch (error) {
        console.error('Ouch, there was an error!', error.statusText) // eslint-disable-line no-console
      }
    }
  }
}
