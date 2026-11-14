
document.addEventListener("DOMContentLoaded", function () {

    // =========================
    // MOBILE NAVIGATION
    // =========================

    const menuBtn = document.getElementById("menuBtn");
    const navLinks = document.getElementById("navLinks");

    if (menuBtn && navLinks) {

        menuBtn.addEventListener("click", function () {

            navLinks.classList.toggle("show");

            const icon = menuBtn.querySelector("i");

            icon.classList.toggle("fa-bars");
            icon.classList.toggle("fa-xmark");

        });

        document.querySelectorAll(".nav-links a").forEach(link => {

            link.addEventListener("click", function () {

                navLinks.classList.remove("show");

                const icon = menuBtn.querySelector("i");

                icon.classList.add("fa-bars");
                icon.classList.remove("fa-xmark");

            });

        });

    }


    // =========================
    // BMI CALCULATOR
    // =========================

    const calculateBmiBtn = document.getElementById("calculateBmiBtn");

    if (calculateBmiBtn) {

        calculateBmiBtn.addEventListener("click", function () {

            const height = Number(document.getElementById("height").value);
            const weight = Number(document.getElementById("weight").value);

            const result = document.getElementById("bmiResult");

            if (
                !height ||
                !weight ||
                height < 50 ||
                height > 250 ||
                weight < 10 ||
                weight > 500
            ) {

                alert("Please enter valid height and weight.");
                return;

            }

            const heightMeter = height / 100;

            const bmi = weight / (heightMeter * heightMeter);

            let category = "";

            if (bmi < 18.5) {

                category = "Below the usual adult BMI range";

            } else if (bmi < 25) {

                category = "Within the usual adult BMI range";

            } else if (bmi < 30) {

                category = "Above the usual adult BMI range";

            } else {

                category = "High BMI range";

            }

            document.getElementById("bmiValue").textContent =
                "BMI: " + bmi.toFixed(1);

            document.getElementById("bmiCategory").textContent =
                category;

            result.style.display = "block";

        });

    }


    // =========================
    // BOOKING FORM
    // =========================

    const bookingForm = document.getElementById("bookingForm");

    if (bookingForm) {

        bookingForm.addEventListener("submit", function (event) {

            event.preventDefault();

            const booking = {

                name: document.getElementById("fullName").value.trim(),

                phone: document.getElementById("phone").value.trim(),

                email: document.getElementById("email").value.trim(),

                program: document.getElementById("program").value,

                date: document.getElementById("visitDate").value,

                time: document.getElementById("visitTime").value,

                createdAt: new Date().toISOString()

            };

            let bookings = [];

            try {

                bookings = JSON.parse(
                    localStorage.getItem("ironcoreBookings") || "[]"
                );

                if (!Array.isArray(bookings)) {
                    bookings = [];
                }

            } catch (error) {

                bookings = [];

            }

            bookings.push(booking);

            localStorage.setItem(
                "ironcoreBookings",
                JSON.stringify(bookings)
            );

            document.getElementById("bookingMessage").textContent =
                "Your demo booking request has been saved successfully!";

            bookingForm.reset();

        });

    }


    // =========================
    // PREVENT PAST BOOKING DATES
    // =========================

    const dateInput = document.getElementById("visitDate");

    if (dateInput) {

        const today = new Date();

        const localToday = new Date(
            today.getTime() - today.getTimezoneOffset() * 60000
        ).toISOString().split("T")[0];

        dateInput.min = localToday;

    }

});
