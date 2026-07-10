const form = document.getElementById("settings-form");
const successMessage = document.getElementById("form-success");
const bioField = document.getElementById("bio");
const bioCount = document.getElementById("bio-count");
const validators = {
  displayName: {
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Display name is required.";
      if (trimmed.length < 2) return "Display name must be at least 2 characters.";
      if (trimmed.length > 50) return "Display name must be 50 characters or fewer.";
      if (!/^[a-zA-Z\s'-]+$/.test(trimmed)) {
        return "Display name may only contain letters, spaces, hyphens, and apostrophes.";
      }
      return "";
    },
  },
  email: {
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "Email is required.";
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailPattern.test(trimmed)) return "Please enter a valid email address.";
      return "";
    },
  },
  phone: {
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "";
      const digits = trimmed.replace(/\D/g, "");
      if (digits.length < 10 || digits.length > 15) {
        return "Phone number must contain 10 to 15 digits.";
      }
      if (!/^[\d\s\-()+ ]+$/.test(trimmed)) {
        return "Phone number contains invalid characters.";
      }
          },
  },
  password: {
    validate(value) {
      const trimmed = value.trim();
      if (!trimmed) return "";
      if (trimmed.length < 8) return "Password must be at least 8 characters.";
      if (!/[a-zA-Z]/.test(trimmed)) return "Password must include at least one letter.";
      if (!/\d/.test(trimmed)) return "Password must include at least one number.";
      return "";
    },
  },
  confirmPassword: {
    validate(value, formData) {
      const password = formData.password.trim();
      if (!password) return "";
      if (!value.trim()) return "Please confirm your new password.";
      if (value !== password) return "Passwords do not match.";
      return "";
    },
  },
};
function getFormData() {
  return {
    displayName: form.displayName.value,
    email: form.email.value,
    phone: form.phone.value,
    bio: form.bio.value,
    password: form.password.value,
    confirmPassword: form.confirmPassword.value,
    language: form.language.value,
    emailNotifications: form.emailNotifications.checked,
    marketingEmails: form.marketingEmails.checked,
  };
}
function setFieldState(fieldName, errorMessage) {
  const input = form[fieldName];
  const errorEl = document.getElementById(`${fieldName.replace(/([A-Z])/g, "-$1").toLowerCase()}-error`);
  if (!input || !errorEl) return false;
  const isValid = !errorMessage;
  input.classList.toggle("invalid", !isValid);
  input.classList.toggle("valid", isValid && input.value.trim() !== "");
  errorEl.textContent = errorMessage;
  return isValid;
}
function validateField(fieldName) {
  const formData = getFormData();
  const value = formData[fieldName];
  const validator = validators[fieldName];
  if (!validator) return true;
  const errorMessage = validator.validate(value, formData);
  return setFieldState(fieldName, errorMessage);
}
function validateForm() {
  const fieldNames = Object.keys(validators);
  const results = fieldNames.map((name) => validateField(name));
  return results.every(Boolean);
}
function hideSuccessMessage() {
  successMessage.textContent = "";
  successMessage.classList.remove("visible");
}
function showSuccessMessage() {
  successMessage.textContent = "Settings saved successfully!";
  successMessage.classList.add("visible");
}
function updateBioCount() {
  bioCount.textContent = bioField.value.length;
}
Object.keys(validators).forEach((fieldName) => {
  const input = form[fieldName];
  if (!input) return;
  input.addEventListener("blur", () => {
    validateField(fieldName);
    hideSuccessMessage();
  });
  input.addEventListener("input", () => {
    if (input.classList.contains("invalid")) {
      validateField(fieldName);
    }
    if (fieldName === "password" && form.confirmPassword.value) {
      validateField("confirmPassword");
    }
    hideSuccessMessage();
  });
});
bioField.addEventListener("input", updateBioCount);
form.addEventListener("submit", (event) => {
  event.preventDefault();
  hideSuccessMessage();
  if (!validateForm()) {
    const firstInvalid = form.querySelector(".invalid");
    if (firstInvalid) firstInvalid.focus();
    return;
  }
  const data = getFormData();
  console.log("Settings saved:", data);
  showSuccessMessage();
  form.password.value = "";
  form.confirmPassword.value = "";
  form.password.classList.remove("invalid", "valid");
  form.confirmPassword.classList.remove("invalid", "valid");
});
form.addEventListener("reset", () => {
  hideSuccessMessage();
  setTimeout(() => {
    form.querySelectorAll(".invalid, .valid").forEach((el) => {
      el.classList.remove("invalid", "valid");
    });
    form.querySelectorAll(".error-message").forEach((el) => {
      el.textContent = "";
    });
    updateBioCount();
  }, 0);
});
updateBioCount();
