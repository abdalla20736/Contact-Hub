const closeFormBtn = document.getElementById("close-add-form");
const openFormBtn = document.getElementById("add-contact");
const cancelFormBtn = document.getElementById("cancel-contact");
const saveContactBtn = document.getElementById("save-contact");
const addContactForm = document.getElementById("add-contact-form");
const favCheckbox = document.getElementById("favorite-checkbox");
const emergencyCheckbox = document.getElementById("emergency-checkbox");
const searchInput = document.getElementById("search-contact");
const contactsHeaderQuantity = document.getElementById("mg-contact-quantity");
const contactsViewPort = document.getElementById("contacts-viewport");
const avatarImg = document.getElementById("avatar-img");
const inputs = document.querySelectorAll(`form input, textarea, select`);
const totalContactsQuantity = document.getElementById("total-contacts");
const favoriteContactsQuantity = document.getElementById("favorite-contacts");
const emergencyContactsQuantity = document.getElementById("emergency-contacts");
const favoritesContactsLinks = document.getElementById("favorites-links");
const emergencyContactsLinks = document.getElementById("emergency-links");
const contactGradient = document.querySelector(".contact-gradient");
const Form = addContactForm.querySelector("form");
const formTitle = addContactForm.querySelector(".form-title");

let contacts;
let validName = true;
let validPhone = true;
let isUsedPhoneNumber = false;
let validEmail = true;
let editMode = false;
let currentContactIndex;

RegisterEvents();
LoadContactsFromLocalStorage();

DisplayContacts(contacts);

function SaveContact() {
  var imageName;
  if (inputs[0].files.length > 0) {
    imageName = inputs[0].files[0].name;
  }

  var existGradient =
    contacts[currentContactIndex] === undefined
      ? RandomGradient()
      : contacts[currentContactIndex].gradient;
  var contact = {
    avatarInput: imageName,
    gradient: existGradient,
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
    if (editMode) {
      contact.avatarInput =
        contacts[currentContactIndex].avatarInput != null
          ? contacts[currentContactIndex].avatarInput
          : contact.avatarInput;
      contacts[currentContactIndex] = contact;
    } else {
      contacts.push(contact);
    }
    DisplayContacts(contacts);
    SaveContactsToLocalStorage();
    ShowMessage();
    CloseForm();
  }
}

function ClearForm() {
  Form.reset();
}

function DisplayContacts(contacts) {
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
        showConfirmButton: false,
        timer: 1000,
      });
    }
  });
}

function UpdateMainContacts(displayedContacts) {
  var mainContacts = "";

  if (displayedContacts.length > 0) {
    for (let index = 0; index < displayedContacts.length; index++) {
      console.log(displayedContacts[index].fullName);
      mainContacts += UpdateContact(displayedContacts, index);
    }
  } else {
    mainContacts = `                <div id="contact-info" class="text-center">
                    <div
                      class="no-contacts bg-gray-100 mb-3 d-flex align-items-center justify-content-center rounded-3 mx-auto"
                    >
                      <i
                        class="fa-solid fa-address-book fs-30px text-gray-300"
                      ></i>
                    </div>
                    <p class="text-gray-500 m-0">No contacts found</p>
                    <p class="text-gray-400 fs-14px mt-1">
                      Click "Add Contact" to get started
                    </p>
                  </div>`;
  }
  contactsHeaderQuantity.innerHTML = contacts.length;
  totalContactsQuantity.innerHTML = contacts.length;
  contactsViewPort.innerHTML = mainContacts;
}

function UpdateContact(displayedContacts, index) {
  var contact = `
                <div class="col-sm-6 align-items-center   ">
                      <div class="contact-card  h-100  border border-gray-100 border-1">
                        <div class="contact-card-info h-75 bg-white rounded-3 ">
                          <div class="d-flex gap-3">
                            <div class="position-relative icon-56 rounded-3">
                            ${
                              displayedContacts[index].isFavorite
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
                              displayedContacts[index].isEmergency
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
                               displayedContacts[index].avatarInput != null
                                 ? `  <img
                                class="rounded-3"
                                src="./images/${displayedContacts[index].avatarInput}"
                                alt=""
                              />`
                                 : `<div
                                class="gradient-div text-white d-flex align-items-center justify-content-center h-100 w-100 rounded-3"
                                 style="--avatar-gradient: ${
                                   displayedContacts[index].gradient
                                 }"
                              >
                                ${displayedContacts[
                                  index
                                ].fullName[0].toUpperCase()}
                              </div>`
                             }  
                            
                            </div>

                            <div>
                              <h3  class="fs-6 fw-600 ">${
                                displayedContacts[index].fullName
                              }</h3>
                              <div class="d-flex gap-2">
                                <div
                                  class="bg-blue-100 icon-24 rounded-3 d-flex align-items-center justify-content-center"
                                >
                                  <i
                                    class="fa-solid fa-phone text-blue-600 fs-10px"
                                  ></i>
                                </div>
                                <p class="m-0 text-gray-500 fs-14px">${
                                  displayedContacts[index].telephone
                                }</p>
                              </div>
                            </div>
                          </div>
                          ${
                            displayedContacts[index].email != ""
                              ? `<div class="d-flex gap-2 align-items-center mt-2">
                            <div
                              class="icon-28 bg-violet-100 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-envelope text-violet-600 fs-10px"
                              ></i>
                            </div>
                            <p class="m-0 text-gray-600 fs-14px">
                              ${displayedContacts[index].email}
                            </p>
                          </div>`
                              : ""
                          }
           
                        
                          ${
                            displayedContacts[index].address != ""
                              ? `   <div
                            class="d-flex gap-2 align-items-center rounded-3 mt-2"
                          ><div
                              class="icon-28 bg-green-100 rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-location-dot text-green-600 fs-10px"
                              ></i>
                            </div>
                                     <p class="m-0 text-gray-600 fs-14px">
                              ${displayedContacts[index].address}
                            </p>
                          </div>`
                              : ""
                          }
                            
                    
                          <div>
                          ${
                            displayedContacts[index].group == "family"
                              ? `   <div class="badge bg-blue-100 text-blue-700">
                              Family
                            </div>`
                              : displayedContacts[index].group == "friends"
                              ? `   <div class="badge bg-green-100 text-green-700">
                              Friends
                            </div>`
                              : displayedContacts[index].group == "work"
                              ? `   <div class="badge bg-purple-100 text-purple-700">
                              Work
                            </div>`
                              : displayedContacts[index].group == "school"
                              ? `   <div class="badge bg-amber-100 text-amber-700">
                              School
                            </div>`
                              : displayedContacts[index].group == "other"
                              ? `   <div class="badge bg-gray-100 text-gray-700">
                              Other
                            </div>`
                              : ""
                          }
                     
                            ${
                              displayedContacts[index].isEmergency
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
                              href="tel:${displayedContacts[index].telephone}"
                              class="call-action bg-emerald-50 border-0 icon-sm-32 icon-36 icon-md-36  rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-phone text-emerald-600 fs-14px"
                              ></i>
                            </a>
                            ${
                              displayedContacts[index].email != ""
                                ? `
                            <a
                              title="Email"
                              href="mailto:${displayedContacts[index].email}"
                              class="email-action bg-violet-50 border-0 icon-sm-32 icon-36 icon-md-36  rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-envelope text-violet-600 fs-14px"
                              ></i>
                            </a>`
                                : ""
                            }
                          </div>
                          <div class=" d-flex gap-2">
                            <a
                              onclick="ToggleFavorite(this,${index})"
                              title="Favorite"
                              class="favorite-action  ${
                                displayedContacts[index].isFavorite
                                  ? `active`
                                  : ""
                              } bg-gray-50 border-0 icon-sm-32 icon-36 icon-md-36  rounded-3 d-flex align-items-center justify-content-center pe-auto"
                            >
                              <i
                                class=" ${
                                  displayedContacts[index].isFavorite
                                    ? `fa-solid`
                                    : `fa-regular`
                                } fa-star text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                           
                              onclick="ToggleEmergency(this,${index})"
                              title="Emergency"
                             
                              class="emergency-action  ${
                                displayedContacts[index].isEmergency
                                  ? `active`
                                  : ""
                              } bg-gray-50 border-0 icon-sm-32 icon-36 icon-md-36  rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class=" ${
                                  displayedContacts[index].isEmergency
                                    ? `fa-solid fa-heart-pulse`
                                    : "fa-regular fa-heart"
                                } text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                              onclick="Update(${index})"
                              title="Edit"
                              class="edit-action bg-gray-50 border-0 icon-sm-32 icon-36 icon-md-36  rounded-3 d-flex align-items-center justify-content-center"
                            >
                              <i
                                class="fa-solid fa-pen text-gray-400 fs-14px"
                              ></i>
                            </a>
                            <a
                              onclick="DeleteContact(${index})"
                              title="Delete"
                              class="delete-action bg-gray-50 border-0 icon-sm-32 icon-36 icon-md-36 rounded-3 d-flex align-items-center justify-content-center"
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
                        class="contact-link d-flex align-items-center justify-content-between gap-2 bg-gray-50 p-2 border-2 border-gray-100 p-2 w-100  "
                      >
                        <div class="d-flex gap-2">
                          <div class="icon-56 icon-sm-40  rounded-3">
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
                            <h4 class="m-0 fs-6 fs-sm-10px fs-xl-14px  text-gray-900">${
                              contact.fullName
                            }</h4>
                            <p class="m-0 fs-14px fs-sm-10px fs-xl-12px text-gray-500">${
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
                        class="contact-link d-flex align-items-center justify-content-between gap-2 bg-gray-50 p-2 border-2 border-gray-100 p-2 w-100"
                      >
                        <div class="d-flex gap-2">
                          <div class="icon-56 icon-sm-40  rounded-3">
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
                            <h4 class="m-0 fs-6 fs-sm-10px fs-xl-14px text-gray-900">${
                              contact.fullName
                            }</h4>
                            <p class="m-0 fs-14px fs-sm-10px fs-xl-12px text-gray-500">${
                              contact.telephone
                            }</p>
                          </div>
                        </div>
                        <div>
                          <a
                            href="tel:${contact.telephone}"
                            class="icon-24 icon-xl-32 rounded-3 d-flex align-items-center justify-content-center bg-rose-100"
                          >
                            <i
                              class="fa-solid fa-phone text-rose-600 fs-8px fs-xl-12px"
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

function FindContact(value) {
  var filteredContacts = [];
  console.log(value);
  contacts.forEach((contact) => {
    if (
      contact.fullName.toLowerCase().includes(value.toLowerCase()) ||
      contact.telephone.toLowerCase().includes(value.toLowerCase()) ||
      contact.email.toLowerCase().includes(value.toLowerCase())
    ) {
      console.log(contact.fullName);
      filteredContacts.push(contact);
    }
  });
  if (filteredContacts.length === 0) UpdateMainContacts(contacts);
  UpdateMainContacts(filteredContacts);
}
function ResetProfileImg() {
  avatarImg.innerHTML = ` <i class="fa-solid fa-user fs-30px text-white"></i>`;
}

function UpdateProfileImg(input) {
  avatarImg.innerHTML = `  <img
                                class="rounded-circle object-fit-cover  "
                                src="./images/${input.files[0].name}"
                                alt=""
                              />`;
}

function ShowMessage() {
  Swal.fire({
    title: editMode ? "Updated" : "Added!",
    text: editMode
      ? "Contact has been updated successfully."
      : "Contact has been added successfully.",
    icon: "success",
    showConfirmButton: false,
    timer: 1000,
  });
}

function seedContacts() {
  const groups = ["family", "friends", "work", "school", "other"];

  const gradients = [
    "linear-gradient(to bottom right, #60a5fa, #2563eb)", // blue
    "linear-gradient(to bottom right, #4ade80, #16a34a)", // green
    "linear-gradient(to bottom right, #c084fc, #7c3aed)", // purple
    "linear-gradient(to bottom right, #fbbf24, #d97706)", // amber
    "linear-gradient(to bottom right, #f472b6, #db2777)", // pink
    "linear-gradient(to bottom right, #2dd4bf, #0f766e)", // teal
    "linear-gradient(to bottom right, #818cf8, #4338ca)", // indigo
    "linear-gradient(to bottom right, #f87171, #b91c1c)", // red
    "linear-gradient(to bottom right, #22d3ee, #0e7490)", // cyan
    "linear-gradient(to bottom right, #a78bfa, #6d28d9)", // violet
  ];

  contacts = [
    {
      avatarInput: null,
      gradient: gradients[0],
      fullName: "Ahmed Ali",
      telephone: "+201001234561",
      email: "ahmed.ali@example.com",
      address: "Cairo, Egypt",
      group: groups[0],
      notes: "Brother",
      isFavorite: true,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[1],
      fullName: "Mohamed Hassan",
      telephone: "+201001234562",
      email: "mohamed.hassan@example.com",
      address: "Giza, Egypt",
      group: groups[1],
      notes: "College friend",
      isFavorite: false,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[2],
      fullName: "Sara Mahmoud",
      telephone: "+201001234563",
      email: "sara.mahmoud@example.com",
      address: "Alexandria, Egypt",
      group: groups[2],
      notes: "Project manager",
      isFavorite: true,
      isEmergency: true,
    },
    {
      avatarInput: null,
      gradient: gradients[3],
      fullName: "Omar Adel",
      telephone: "+201001234564",
      email: "omar.adel@example.com",
      address: "Mansoura, Egypt",
      group: groups[3],
      notes: "School friend",
      isFavorite: false,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[4],
      fullName: "Nour Salah",
      telephone: "+201001234565",
      email: "nour.salah@example.com",
      address: "Tanta, Egypt",
      group: groups[4],
      notes: "Other contact",
      isFavorite: false,
      isEmergency: true,
    },
    {
      avatarInput: null,
      gradient: gradients[5],
      fullName: "Khaled Mostafa",
      telephone: "+201001234566",
      email: "khaled.mostafa@example.com",
      address: "Ismailia, Egypt",
      group: groups[Math.floor(Math.random() * groups.length)],
      notes: "Team lead",
      isFavorite: true,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[6],
      fullName: "Mona Fathy",
      telephone: "+201001234567",
      email: "mona.fathy@example.com",
      address: "Zagazig, Egypt",
      group: groups[Math.floor(Math.random() * groups.length)],
      notes: "Best friend",
      isFavorite: true,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[7],
      fullName: "Hossam Youssef",
      telephone: "+201001234568",
      email: "hossam.youssef@example.com",
      address: "Asyut, Egypt",
      group: groups[Math.floor(Math.random() * groups.length)],
      notes: "Mechanic",
      isFavorite: false,
      isEmergency: true,
    },
    {
      avatarInput: null,
      gradient: gradients[8],
      fullName: "Laila Samir",
      telephone: "+201001234569",
      email: "laila.samir@example.com",
      address: "Fayoum, Egypt",
      group: groups[Math.floor(Math.random() * groups.length)],
      notes: "HR",
      isFavorite: false,
      isEmergency: false,
    },
    {
      avatarInput: null,
      gradient: gradients[9],
      fullName: "Youssef Emad",
      telephone: "+201001234570",
      email: "youssef.emad@example.com",
      address: "Suez, Egypt",
      group: groups[Math.floor(Math.random() * groups.length)],
      notes: "Gym buddy",
      isFavorite: true,
      isEmergency: false,
    },
  ];
}
