import '../styles/index.scss';

import Accordion from './Accordion'
import AccordionAjaxSection from './AccordionAjaxSection'


// creates accordion 1
const accordion1 = new AccordionAjaxSection(
  'accordion',
  'dt',
  {
    onlyOneOpen: true
  },
  'tomasmax'
)
accordion1.render()
