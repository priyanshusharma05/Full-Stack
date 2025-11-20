
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
        alert("Enter a valid full name (only letters & spaces, 3–30 chars).");
        return;
    }

    if (!emailRegex.test(email.value.trim())) {
        alert("Enter a valid email address.");
        return;
    }

    if (!phoneRegex.test(phone.value.trim())) {
        alert("Enter a valid 10-digit Indian phone number starting with 6-9.");
        return;
    }

    if (country.value === "") {
        alert("Please select a country.");
        return;
    }

    if (!passRegex.test(password.value)) {
        alert("Password must be 8+ chars, include uppercase, lowercase, number, and special char.");
        return;
    }

    if (password.value !== cpassword.value) {
        alert("Passwords do not match.");
        return;
    }

    if (!terms.checked) {
        alert("You must agree to Terms & Conditions.");
        return;
    }

    // ------------------------------------
    // 👉 SEND DATA TO SERVER (AJAX - FETCH)
    // ------------------------------------
    const userData = {
        name: nameField.value,
        email: email.value,
        phone: phone.value,
        country: country.value,
        gender: document.querySelector("input[name='gender']:checked").id,
        password: password.value
    };

    try {
        const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userData)
        });

        const result = await response.json();
        console.log(result);

        alert("Registration Successful!(Fetch API)");
    } catch (error) {
        console.error("Error:", error);
        alert("Failed to connect to server.");
    }
});
