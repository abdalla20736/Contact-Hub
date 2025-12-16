const closeFormBtn = document.getElementById("close-add-form");
const openFormBtn = document.getElementById("add-contact");
const cancelFormBtn = document.getElementById("cancel-contact");
const saveContactBtn = document.getElementById("save-contact");
const addContactForm = document.getElementById("add-contact-form");
const favCheckbox = document.getElementById("favorite-checkbox");
const emergencyCheckbox = document.getElementById("emergency-checkbox");
const searchInput = document.getElementById("search-contact");
const contactsViewPort = document.getElementById("contacts-viewport");
const avatarInput = document.getElementById("avatarInput");
const inputs = document.querySelectorAll(`form input, textarea, select`);
const totalContactsQuantity = document.getElementById("total-contacts");
const favoriteContactsQuantity = document.getElementById("favorite-contacts");
const emergencyContactsQuantity = document.getElementById("emergency-contacts");
const favoritesContactsLinks = document.getElementById("favorites-links");
const emergencyContactsLinks = document.getElementById("emergency-links");
const contactGradient = document.querySelector(".contact-gradient");
const Form = addContactForm.querySelector("form");

let contacts;
let validName = true;
let validPhone = true;
let isUsedPhoneNumber = false;
let validEmail = true;

RegisterEvents();
LoadContactsFromLocalStorage();
DisplayContacts(contacts);

function RandomGradient() {
  const rand = () => Math.floor(50 + Math.random() * 205);
  const color1 = `rgb(0, 0, 255)`;
  const color2 = `rgb(${rand()}, ${rand()}, ${rand()})`;

  return `linear-gradient(to bottom right, ${color1}, ${color2})`;
}

function SaveContact() {
  inputs.forEach((element) => {
    console.log(element.value);
  });

  var imageName;
  if (inputs[0].files.length > 0) {
    imageName = inputs[0].files[0].name;
  }

  var contact = {
    avatarInput: imageName,
    gradient: RandomGradient(),
    fullName: inputs[1].value,
    telephone: inputs[2].value,
    email: inputs[3].value,
    address: inputs[4].value,
    group: inputs[5].value,
    notes: inputs[6].value,
    isFavorite: inputs[7].checked,
    isEmergency: inputs[8].checked,
  };

  if (ValidateForm(contact)) {
    contacts.push(contact);
    DisplayContacts(contacts);
    SaveContactsToLocalStorage();
    CloseForm();
    ClearForm();
  }
}

function ClearForm() {
  Form.reset();
}

function DisplayContacts(contacts) {
  var staticContact = {
    avatarInput: "meal-1.jpg",
    gradient: RandomGradient(),
    fullName: "ahmed",
    telephone: "0102021548",
    email: "email@email.com",
    address: "address",
    group: "Friends",
    notes: "data",
    isFavorite: false,
    isEmergency: true,
  };

  UpdateMainContacts(contacts);
  UpdateFavoriteContacts(contacts);
  UpdateEmergencyContacts(contacts);
}

function DeleteContact(index) {
  Swal.fire({
    title: "Delete Contact?",
    text: `Are you sure you want to delete ${contacts[index].fullName}? This action cannot be undone.`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#C62222",
    cancelButtonColor: "#606773",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      Delete(index);
      Swal.fire({
        title: "Deleted!",
        text: "Contact has been deleted.",
        icon: "success",
      });
    }
  });
}

function UpdateMainContacts(displayedContacts) {
  var mainContacts = "";

  for (let index = 0; index < displayedContacts.length; index++) {
    mainContacts += UpdateContact(index);
  }

  totalContactsQuantity.innerHTML = displayedContacts.length;
  contactsViewPort.innerHTML = mainContacts;
}

function UpdateContact(index) {
  var contact = `
                <div class="col-sm-6 align-items-center ">
                      <div class="contact-card  border border-gray-100 border-1">
                        <div class="contact-card-info bg-white rounded-3">
                          <div class="d-flex gap-3">
                            <div class="position-relative icon-56 rounded-3">
                            ${
                              contacts[index].isFavorite
                                ? `  <div
                                id="favorite-icon-img"
                                class="favorite-icon icon-20 position-absolute bg-amber-400 d-flex align-items-center justify-content-center rounded-circle"
                              >
                                <i
                                  class="fa-solid fa-star text-white fs-8px"
                                ></i>
                              </div>`
                                : ""
                            }
                            ${
                              contacts[index].isEmergency
                                ? ` <div
                                id="emergency-icon-img"
                                class="emergency-icon icon-20 position-absolute bg-rose-500 d-flex align-items-center justify-content-center rounded-circle"
                              >
                                <i
                                  class="fa-solid fa-heart-pulse text-white fs-8px"
                                ></i>
                              </div>`
                                : ""
                            }
                             ${
                               contacts[index].avatarInput != null
                                 ? `  <img
                                class="rounded-3"
                                src="./images/${contacts[index].avatarInput}"
                                alt=""
                              />`
                                 : `<div
                                class="gradient-div text-white d-flex align-items-center justify-content-center h-100 w-100 rounded-3"
                                 style="--avatar-gradient: ${
                                   contacts[index].gradient
                                 }"
                              >
                                ${contacts[index].fullName[0].toUpperCase()}
                              </div>`
                             }  
                            
                            </div>

                            <div>
                              <p class="m-0">${contacts[index].fullName}</p>
                              <div class="d-flex gap-2">
                                <div
                                  class="bg-blue-100 icon-24 rounded-3 d-flex align-items-center justify-content-center"
                                >
                                  <i
                                    class="fa-solid fa-phone text-blue-600 fs-10px"
                                  ></i>
                                </div>
                                <p class="m-0 text-gray-500">${
                                  contacts[index].telephone
                                }</p>
                              </div>
                            </div>
                          </div>
                          <div class="d-flex gap-2 align-items-center mt-2">
                            <div
                              class="icon-28 bg-violet-100 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-envelope text-violet-600 fs-10px"
                              ></i>
                            </div>
                            <p class="m-0 text-gray-600 fs-14px">
                              ${contacts[index].email}
                            </p>
                          </div>
                          <div
                            class="d-flex gap-2 align-items-center rounded-3 mt-2"
                          >
                            <div
                              class="icon-28 bg-green-100 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-location-dot text-green-600 fs-10px"
                              ></i>
                            </div>
                            <p class="m-0 text-gray-600 fs-14px">
                              ${contacts[index].address}
                            </p>
                          </div>
                          <div>
                            <div class="badge bg-green-100 text-green-700">
                              Friends
                            </div>
                            ${
                              contacts[index].isEmergency
                                ? ` <div
                              class="emergency-badge badge bg-rose-50 text-rose-500"
                            >
                              <i class="fa-solid fa-heart-pulse"></i>
                              Emergency
                            </div>`
                                : ""
                            }
                           
                          </div>
                        </div>
                        <div
                          class="contact-actions border-top border-1 border-gray-100 d-flex justify-content-between align-items-center"
                        >
                          <div class="d-flex gap-2">
                            <a
                              title="Call"
                              href="tel:${contacts[index].telephone}"
                              class="call-action bg-emerald-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-phone text-emerald-600 fs-14px"
                              ></i>
                            </a>
                            <a
                              title="Email"
                              href="mailto:${contacts[index].email}"
                              class="email-action bg-violet-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-envelope text-violet-600 fs-14px"
                              ></i>
                            </a>
                          </div>
                          <div class=" d-flex gap-2">
                            <a
                              onclick="ToggleFavorite(this,${index})"
                              title="Favorite"
                              class="favorite-action  ${
                                contacts[index].isFavorite ? `active` : ""
                              } bg-gray-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center pe-auto"
                            >
                              <i
                                class="fa-solid fa-star text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                           
                              onclick="ToggleEmergency(this,${index})"
                              title="Emergency"
                             
                              class="emergency-action  ${
                                contacts[index].isEmergency ? `active` : ""
                              } bg-gray-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid ${
                                  contacts[index].isEmergency
                                    ? `fa-heart-pulse`
                                    : "fa-heart"
                                } text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                              onclick="Update(${index})"
                              title="Edit"
                              class="edit-action bg-gray-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-pen text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                              onclick="DeleteContact(${index})"
                              title="Delete"
                              class="delete-action bg-gray-50 border-0 icon-36 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-trash text-gray-400 fs-14px"
                              ></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>`;
  return contact;
}
function UpdateFavoriteContacts(displayedContacts) {
  var favoriteContacts = "";
  let counter = 0;

  displayedContacts.forEach((contact) => {
    if (contact.isFavorite) {
      counter++;
      favoriteContacts += `
      <div
                        class="contact-link d-flex align-items-center justify-content-between gap-2 bg-gray-50 p-2 border-2 border-gray-100 p-2"
                      >
                        <div class="d-flex gap-2">
                          <div class="icon-56 rounded-3">
                           ${
                             contact.avatarInput != null
                               ? `  <img
                                class="rounded-3"
                                src="./images/${contact.avatarInput}"
                                alt=""
                              />`
                               : `<div
                                class="gradient-div text-white d-flex align-items-center justify-content-center h-100 w-100 rounded-3"
                                 style="--avatar-gradient: ${contact.gradient}"
                              >
                                ${contact.fullName[0].toUpperCase()}
                              </div>`
                           }  
                          
                          </div>

                          <div>
                            <h4 class="m-0 fs-14px text-gray-900">${
                              contact.fullName
                            }</h4>
                            <p class="m-0 text-gray-500">${
                              contact.telephone
                            }</p>
                          </div>
                        </div>
                        <div>
                          <a
                            href="tel:${contact.telephone}"
                            class="icon-24 icon-xl-32 rounded-3 d-flex align-items-center justify-content-center bg-emerald-100"
                          >
                            <i
                              class="fa-solid fa-phone text-emerald-600 fs-8px fs-xl-12px"
                            ></i>
                          </a>
                        </div>
                      </div>`;
    }
  });
  favoritesContactsLinks.innerHTML = favoriteContacts;
  if (counter === 0) {
    favoritesContactsLinks.innerHTML = `  <p class="m-0 py-4 text-gray-400 text-center">
                        No favorites yet
                      </p>`;
  }
  favoriteContactsQuantity.innerHTML = counter;
}

function UpdateEmergencyContacts(displayedContacts) {
  var emergencyContacts = "";
  let counter = 0;
  displayedContacts.forEach((contact) => {
    if (contact.isEmergency) {
      counter++;
      emergencyContacts += `
      <div
                        class="contact-link d-flex align-items-center justify-content-between gap-2 bg-gray-50 p-2 border-2 border-gray-100 p-2"
                      >
                        <div class="d-flex gap-2">
                          <div class="icon-56 rounded-3">
                          ${
                            contact.avatarInput != null
                              ? `  <img
                                class="rounded-3"
                                src="./images/${contact.avatarInput}"
                                alt=""
                              />`
                              : `<div
                                class="gradient-div text-white d-flex align-items-center justify-content-center h-100 w-100 rounded-3"
                                 style="--avatar-gradient: ${contact.gradient}"
                              >
                                ${contact.fullName[0].toUpperCase()}
                              </div>`
                          }  
                          
                    
                          </div>

                          <div>
                            <h4 class="m-0 fs-14px text-gray-900">${
                              contact.fullName
                            }</h4>
                            <p class="m-0 text-gray-500">${
                              contact.telephone
                            }</p>
                          </div>
                        </div>
                        <div>
                          <a
                            href="tel:${contact.telephone}"
                            class="icon-24 icon-xl-32 rounded-3 d-flex align-items-center justify-content-center bg-emerald-100"
                          >
                            <i
                              class="fa-solid fa-phone text-emerald-600 fs-8px fs-xl-12px"
                            ></i>
                          </a>
                        </div>
                      </div>`;
    }
  });

  emergencyContactsLinks.innerHTML = emergencyContacts;
  if (counter == 0) {
    emergencyContactsLinks.innerHTML = ` <p class="text-center m-0 py-4 text-gray-400">
                        No emergency contacts
                      </p>`;
  }
  emergencyContactsQuantity.innerHTML = counter;
}

function FindContact(input) {}
