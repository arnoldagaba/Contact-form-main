let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let consent = document.getElementById('consent');
let request = document.getElementById('request');
let enquiry = document.getElementById('enquiry');
let submitBtn = document.querySelector('button');

// Display error message below input
function displayError(input, message) {
    let existingError = input.parentElement.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    let errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.style.color = 'red';
    errorElement.textContent = message;
    input.parentElement.appendChild(errorElement);
}

// Validate function for inputs
function validate(input) {
    let isValid = true;

    // Check for text fields
    if (input.type === 'text' && input.value.trim() === '') {
        displayError(input, 'This field is required.');
        isValid = false;
    }
    // Check for valid email
    else if (input.type === 'email') {
        let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        if (input.value.trim() === '') {
            displayError(input, 'This field is required.');
            isValid = false;
        } else if (!emailPattern.test(input.value)) {
            displayError(input, 'Please enter a valid email address.');
            isValid = false;
        }
    }
    // Check if consent checkbox is checked
    else if (input.type === 'checkbox' && !input.checked) {
        displayError(input, 'To submit this form, please consent to being contacted.');
        isValid = false;
    }

    return isValid;
}

// Validate radio buttons
function validateRadio() {
    let isRadioValid = true;

    if (!request.checked && !enquiry.checked) {
        displayError(request, 'Please select a query type.');
        isRadioValid = false;
    }

    return isRadioValid;
}

// Function to show success toast
function showToast() {
    let toast = document.getElementById("toast");
    toast.innerHTML = `
        <h2><img src="assets/images/icon-success-check.svg" width="20px" height="20px" />Message Sent!</h2>
        <p>Thanks for completing the form. We'll be in touch soon!</p>
    `;
    toast.classList.add("show");

    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Submit button click handler
submitBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Include request and enquiry radio buttons as part of validation
    let inputFields = [firstname, lastname, email, consent];
    let isFormValid = true;

    // Clear any existing errors
    inputFields.forEach(inputField => {
        let error = inputField.parentElement.querySelector('.error');
        if (error) {
            error.remove();
        }
    });

    // Validate text fields, email, and consent
    inputFields.forEach(input => {
        if (!validate(input)) {
            isFormValid = false;
        }
    });

    // Validate radio buttons separately
    if (!validateRadio()) {
        isFormValid = false;
    }

    // Show success toast only if the form is valid
    if (isFormValid) {
        showToast();
    }
});