const form = document.getElementById('registrationForm');
const fullName = document.getElementById('fullName');
const email = document.getElementById('email');
const phone = document.getElementById('phone');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirmPassword');
const successMessage = document.getElementById('successMessage');

// Form submission handler
form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Reset success message
    successMessage.classList.remove('show');

    // Validate all fields
    const isValidName = validateFullName();
    const isValidEmail = validateEmail();
    const isValidPassword = validatePassword();
    const isValidConfirmPassword = validateConfirmPassword();

    // If all validations pass
    if (isValidName && isValidEmail && isValidPassword && isValidConfirmPassword) {
        // Show success message
        successMessage.classList.add('show');

        // Reset form
        form.reset();

        // Remove success/error classes
        document.querySelectorAll('input').forEach(input => {
            input.classList.remove('success', 'error');
        });

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});

// Real-time validation on blur
fullName.addEventListener('blur', validateFullName);
email.addEventListener('blur', validateEmail);
password.addEventListener('blur', validatePassword);
confirmPassword.addEventListener('blur', validateConfirmPassword);

// Validate confirm password when password changes
password.addEventListener('input', function () {
    if (confirmPassword.value !== '') {
        validateConfirmPassword();
    }
});

function validateFullName() {
    const value = fullName.value.trim();
    const errorElement = document.getElementById('fullNameError');

    if (value === '') {
        showError(fullName, errorElement, 'Full name is required');
        return false;
    } else if (value.length < 3) {
        showError(fullName, errorElement, 'Full name must be at least 3 characters');
        return false;
    } else {
        showSuccess(fullName, errorElement);
        return true;
    }
}

function validateEmail() {
    const value = email.value.trim();
    const errorElement = document.getElementById('emailError');
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (value === '') {
        showError(email, errorElement, 'Email address is required');
        return false;
    } else if (!emailPattern.test(value)) {
        showError(email, errorElement, 'Please enter a valid email address');
        return false;
    } else {
        showSuccess(email, errorElement);
        return true;
    }
}

function validatePassword() {
    const value = password.value;
    const errorElement = document.getElementById('passwordError');

    if (value === '') {
        showError(password, errorElement, 'Password is required');
        return false;
    } else if (value.length < 8) {
        showError(password, errorElement, 'Password must be at least 8 characters long');  // FIXED: String on one line
        return false;
    } else {
        showSuccess(password, errorElement);
        return true;
    }
}

function validateConfirmPassword() {
    const value = confirmPassword.value;
    const errorElement = document.getElementById('confirmPasswordError');

    if (value === '') {
        showError(confirmPassword, errorElement, 'Please confirm your password');
        return false;
    } else if (value !== password.value) {
        showError(confirmPassword, errorElement, 'Passwords do not match');
        return false;
    } else {
        showSuccess(confirmPassword, errorElement);
        return true;
    }
}

function showError(input, errorElement, message) {
    input.classList.remove('success');
    input.classList.add('error');
    errorElement.textContent = message;
    errorElement.classList.add('show');
}

function showSuccess(input, errorElement) {
    input.classList.remove('error');
    input.classList.add('success');
    errorElement.classList.remove('show');
}