var id = null;

function loadCaptcha() {
    PlayerIO.quickConnect.simpleGetCaptcha(
        "ant-n-run-oqhuuptyugjyxyfjuzv1w",
        300,
        50,
        function (captcha) {
            document.getElementById("captchaImage").src = captcha.captchaImageUrl;
            id = captcha.captchaKey;
        },
        function (error) {
            console.error("Captcha load failed:", error);
        }
    );
}

// Initial load
loadCaptcha();

// Reload button
document.getElementById('reloadCaptchaButton').addEventListener('click', function () {
    loadCaptcha();
});




document.getElementById('registerForm').addEventListener('submit', function (e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    const userCaptchaInput = document.getElementById('captchaInput').value;

    // Basic validation
    if (password !== confirmPassword) {
        alert("Passwords do not match!");
        return;
    }

    PlayerIO.authenticate(
        "ant-n-run-oqhuuptyugjyxyfjuzv1w",
        "public",                                   //A connection with the authentication type SimpleUsers
        {
            register: "true",
            username: username,
            password: password,
            email: email,
            captchaKey: id,                        //The captcha key we got earlier
            captchaValue: userCaptchaInput,     //What the user entered
        },
        {},
        function (client) {
            alert(`Registration successful!\nUsername: ${username}\nEmail: ${email}`);
        },
        function (error) {
            alert(error)
        }
    );
    
    // Optionally, clear the form
    document.getElementById('registerForm').reset();
});