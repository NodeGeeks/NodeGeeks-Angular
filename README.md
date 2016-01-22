# NodeGeeks Angular Framework

NodeGeeks LLC compiled library of Angular components, directives, services that allows smooth integration with
nodegeeks-sails framework.

Just run `bower install nodegeeks-angular` and include the 'nodegeeks-angular' module in your angular app.

## Todo's

* Add documentation for the services (DS, Auth etc..) and directives (advance-table, autocomplete etc...)
* Finish implementing the future directives and services

Note: All future directives and services listed have in depth notes and guidelines about how each one should be
implemented. Once the directive/service is complete the notes and guidelines are used as documentation.

# Directives

## advance-table
Displays a table of the data provided, has a wide variety of options including inline editable cells.

## autocomplete-input
Standard autocomplete input that intakes an array, the typed in value should filter through the desired key if each array value is an object. The model is the final completed value that was chosen.

## chips-input

## popup-modal
A basic modal that is triggered by a popup-modal-btn

## make-inline-editable
### Description:
When applied to an element it gives the element the ability to be inline-editable. When hovering over the element an
edit icon and tooltip appears should popup if the user presses "SHIFT + E" then it transforms the text into an input
element. That input element should be designed in a way that its obvious your editing the content, but does not actually
appear like a normal input would. For example, we'll definitely want the input to be transparent, but maybe fade the
text in and out. And underline it?

## Future Services
no services need developed at this time
