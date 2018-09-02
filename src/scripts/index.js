import '../styles/index.scss';

/**
* @description
* JS accordion
*
* @param {(string|Object)} accordionElement - Id or a reference to the DOM element
* @param {string} sectionElement - Name of the accordion section title element
* @param {number} [options.openSection=1] - Initialize the accordion with this section open, don't declare to have all section closed
* @param {boolean} [options.onlyOneOpen=false] - Only one section opened at a time
*/

const Accordion = function (accordionElement, sectionElement, options = {}) {
  const element = typeof accordionElement === 'string'
    ? document.getElementById(accordionElement) : accordionElement

  const { openSection } = options
  const onlyOneOpen = options.onlyOneOpen || true
  const sectionTitleClass = 'Accordion-sectionTitle'
  const sectionContentClass = 'Accordion-sectionContent'

  /**
   * Closes all accordion sections
   */
  function closeAll() {
    [].forEach.call(element.querySelectorAll(`.${sectionContentClass}`), (item) => {
      item.style.height = 0
    })
  }

  /**
   * Toggles selected section content
   *
   * @param {object} el - The selected section element
   */
  function toggleSection(el) {
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
  function handleClick(e) {
    const { target } = e
    if (!target.className.includes(sectionTitleClass)) {
      return
    }

    if (onlyOneOpen) {
      closeAll()
    }

    toggleSection(target.nextElementSibling)
  }

  /**
   * Returns the corresponding accordion content element by index
   *
   * @param {number} i - Index of section to return
   */
  function getTarget(i) {
    return element.querySelectorAll(`.${sectionContentClass}`)[i - 1]
  }

  /**
   * Opens a section by index
   *
   * @param {number} i - Index of section to open
   */
  function open(i) {
    const target = getTarget(i)

    if (target) {
      if (onlyOneOpen) closeAll()
      target.style.height = `${target.scrollHeight}px`
    }
  }

  /**
   * Initial render of the accordion
   */
  function render() {
    // attach style classes to accordion element section titles and contents
    [].forEach.call(element.querySelectorAll(sectionElement),
      (item) => {
        item.classList.add(sectionTitleClass)
        item.nextElementSibling.classList.add(sectionContentClass)
      })

    // attach event listener to the accordion
    element.addEventListener('click', handleClick)

    // accordion initialized with all sections closed
    closeAll()

    // if a open section is defined opens it
    if (openSection) {
      open(openSection)
    }
  }

  render()
}

// if a open section is defined opens it
const accordionDl = new Accordion(
  'accordion',
  'dt',
  {
    onlyOneOpen: true,
  })

export default accordionDl
