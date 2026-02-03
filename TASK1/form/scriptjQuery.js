$("#form").on("submit", function (e) {
    e.preventDefault();

    const nameRegex = /^[A-Za-z ]{3,30}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;
    const passRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@#$%^&+=!]).{8,}$/;

    const name = $("#name").val().trim();
    const email = $("#email").val().trim();
    const phone = $("#phone").val().trim();
    const password = $("#password").val();
    const cpassword = $("#confirm-password").val();
    const country = $("#country").val();
    const gender = $("input[name='gender']:checked").attr("id");
    const terms = $("#terms").is(":checked");

    if (!nameRegex.test(name)) { alert("Enter a valid full name."); return; }
    if (!emailRegex.test(email)) { alert("Enter a valid email."); return; }
    if (!phoneRegex.test(phone)) { alert("Enter a valid phone number."); return; }
    if (country === "") { alert("Select country."); return; }
    if (!passRegex.test(password)) { alert("Invalid password."); return; }
    if (password !== cpassword) { alert("Passwords do not match."); return; }
    if (!terms) { alert("Accept Terms & Conditions."); return; }

    const userData = {
        name: name,
        email: email,
        phone: phone,
        country: country,
        gender: gender,
        password: password
    };

    $.ajax({
        url: "http://localhost:3000/users",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(userData),
        success: function (response) {
            console.log(response);
            alert("Registration Successful! (jQuery AJAX)");
        },
        error: function (err) {
            console.error(err);
            alert("Failed to connect to server.");
        }
    });
});
