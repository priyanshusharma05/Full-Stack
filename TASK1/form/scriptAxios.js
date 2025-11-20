const form = document.getElementById("form");
const nameField = document.getElementById("name");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const password = document.getElementById("password");
const cpassword = document.getElementById("confirm-password");
const country = document.getElementById("country");
const terms = document.getElementById("terms");

form.addEventListener("submit", async function (e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    if (!nameRegex.test(nameField.value.trim())) {
        alert("Enter a valid full name.");
        return;
    }
    if (!emailRegex.test(email.value.trim())) {
        alert("Enter a valid email.");
        return;
    }
    if (!phoneRegex.test(phone.value.trim())) {
        alert("Enter a valid phone number.");
        return;
    }
    if (country.value === "") {
        alert("Please select a country.");
        return;
    }
    if (!passRegex.test(password.value)) {
        alert("Invalid password format.");
        return;
    }
    if (password.value !== cpassword.value) {
        alert("Passwords do not match.");
        return;
    }
    if (!terms.checked) {
        alert("Accept Terms & Conditions.");
        return;
    }

    const userData = {
        name: nameField.value,
        email: email.value,
        phone: phone.value,
        country: country.value,
        gender: document.querySelector("input[name='gender']:checked").id,
        password: password.value
    };

    try {
        const response = await axios.post("http://localhost:3000/users", userData);
        console.log(response.data);
        alert("Registration Successful! (Axios)");
    } catch (error) {
        console.error(error);
        alert("Failed to connect to server.");
    }
});
