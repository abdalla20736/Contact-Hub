function ToggleFavorite(anchor, index) {
  contacts[index].isFavorite = !contacts[index].isFavorite;
  UpdateMainContacts(contacts);
  UpdateFavoriteContacts(contacts);
  SaveContactsToLocalStorage();
}

function ToggleEmergency(anchor, index) {
  contacts[index].isEmergency = !contacts[index].isEmergency;

  UpdateMainContacts(contacts);
  UpdateEmergencyContacts(contacts);
  SaveContactsToLocalStorage();
}
