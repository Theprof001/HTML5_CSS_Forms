document.addEventListener('DOMContentLoaded', function () {
    const genderSelect = document.getElementById('genderSelect');
    const otherGenderInput = document.getElementById('otherGenderInput');
    const otherGenderLabel = document.getElementById('otherGenderLabel'); // Corrected this line

    genderSelect.addEventListener('change', function() {
        if (genderSelect.value === 'other') {
            otherGenderInput.style.display = 'inline-block';
            otherGenderLabel.style.display = 'inline-block';
            otherGenderInput.setAttribute('required', 'true');
        } else {
            otherGenderInput.style.display = 'none';
            otherGenderLabel.style.display = 'none';
            otherGenderInput.removeAttribute('required');
            otherGenderInput.value = '';
        }
    });

    async function fetchCountries() {
        try {
            const response = await fetch('countries.json'); // Added single quotes around the URL
            const countries = await response.json();
            const countryList = document.getElementById('countryList');
            countries.forEach((country) => {
                const option = document.createElement('option');
                option.textContent = country;
                option.value = country;
                countryList.appendChild(option);
            });
        } catch (error) {
            console.error('Error fetching countries data:', error);
        }
    }
    fetchCountries();

    let password = document.getElementById("password");
    let confirm_password = document.getElementById("confirm_password");
    let password_error = document.getElementById("password_error");
    function validatePassword() {
        if (password.value !== confirm_password.value) {
            confirm_password.setCustomValidity("Passwords Don't Match");
            password_error.textContent = "Passwords don't match.";
        } else {
            confirm_password.setCustomValidity('');
            password_error.textContent = "";
        }
    }
    password.addEventListener("input", validatePassword);
    confirm_password.addEventListener("input", validatePassword);

    // submit form with validation
    const signupForm = document.getElementById('signupForm');
    signupForm.addEventListener('submit', async function(event) {
        event.preventDefault();

        if (!signupForm.checkValidity()) {
            // show error message for invalid fields
            signupForm.reportValidity();
        } else {
            try {
                // send form data to link using Fetch API
                const formData = new FormData(signupForm);
                const response = await fetch('https://localhost:3000/submit', { 
                    method: 'POST',
                    body: formData
                });
                if (response.ok) {
                    // display success message in alert
                    alert('Form submitted successfully!');
                    // optional reset form after successful submission
                    signupForm.reset();
                } else {
                    alert('Form submission failed.');
                }
            } catch (error) {
                console.error('Error submitting form:', error);
                // display error message in alert
                alert('Form submission failed.');
            }
        }
    });
});
