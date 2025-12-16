function Create() {
  var contact = {
    avatarInput: inputs[0].files[0].name,
    fullName: inputs[1].value,
    telephone: inputs[2].value,
    email: inputs[3].value,
    address: inputs[4].value,
    group: inputs[5].value,
    notes: inputs[6].value,
    isFavorite: inputs[7].checked,
    isEmergency: inputs[8].checked,
  };
  
}
function Delete(index) {
  contacts.splice(index, 1);
  SaveContactsToLocalStorage(contacts);
  DisplayContacts(contacts);
}
function Update(index) {
  OpenForm();

  contacts.splice(index, 1);
  SaveContactsToLocalStorage(contacts);
  DisplayContacts(contacts);
}
