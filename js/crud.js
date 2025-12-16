function Delete(index) {
  contacts.splice(index, 1);
  SaveContactsToLocalStorage(contacts);
  DisplayContacts(contacts);
}

function Update(index) {
  editMode = true;
  currentContactIndex = index;
  OpenForm();
  formTitle.innerHTML = "Edit Contact";
  avatarImg.innerHTML =
    contacts[index].avatarInput != null
      ? `  <img
                                class="rounded-circle object-fit-cover"
                                src="./images/${contacts[index].avatarInput}"
                                alt=""
                              />`
      : `<div
                                class="gradient-div  text-white d-flex align-items-center justify-content-center h-100 w-100 rounded-circle"
                                 style="--avatar-gradient: ${
                                   contacts[index].gradient
                                 }"
                              >
                                ${contacts[index].fullName[0].toUpperCase()}
                              </div>`;

  inputs[1].value = contacts[index].fullName;

  inputs[2].value = contacts[index].telephone;
  inputs[3].value = contacts[index].email;
  inputs[4].value = contacts[index].address;
  inputs[5].value = contacts[index].group;
  inputs[6].value = contacts[index].notes;
  inputs[7].checked = contacts[index].isFavorite;
  inputs[8].checked = contacts[index].isEmergency;
}
