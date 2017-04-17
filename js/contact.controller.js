var ContactCtrl = ContactApp.controller("ContactCtrl", ContactCtrl);
ContactCtrl.$inject = ["ContactService", "$scope"];

function ContactCtrl(ContactService, $scope) {
    $scope.contacts = [];
    $scope.contact = {
        FirstName: "",
        LastName: "",
        Email: "",
        PhoneNumber: "",
        Status: ""
    };
    $scope.isEdit = false;
    $scope.updateIndex = -1;

    $scope.listContacts = function() {
        $scope.contacts = ContactService.listContacts();
    };

    $scope.addContact = function() {
        if ($scope.isValidContact()) {
            ContactService.addContact($scope.contact);
            $scope.clearContact();
            $scope.listContacts();
        }
    };

    $scope.editContact = function(contact, index) {
        $scope.isEdit = true;
        $scope.contact = angular.copy(contact);
        $scope.updateIndex = index;
    };

    $scope.updateContact = function() {
        if ($scope.isValidContact()) {
            if ($scope.isEdit && $scope.updateIndex > -1) {
                ContactService.editContact($scope.contact, $scope.updateIndex);
                $scope.isEdit = false;
                $scope.updateIndex = -1;
                $scope.clearContact();
                $scope.listContacts();
            }
        }
    };

    $scope.deleteContact = function(index) {
        var isConfirm = confirm("Are you sure? Do you want to delete the contact?");
        if (isConfirm) {
            var isDeleted = ContactService.deleteContact(index);
            if (isDeleted)
                $scope.listContacts();
        }
    };

    $scope.clearContact = function() {
        $scope.contact = {
            FirstName: "",
            LastName: "",
            Email: "",
            PhoneNumber: "",
            Status: ""
        };
        $scope.isEdit = false;
        $scope.updateIndex = -1;
    };

    $scope.isValidContact = function() {
        if ($scope.contact.FirstName === undefined || $scope.contact.FirstName === "") {
            alert("Please enter first name");
            document.getElementById("firstName").focus();
            return false;
        } else if ($scope.contact.LastName === undefined || $scope.contact.LastName === "") {
            alert("Please enter last name");
            document.getElementById("lastName").focus();
            return false;
        } else if ($scope.contact.Email === undefined || $scope.contact.Email === "") {
            alert("Please enter valid email");
            document.getElementById("email").focus();
            return false;
        } else if ($scope.contact.PhoneNumber === null) {
            alert("Please enter valid phone number");
            document.getElementById("phoneNumber").focus();
            return false;
        } else if ($scope.contact.Status === undefined || $scope.contact.Status === "") {
            alert("Please select status");
            document.getElementById("status").focus();
            return false;
        } else
            return true;
    };
}