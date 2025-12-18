function ToggleFavorite(index) {
  contacts[index].isFavorite = !contacts[index].isFavorite;

  UpdateMainContacts(contacts);
  UpdateFavoriteContacts(contacts);
  SaveContactsToLocalStorage();
}

function ToggleEmergency(index) {
  contacts[index].isEmergency = !contacts[index].isEmergency;

  UpdateMainContacts(contacts);
  UpdateEmergencyContacts(contacts);
  SaveContactsToLocalStorage();
}
