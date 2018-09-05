import 'regenerator-runtime/runtime'
import Accordion from '../src/scripts/Accordion'
import AccordionAjaxSection from '../src/scripts/AccordionAjaxSection'
import htmlMock from './html/html.mock'

const $ = require('jquery')

describe('Accordion - DOM element passed', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = htmlMock


    const accordionElement = document.getElementById('accordion')

    const accordion = new AccordionAjaxSection(
      accordionElement,
      'dt',
      {
        openSection: 2,
        onlyOneOpen: true
      },
      'tomasmax'
    )
    accordion.render()
  })

  sharedTests()
})

describe('Accodion - Element ID passed', () => {
  beforeEach(() => {
    document.documentElement.innerHTML = htmlMock

    const accordion = new AccordionAjaxSection(
      'accordion',
      'dt',
      {
        openSection: 2,
        onlyOneOpen: true
      },
      'tomasmax'
    )
    accordion.render()
  });

  sharedTests();
});


function sharedTests() {
  describe('accordion properties and render', () => {
    it('should add Accordion-sectionTitle class to all dt elements', () => {
      expect($('#accordion > dt')[0].className).toBe(Accordion.sectionTitleClass)
      expect($('#accordion > dt')[1].className).toBe(`${Accordion.sectionTitleClass} ${Accordion.isOpen}`)
      expect($('#accordion > dt')[2].className).toBe(Accordion.sectionTitleClass)
      expect($('#accordion > dt')[3].className).toBe(`Accordion-ajaxSection ${Accordion.sectionTitleClass}`)
    })

    it('should has 2nd section opened', () => {
      expect($('#accordion > dt')[1].className).toBe(`${Accordion.sectionTitleClass} ${Accordion.isOpen}`)
    })

    it('should add Accordion-sectionContent class to all dt slibing elements', () => {
      expect($('#accordion > dd')[0].className).toBe(Accordion.sectionContentClass)
      expect($('#accordion > dd')[1].className).toBe(Accordion.sectionContentClass)
      expect($('#accordion > dd')[2].className).toBe(Accordion.sectionContentClass)
      expect($('#accordion > dd')[3].className).toBe(Accordion.sectionContentClass)
    })
  })

  describe('accordion behaviour', () => {
    it('should open the clicked section', () => {
      const sectionTitle = $('#accordion > dt')[0]
      const content = $('#accordion > dd')[0]

      expect(content.className).toBe(Accordion.sectionContentClass)

      sectionTitle.click()

      expect(sectionTitle.className).toBe(`${Accordion.sectionTitleClass} ${Accordion.isOpen}`)
    })

  })
}
