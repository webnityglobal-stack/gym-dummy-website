
document.addEventListener("DOMContentLoaded", function () {

    const contactForm = document.getElementById("contactForm");
    const contactMessage = document.getElementById("contactMessage");

    if (!contactForm) return;

    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = document.getElementById("contactName").value.trim();
        const phone = document.getElementById("contactPhone").value.trim();
        const email = document.getElementById("contactEmail").value.trim();
        const subject = document.getElementById("contactSubject").value;
        const message = document.getElementById("contactText").value.trim();

        if (!/^[0-9]{10}$/.test(phone)) {
            contactMessage.textContent = "Please enter a valid 10-digit mobile number.";
            contactMessage.style.color = "#ff5b52";
            return;
        }

        const enquiry = {
            id: Date.now(),
            name,
            phone,
            email,
            subject,
            message,
            submittedAt: new Date().toISOString()
        };

        try {
            const enquiries = JSON.parse(
                localStorage.getItem("ironcoreEnquiries") || "[]"
            );

            enquiries.push(enquiry);

            localStorage.setItem(
                "ironcoreEnquiries",
                JSON.stringify(enquiries)
            );

            contactMessage.textContent =
                "Thank you! Your enquiry has been saved successfully.";

            contactMessage.style.color = "#4ade80";

            contactForm.reset();

        } catch (error) {
            contactMessage.textContent =
                "Unable to save your enquiry. Please try again.";

            contactMessage.style.color = "#ff5b52";
        }
    });

});
