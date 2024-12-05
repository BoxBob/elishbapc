
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.querySelector(".contactus");

    contactForm.addEventListener("submit", function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Gather form data
        const formData = {
            name: document.getElementById("name").value,
            mobile: contactForm.querySelector("[name='mobile']").value,
            address: contactForm.querySelector("[name='address']").value,
            pest_problem: contactForm.querySelector("[name='pest_problem']").value
        };

        // Send form data via fetch
        fetch("https://formsubmit.co/ajax/johnisahoe420@gmail.com", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(formData)
        })
            .then(response => response.json())
            .then(data => {
                console.log(data); // Log the server response
                alert("Form submitted successfully!");
                contactForm.reset(); // Clear the form fields
            })
            .catch(error => {
                console.error("Error:", error);
                alert("There was an error submitting the form. Please try again.");
            });
    });
});