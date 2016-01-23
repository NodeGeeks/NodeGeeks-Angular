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

## <u>advance-table</u> - element
#### **Description:** 
Displays a table of the data provided, has a wide variety of options including inline editable cells.

#### **Examples:**

## <u>autocomplete-input</u> - element
#### **Description:** 
Standard autocomplete input that intakes an array, the typed in value should filter through the desired key if each array value is an object. The model is the final completed value that was chosen.
#### **Examples:**
    
    # template view
    <autocomplete-input ng-model="category" data="categories" filter-by="title">
    
    # controller
    Category.findAll().then(function(categories){
        $scope.categories = categories;
    });

## <u>chips-input</u> - element
#### **Description:**
#### **Examples:**

## <u>popup-modal</u> - element
#### **Description:**
A basic modal that is triggered by a popup-modal-btn
#### **Examples:**

    # template view
    
    <popup-modal title="Login" cancel-text="Close" confirm-text="Login" confirm-action="loginAction" name="customModal">
        <input ng-model="login" type="text" placeholder="Email or Username">
        <input ng-model="password" type="password" placeholder="Password">
    </popup-modal>
    
Triggering the popup modal can be done in two ways, via a html (button) or javascript
   
    # html
    
    <button open-modal="customModal"> Open Popup </button>
    
    # javascript - inject the popupModal directive to the controller
    
    popupModal.open('customModal');
    
#### **Attributes:**
<table>
    <tr>
        <td><strong>Param</strong></td>
        <td><strong>Type</strong></td>
        <td><strong>Details</strong></td>
    </tr>
    <tr>
        <td>hotkey1</td>
        <td>string</td>
        <td>desired key to trigger editable mode, must not be `null`</td>
    </tr>
</table>


## <u>make-inline-editable</u>
#### **Description:** 
When applied to an element it gives the element the ability to be inline-editable. If the element is 
text it turns into an input, if the element is an image it opens a popup modal for uploading and cropping a new image.
#### **How to trigger:** <br>
**desktop:** hover over element and hold `shift` + `e`. This can be overridden by reassigning the options `hotkey1` & `hotkey2`. <br>
**mobile:** tap then long press (double tap with second tap holding down)
#### **Examples:**
    # template view
    <p make-inline-editable="editableOptions"> Click here to edit this paragraph. Its pretty sweet! </p>
    # controller
    $scope.editableOptions = {
        hotkey1: 'shift',
        hotkey2: 'e',
        confirmEdit: true
    };
#### **Options:**
<table>
    <tr>
        <td><strong>Option</strong></td>
        <td><strong>Type</strong></td>
        <td><strong>Details</strong></td>
    </tr>
    <tr>
        <td>hotkey1</td>
        <td>string</td>
        <td>desired key to trigger editable mode, must not be `null`</td>
    </tr>
    <tr>
        <td>hotkey2</td>
        <td>string</td>
        <td>desired key to trigger editable mode, must not be `null`</td>
    </tr>
    <tr>
        <td>confirmEdit</td>
        <td>boolean</td>
        <td>if `true` then a confirmation alert asks if you want to edit</td>
    </tr>
</table>

# Services

## <u>DS</u>
#### **Description:** 
Provides a service that contains records of all the data brought in from the server (api). Each record is wrapped in whats called the `DS.Model.Record`. 
#### **Examples:**

## <u>Auth</u>
#### **Description:**

#### **Examples:**


