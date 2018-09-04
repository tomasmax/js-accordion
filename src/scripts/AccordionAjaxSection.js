import Accordion from './Accordion'
import makeAjaxRequest from './helpers/ajaxRequest'

/**
* @description
* AccordionAjaxSection
*
* @class
* @param {(string|Object)} accordionElement - Id or a reference to the DOM element
* @param {string} sectionElement - Name of the accordion section title element
* @param {number} [options.openSection=1] - Initialize the accordion with this section open, don't declare to have all section closed
* @param {boolean} [options.onlyOneOpen=true] - Only one section opened at a time
* @param {string} userName - Github username to fetch data from github's API
*/
export default class AccordionAjaxSection extends Accordion {
  static ajaxSectionClass = 'Accordion-ajaxSection'

  constructor(accordionElement, sectionElement = '', options = {}, userName) {
    super(accordionElement, sectionElement, options)
    this.userName = userName
    this.handleClick = this.handleClick.bind(this)
  }

  static loadGithubData(element, response) {
    element.getElementsByTagName('img')[0].src = response.avatar_url
    element.getElementsByTagName('p')[0].innerHTML = response.name
    const webLink = element.getElementsByTagName('a')[0]
    webLink.href = element.blog
    webLink.innerHTML = response.blog
    const githubLink = element.getElementsByTagName('a')[1]
    githubLink.href = response.html_url
    githubLink.innerHTML = response.html_url
  }

  /**
   * Overrides parent function to add Ajax content loading for the clocked section
   *
   * @param {object} e - Element the click occured on
   */
  async handleClick(e) {
    const { target } = e
    if (!target.className.includes(AccordionAjaxSection.ajaxSectionClass)
      || target.className.includes(Accordion.isOpen)) {
      super.handleClick(e)
    } else {
      try {
        let response = await makeAjaxRequest('GET', `https://api.github.com/users/${this.userName}`)
        response = JSON.parse(response)
        const { nextElementSibling } = target
        console.log(response) // eslint-disable-line no-console
        AccordionAjaxSection.loadGithubData(nextElementSibling, response)
        super.handleClick(e)
      } catch (error) {
        console.error('Ouch, there was an error!', error.statusText) // eslint-disable-line no-console
      }
    }
  }
}
