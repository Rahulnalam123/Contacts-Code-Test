var ContactService = ContactApp.service("ContactService", ContactService);

function ContactService() {
    this.contacts = [];

    this.listContacts = function() {
        return this.contacts;
    };

    this.addContact = function(contact) {
        this.contacts.push(contact);
    };

    this.editContact = function(contact, index) {
        this.contacts[index] = contact;
    };

    this.deleteContact = function(index) {
        var element = this.contacts.splice(index, 1);
        if (element !== undefined)
            return true;
        else
            return false;
    };
}