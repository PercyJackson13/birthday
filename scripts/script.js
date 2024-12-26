console.log("Script loaded successfully.");

if (enteredPassword === password) {
    sessionStorage.setItem("loggedIn", "true");
    window.location.href = "main.html";
}



document.addEventListener('DOMContentLoaded', () => {
    const heartContainer = document.querySelector('.heart-container');

    function createHeart() {
        const heart = document.createElement('div');
        heart.className = 'heart';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${Math.random() * 5}s`;
        heartContainer.appendChild(heart);

        // Remove the heart after the animation
        setTimeout(() => heart.remove(), 5000);
    }

    // Generate hearts every 500ms
    setInterval(createHeart, 500);
});





// Handle "Like" button functionality
document.querySelectorAll('.like-btn').forEach((button, index) => {
    button.addEventListener('click', () => {
        const isLiked = button.classList.toggle('liked');
        button.textContent = isLiked ? '♥ Liked' : '♥ Like';
        button.style.background = isLiked ? '#ff5e5e' : '#ffa26b';
    });
});
