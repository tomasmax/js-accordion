JS accordion

[**DEMO**](http://tomasmax.github.io/js-accordion)

A configurable accordion developed using JavaScript ES6 and SASS. Using webpack to run and build it.


## Configuration arguments for Accordion class

I created a parent Accordion class with the following configuration options

Arguments | Type | Default | Description
------ | ---- | ------- | -----------
element | string or object |  | id of the Accordion element or the DOM element
sectionElement | string |  | id of the title sections of the accordion
options.openSection | int  |  | Number of section to open at initialization
options.onlyOneOpen | boolean | true | if true only one section open a time

## Configuration arguments for AccordionAjaxSection class

I created a child AccordionAjaxSection class that extends from Accordion and adds functionality to load a section content using AJAX

Arguments | Type | Default | Description
------ | ---- | ------- | -----------
element | string or object |  | id of the Accordion element or the DOM element
sectionElement | string |  | id of the title sections of the accordion
options.openSection | int  |  | Number of section to open at initialization
options.onlyOneOpen | boolean | true | if true only one section open a time
userName | string | | Github username to fetch data from github's API


## Running locally

```
npm install
```
```
npm run dev
```


## Build and deploy to gh-pages
```
npm run build
```
```
npm run deploy
```


## Running the tests
```
npm test
```

