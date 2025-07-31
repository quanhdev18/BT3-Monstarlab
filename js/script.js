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

function validateUsername() {
    let valid = true;
    if (!username.value) {
        usernameError.textContent = "Bắt buộc nhập.";
        valid = false;
    } else if (specialCharsRegex.test(username.value)) {
        usernameError.textContent = "Không nhập các ký tự đặc biệt: !@#$%^&*()_-+=,.?/";
        valid = false;
    } else {
        usernameError.textContent = "";
    }
    return valid;
}

function validateEmail() {
    let valid = true;
    if (!email.value) {
        emailError.textContent = "Bắt buộc nhập.";
        valid = false;
    } else if (!emailRegex.test(email.value)) {
        emailError.textContent = "Nhập đúng định dạng email.";
        valid = false;
    } else {
        emailError.textContent = "";
    }
    return valid;
}

function validatePassword() {
    let valid = true;
    if (!password.value) {
        passwordError.textContent = "Bắt buộc nhập.";
        valid = false;
    } else if (!passwordRegex.test(password.value)) {
        passwordError.textContent = "Mật khẩu phải tối thiểu 8 ký tự, có ít nhất 1 chữ viết hoa, chữ thường, số, ký tự đặc biệt và không chứa khoảng trắng";
        valid = false;
    } else {
        passwordError.textContent = "";
    }
    return valid;
}

function validateConfirmPassword() {
    let valid = true;
    if (!confirmPassword.value) { 
        confirmPasswordError.textContent = "Bắt buộc nhập.";
        valid = false;
    } else if (confirmPassword.value !== password.value) { 
        confirmPasswordError.textContent = "Mật khẩu không khớp.";
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
            username: username.value,
            email: email.value,
            password: password.value,
        };
        let users = JSON.parse(localStorage.getItem("registeredUsersArr")) || [];
        users.push(userData);
        localStorage.setItem("registeredUsersArr", JSON.stringify(users));
        alert("Đăng ký thành công");
        form.reset();
        usernameError.textContent = "";
        emailError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";
    } else {
        alert("Cảnh báo");
    }
});

username.addEventListener("input", validateUsername);
email.addEventListener("input", validateEmail);
password.addEventListener("input", validatePassword);
confirmPassword.addEventListener("input", validateConfirmPassword);