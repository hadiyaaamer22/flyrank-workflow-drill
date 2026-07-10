// 1. Get DOM elements
const form = document.getElementById("settings-form");
const successMessage = document.getElementById("form-success");

// 2. Define our form fields, error elements, and explicit validation rules
const fields = {
  fullName: {
    input: document.getElementById("full-name"),
    error: document.getElementById("full-name-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Full name cannot be empty or just spaces.";
      }
      return "";
    }
  },
  email: {
    input: document.getElementById("email"),
    error: document.getElementById("email-error"),
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) {
        return "Email is required.";
      }
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(trimmed)) {
        return "Please enter a valid email address.";
      }
      return "";
    }
  },
  password: {
    input: document.getElementById("password"),
    error: document.getElementById("password-error"),
    validate(value) {
      if (value.length < 8) {
        return "Password must be at least 8 characters long.";
      }
      if (!/\d/.test(value)) {
        return "Password must contain at least one number.";
      }
      return "";
    }
  }
};

// 3. Clear all visual and assistive errors
function clearErrors() {
  Object.values(fields).forEach(({ input, error }) => {
    if (input && error) {
      input.classList.remove("invalid");
      input.removeAttribute("aria-invalid");
      error.textContent = "";
    }
  });
}

// 4. Highlight a specific field with an error (Preserves accessibility)
function showFieldError(field, message) {
  field.input.classList.add("invalid");
  field.input.setAttribute("aria-invalid", "true");
  field.error.textContent = message;
}

// 5. Main form validation orchestration loop
function validateForm() {
  clearErrors();
  if (successMessage) successMessage.classList.remove("visible");

  let isValid = true;
  let firstInvalidInput = null;

  // Run validation for each field systematically
  Object.values(fields).forEach((field) => {
    if (!field.input) return;
    
    const message = field.validate(field.input.value);
    if (message) {
      showFieldError(field, message);
      isValid = false;
      if (!firstInvalidInput) {
        firstInvalidInput = field.input;
      }
    }
  });

  // Focus the very first invalid field to improve user accessibility
  if (firstInvalidInput) {
    firstInvalidInput.focus();
  }

  return isValid;
}

// 6. Form Submission Handling
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault(); // Stop page reload

    if (validateForm()) {
      // If validation passes, display success feedback
      if (successMessage) {
        successMessage.textContent = "Your settings have been saved successfully!";
        successMessage.classList.add("visible");
      }
      
      console.log("Settings saved successfully:", {
        fullName: fields.fullName.input.value,
        email: fields.email.input.value
      });

      // Clear the sensitive password inputs for security
      if (fields.password.input) {
        fields.password.input.value = "";
      }
    }
  });
}