function SaveContactsToLocalStorage() {
  localStorage.setItem("contactslist", JSON.stringify(contacts));
}
function LoadContactsFromLocalStorage() {
  var getContacts = localStorage.getItem("contactslist");
  contacts = getContacts ? JSON.parse(getContacts) : [];
}
