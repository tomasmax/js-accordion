/**
* @description
* Accordion
*
* @class
* @param {(string|Object)} accordionElement - Id or a reference to the DOM element
* @param {string} sectionElement - Name of the accordion section title element
* @param {number} [options.openSection=1] - Initialize the accordion with this section open, don't declare to have all section closed
* @param {boolean} [options.onlyOneOpen=false] - Only one section opened at a time
*/

export default class Accordion {
  static sectionTitleClass = 'Accordion-sectionTitle'

  static sectionContentClass = 'Accordion-sectionContent'

  constructor(accordionElement, sectionElement = '', options = {}) {
    this.element = typeof accordionElement === 'string'
      ? document.getElementById(accordionElement) : accordionElement

    this.openSection = options.openSection
    this.sectionElement = sectionElement
    this.onlyOneOpen = options.onlyOneOpen || true

    this.closeAll = this.closeAll.bind(this)
    this.handleClick = this.handleClick.bind(this)
    this.getTarget = this.getTarget.bind(this)
    this.open = this.open.bind(this)
    this.render = this.render.bind(this)

    // attach event listener to the accordion
    this.element.addEventListener('click', this.handleClick)
  }

  /**
   * Closes all accordion sections
   */
  closeAll() {
    this.element.querySelectorAll(`.${Accordion.sectionContentClass}`).forEach(
      (item) => {
        item.style.height = 0
      }
    )
  }

  /**
   * Toggles selected section content
   *
   * @param {object} el - The selected section element
   */
  static toggleSection(el) {
    // get the height every time in case it was modified dynamically
    const { scrollHeight } = el

    if (el.style.height === '0px' || el.style.height === '') {
      el.style.height = `${scrollHeight}px`
    } else {
      el.style.height = 0
    }
  }

  /**
   * Handles clicks on the accordion
   *
   * @param {object} e - Element the click occured on
   */
  handleClick(e) {
    const { target } = e
    if (!target.className.includes(Accordion.sectionTitleClass)) {
      return
    }

    if (this.onlyOneOpen) {
      this.closeAll()
    }

    Accordion.toggleSection(target.nextElementSibling)
  }

  /**
   * Returns the corresponding accordion content element by index
   *
   * @param {number} i - Index of section to return
   */
  getTarget(i) {
    return this.elements[i - 1]
  }

  /**
   * Opens a section by index
   *
   * @param {number} i - Index of section to open
   */
  open(i) {
    const target = this.getTarget(i)

    if (target) {
      if (this.onlyOneOpen) this.closeAll()
      target.style.height = `${target.scrollHeight}px`
    }
  }

  /**
   * Initial render of the accordion, you can use it to add style classes to the accordion element
   */
  render() {
    // attach style classes to accordion element section titles and contents
    this.element.querySelectorAll(this.sectionElement).forEach(
      (item) => {
        item.classList.add(Accordion.sectionTitleClass)
        item.nextElementSibling.classList.add(Accordion.sectionContentClass)
      }
    )

    // accordion initialized with all sections closed
    this.closeAll()

    // if a open section is defined opens it
    if (this.openSection) {
      open(this.openSection)
    }
  }
}
