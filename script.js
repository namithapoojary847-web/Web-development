/* ---------------- IMAGE MODAL ---------------- */
function openModal(img) {
    document.getElementById("modal").style.display = "flex";
    document.getElementById("modalImg").src = img.src;
}

function closeModal() {
    document.getElementById("modal").style.display = "none";
}

/* Close modal when clicking outside */
window.onclick = function (e) {
    const modal = document.getElementById("modal");
    if (e.target === modal) {
        closeModal();
    }
};

/* Close modal on ESC key */
document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
        closeModal();
    }
});





/* ---------------- FORM VALIDATION ---------------- */
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();

    if (name === "" || phone === "") {
        alert("Please fill all required fields");
        return false;
    }

    if (phone.length !== 10 || isNaN(phone)) {
        alert("Please enter a valid 10-digit phone number");
        return false;
    }

    alert("Appointment request sent successfully!");
    return true;
}


/* ---------------- SIMPLE FADE SLIDER ---------------- */
let slides = document.querySelectorAll(".slide");
let currentSlide = 0;

function showSlide(index) {
    slides.forEach(slide => slide.classList.remove("active"));
    if(slides[index]) {
        slides[index].classList.add("active");
    }
}

/* Show first image */
showSlide(currentSlide);

/* Auto-change slide every 3 seconds */
setInterval(function () {
    currentSlide++;
    if (currentSlide >= slides.length) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}, 3000);








/* ---------------- FEEDBACK SECTION ---------------- */

// Function to create and append feedback card
function addFeedbackCard(name, message, rating) {

    const feedbackList = document.getElementById("feedbackList");

    const card = document.createElement("div");
    card.classList.add("feedback-card");

    let heartsHTML = "";
    for(let i = 0; i < rating; i++) {
        heartsHTML += `<span class="heart">🤎</span>`;
    }

    card.innerHTML = `
        <h3>${name}</h3>
        <p>${message}</p>
        <div class="hearts">${heartsHTML}</div>
    `;

    feedbackList.appendChild(card);
}


// Load feedback from localStorage when page loads
window.addEventListener("DOMContentLoaded", () => {
    const savedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
    savedFeedback.forEach(fb => addFeedbackCard(fb.name, fb.message, fb.rating));
});


// Handle feedback form submission
document.addEventListener("DOMContentLoaded", function () {

const form = document.getElementById("feedbackForm");

form.addEventListener("submit", function(e){

e.preventDefault();

let name = document.getElementById("fbName").value.trim();
let message = document.getElementById("fbMessage").value.trim();
let rating = document.getElementById("fbRating").value;

let namePattern = /^[A-Za-z\s]+$/;

if(name === ""){
alert("Please enter your name");
return;
}

if(!namePattern.test(name)){
alert("Name should contain only letters");
return;
}

if(message === ""){
alert("Please enter your feedback");
return;
}

/* Add feedback card */
addFeedbackCard(name, message, rating);

/* Save to localStorage */

let savedFeedback = JSON.parse(localStorage.getItem("feedbacks")) || [];
savedFeedback.push({name, message, rating});
localStorage.setItem("feedbacks", JSON.stringify(savedFeedback));

/* Clear form */

form.reset();

});

});