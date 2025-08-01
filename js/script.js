const form = document.getElementById("registerForm");

const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");

const usernameError = document.getElementById("usernameError");
const emailError = document.getElementById("emailError");
const passwordError = document.getElementById("passwordError");
const confirmPasswordError = document.getElementById("confirmPasswordError");

const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const specialCharsRegex = /[!@#$%^&*()_\-+=,.?/]/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9])([^\s]){8,}$/;

const MSG_REQUIRED = "Bắt buộc nhập.";
const MSG_USERNAME_SPECIAL_CHARS = "Không nhập các ký tự đặc biệt: !@#$%^&*()_-+=,.?/";
const MSG_EMAIL_INVALID = "Nhập đúng định dạng email.";
const MSG_PASSWORD_INVALID = "Mật khẩu phải tối thiểu 8 ký tự, có ít nhất 1 chữ viết hoa, chữ thường, số, ký tự đặc biệt và không chứa khoảng trắng";
const MSG_CONFIRM_PASSWORD_MISMATCH = "Mật khẩu không khớp.";
const MSG_REGISTER_SUCCESS = "Đăng ký thành công";
const MSG_ALERT_WARNING = "Cảnh báo"; 

function validateUsername() {
    let valid = true;
    const usernameValue = username.value.trim();
    if (!usernameValue) {
        usernameError.textContent = MSG_REQUIRED; 
        valid = false;
    } else if (specialCharsRegex.test(usernameValue)) {
        usernameError.textContent = MSG_USERNAME_SPECIAL_CHARS; 
        valid = false;
    } else {
        usernameError.textContent = "";
    }
    return valid;
}

function validateEmail() {
    let valid = true;
    const emailValue = email.value.trim();
    if (!emailValue) {
        emailError.textContent = MSG_REQUIRED; 
        valid = false;
    } else if (!emailRegex.test(emailValue)) {
        emailError.textContent = MSG_EMAIL_INVALID;
        valid = false;
    } else {
        emailError.textContent = "";
    }
    return valid;
}

function validatePassword() {
    let valid = true;
    const passwordValue = password.value.trim();
    if (!passwordValue) {
        passwordError.textContent = MSG_REQUIRED; 
        valid = false;
    } else if (!passwordRegex.test(passwordValue)) {
        passwordError.textContent = MSG_PASSWORD_INVALID; 
        valid = false;
    } else {
        passwordError.textContent = "";
    }
    return valid;
}

function validateConfirmPassword() {
    let valid = true;
    const confirmPasswordValue = confirmPassword.value.trim();
    const passwordValue = password.value.trim();
    if (!confirmPasswordValue) {
        confirmPasswordError.textContent = MSG_REQUIRED; 
        valid = false;
    } else if (confirmPasswordValue !== passwordValue) {
        confirmPasswordError.textContent = MSG_CONFIRM_PASSWORD_MISMATCH; 
        valid = false;
    } else {
        confirmPasswordError.textContent = "";
    }
    return valid;
}

function validateForm() {
    const isUsernameValid = validateUsername();
    const isEmailValid = validateEmail();
    const isPasswordValid = validatePassword();
    const isConfirmPasswordValid = validateConfirmPassword();
    return isUsernameValid && isEmailValid && isPasswordValid && isConfirmPasswordValid;
}

form.addEventListener("submit", function (e) {
    e.preventDefault();

    if (validateForm()) {
        const userData = {
            username: username.value.trim(),
            email: email.value.trim(),
            password: password.value.trim(),
        };
        let users = JSON.parse(localStorage.getItem("registeredUsersArr")) || [];
        users.push(userData);
        localStorage.setItem("registeredUsersArr", JSON.stringify(users));
        alert(MSG_REGISTER_SUCCESS); 
        form.reset();
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
    } else {
        alert(MSG_ALERT_WARNING); 
    }
});

username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);
