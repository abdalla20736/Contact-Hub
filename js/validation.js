function ValidateForm(contactToAdd) {
  isUsedPhoneNumber = false;
  let nameOfExistPhone;
  for (var i = 0; i < contacts.length; i++) {
    if (contacts[i].telephone === contactToAdd.telephone) {
      isUsedPhoneNumber = true;
      nameOfExistPhone = contacts[i].fullName;
      break;
    }
  }


  if (
    CheckContactValidation(
      contactToAdd.fullName,
      contactToAdd.telephone,
      nameOfExistPhone
    )
  ) {
    return false;
  }

  return true;
}

function CheckContactValidation(...data) {
  var msgTitle;
  var msgText;
  if (data[0] === "") {
    msgTitle = "Missing Name";
    msgText = "Please enter a name for the contact!";
  } else if (!validName) {
    msgTitle = "Invalid Name";
    msgText = "Name should contain only letters and spaces (2-50 characters)";
  } else if (data[1] === "") {
    msgTitle = "Missing Phone";
    msgText = "Please enter a phone number!";
  } else if (!validPhone) {
    msgTitle = "Invalid Phone";
    msgText =
      "Please enter a valid Egyptian phone number (e.g., 01012345678 or +201012345678)";
  } else if (isUsedPhoneNumber) {
    msgTitle = "Duplicate Phone Number";
    msgText = `A contact with this phone number already exists: ${data[2]}`;
  } else if (!validEmail) {
    msgTitle = "Invalid Email";
    msgText = "Please enter a valid email address";
  } else {
    return false;
  }

  Swal.fire({
    title: msgTitle,
    text: msgText,
    icon: "error",
  });

  return true;
}

function ValidateInputs(input, index) {
  var regex;
  var msg;
  switch (index) {
    //full Name
    case 0: {
      var regex = /^[A-Za-z ]{2,50}$/;
      var msg = `Name should contain only letters and spaces (2-50 characters)`;
      ValidateInputByRegex(input, regex, msg)
        ? (validName = true)
        : (validName = false);
      break;
    }
    //Phone
    case 1: {
      var regex = /^(010|015|011|012)[0-9]{8}$/;
      var msg = `Please enter a valid Egyptian phone number`;
      ValidateInputByRegex(input, regex, msg)
        ? (validPhone = true)
        : (validPhone = false);
      break;
    }
    //email
    case 2: {
      var regex = /^[a-zA-Z0-9]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      var msg = `Please enter a valid email address`;
      ValidateInputByRegex(input, regex, msg)
        ? (validEmail = true)
        : (validEmail = false);
      break;
    }
  }
}

function ValidateInputByRegex(Input, regex, msg) {
  var validationText =
    Input.parentElement.getElementsByClassName("validation-output");
  validationText[0].innerHTML = msg;

  if (regex.test(Input.value) || Input.value === "") {
    validationText[0].classList.replace("d-block", "d-none");
    Input.style.borderColor = "#f3f4f6";
    return true;
  } else {
    validationText[0].classList.replace("d-none", "d-block");
    Input.style.borderColor = "red";
    Input.classList.remove("is-valid");
    return false;
  }
}
