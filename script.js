let firstname = document.getElementById('firstname');
let lastname = document.getElementById('lastname');
let email = document.getElementById('email');
let message = document.getElementById('message');
let consent = document.getElementById('consent');
let request = document.getElementById('request');
let enquiry = document.getElementById('inquiry');
let submitBtn = document.querySelector('button');

// Display error message below input
function displayError(input, message) {
    // Remove any previous error message for this input
    let existingError = input.parentElement.querySelector('.error');
    if (existingError) {
        existingError.remove();
    }

    // Create a new error message element
    let errorElement = document.createElement('div');
    errorElement.className = 'error';
    errorElement.style.color = 'red';
    errorElement.textContent = message;

    // Append the error message below the input field
    input.parentElement.appendChild(errorElement);
}

// Validate function for inputs
function validate(input) {
    let isValid = true; // Assume valid initially

    // Check for text fields
    if (input.type === 'text' && input.value.trim() === '') {
        displayError(input, 'This field is required.');
        isValid = false;
    }
    // Check for valid email
    else if (input.type === 'email') {
        let emailPattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;

        if (!emailPattern.test(input.value)) {
            displayError(input, 'Please enter a valid email address.');
            isValid = false;
        } else if (input.value.trim() === '') {
            displayError(input, 'This field is required.');
            isValid = false;
        }
    }
    // Check if request and enquiry are selected
    else if (input.id === 'request' && input.value === '') {
        displayError(input, 'Please select a request type.');
        isValid = false;
    } else if (input.id === 'inquiry' && input.value === '') {
        displayError(input, 'Please select a query type.');
        isValid = false;
    }
    // Check if consent checkbox is checked
    else if (input.type === 'checkbox' && !input.checked) {
        displayError(input, 'To submit this form, please consent to being contacted.');
        isValid = false;
    }

    return isValid; // Return validity status
}

// Function to show success toast
function showToast() {
    let toast = document.getElementById("toast");

    toast.innerHTML = `
    <h2><img src="assets/images/icon-success-check.svg" width="10px" height="10px" />Message Sent!</h2>
    <p>Your message has been sent successfully.</p>
    `;
    toast.classList.add("show");

    // After 3 seconds, remove the show class to hide the toast
    setTimeout(function () {
        toast.classList.remove("show");
    }, 3000);
}

// Submit button click handler
submitBtn.addEventListener('click', function (e) {
    e.preventDefault(); // Prevent form submission

    let inputFields = [firstname, lastname, email, request, enquiry, consent]; // Correct field references
    let isFormValid = true;

    // Clear any existing errors
    inputFields.forEach(inputField => {
        let error = inputField.parentElement.querySelector('.error');
        if (error) {
            error.remove();
        }
    });

    // Validate each input field
    inputFields.forEach(inputField => {
        if (!validate(inputField)) {
            isFormValid = false;
        }
    });

    // If the form is valid, show the success toast
    if (isFormValid) {
        showToast();
    }
});
