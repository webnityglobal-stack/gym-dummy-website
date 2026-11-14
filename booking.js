
document.addEventListener("DOMContentLoaded", function () {

    const params = new URLSearchParams(window.location.search);

    const programSelect = document.getElementById("program");
    const planSelect = document.getElementById("plan");
    const bookingForm = document.getElementById("bookingForm");
    const bookingMessage = document.getElementById("bookingMessage");
    const visitDate = document.getElementById("visitDate");

    // Preselect program from URL
    const selectedProgram = params.get("program");

    if (selectedProgram && programSelect) {
        programSelect.value = selectedProgram;
    }

    // Preselect membership plan from URL
    const selectedPlan = params.get("plan");

    if (selectedPlan && planSelect) {
        planSelect.value = selectedPlan;
    }

    // Set minimum booking date to today
    if (visitDate) {
        const today = new Date();
        const localDate = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        visitDate.min = localDate;
    }

    // Booking form submission
    if (bookingForm) {
        bookingForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const booking = {
                id: Date.now(),
                name: document.getElementById("fullName").value.trim(),
                phone: document.getElementById("phone").value.trim(),
                email: document.getElementById("email").value.trim(),
                program: programSelect.value,
                plan: planSelect.value,
                date: visitDate.value,
                time: document.getElementById("visitTime").value,
                message: document.getElementById("message").value.trim(),
                submittedAt: new Date().toISOString()
            };

            if (!/^[0-9]{10}$/.test(booking.phone)) {
                bookingMessage.textContent = "Please enter a valid 10-digit mobile number.";
                bookingMessage.style.color = "#ff5b52";
                return;
            }

            const existingBookings = JSON.parse(
                localStorage.getItem("ironcoreBookings") || "[]"
            );

            existingBookings.push(booking);

            localStorage.setItem(
                "ironcoreBookings",
                JSON.stringify(existingBookings)
            );

            bookingMessage.textContent =
                "Your booking request has been saved successfully! Our team will contact you.";

            bookingMessage.style.color = "#4ade80";

            bookingForm.reset();

            // Clear query preselection after successful booking
            if (programSelect) programSelect.value = "";
            if (planSelect) planSelect.value = "";
        });
    }

});
