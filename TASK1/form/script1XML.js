
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

    // SEND DATA TO SERVER (AJAX - FETCH)
    function sendDataXHR(userData) {
        const xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:3000/users", true);
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {  
                if (xhr.status === 201) {  
                    alert("Registration Successful (XHR)!");
                    console.log("Server Response:", xhr.responseText);
                } else {
                    alert("Error sending data to server!");
                    console.error(xhr.responseText);
                }
            }
        };

        xhr.send(JSON.stringify(userData));
    }
    const userData = {
    email: email.value,
    phone_number: phone.value,
    password: password.value
};

// call XHR function
sendDataXHR(userData);

});