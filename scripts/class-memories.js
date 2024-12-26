// Select DOM elements
const photoInput = document.getElementById("photo-input");
const captionInput = document.getElementById("caption-input");
const detailsInput = document.getElementById("details-input");
const uploadPopup = document.getElementById("upload-popup");
const saveMemoryButton = document.getElementById("save-memory");
const cancelUploadButton = document.getElementById("cancel-upload");
const uploadButton = document.getElementById("upload-button");
const gallery = document.getElementById("gallery");

// Load memories from localStorage or initialize empty
let memories = JSON.parse(localStorage.getItem("memories")) || [];

// Function to render memories
function renderMemories() {
    gallery.innerHTML = ""; // Clear gallery
    memories.forEach((memory, index) => {
        const memoryDiv = document.createElement("div");
        memoryDiv.classList.add("memory");

        const img = document.createElement("img");
        img.src = memory.photo;
        img.alt = memory.caption;

        const caption = document.createElement("h4");
        caption.textContent = memory.caption;

        const details = document.createElement("p");
        details.textContent = memory.details;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-btn");
        deleteButton.addEventListener("click", () => {
            if (confirm("Are you sure you want to delete this memory?")) {
                memories.splice(index, 1);
                localStorage.setItem("memories", JSON.stringify(memories));
                renderMemories();
            }
        });

        memoryDiv.appendChild(img);
        memoryDiv.appendChild(caption);
        memoryDiv.appendChild(details);
        memoryDiv.appendChild(deleteButton);

        gallery.appendChild(memoryDiv);
    });
}

// Open the upload popup
uploadButton.addEventListener("click", () => {
    uploadPopup.classList.remove("hidden");
});

// Close the upload popup
cancelUploadButton.addEventListener("click", () => {
    uploadPopup.classList.add("hidden");
});

// Save a new memory
saveMemoryButton.addEventListener("click", () => {
    const file = photoInput.files[0];
    const caption = captionInput.value.trim();
    const details = detailsInput.value.trim();

    if (file && caption) {
        const reader = new FileReader();
        reader.onload = () => {
            const newMemory = {
                photo: reader.result,
                caption: caption,
                details: details,
            };
            memories.push(newMemory);
            localStorage.setItem("memories", JSON.stringify(memories));
            renderMemories();
            uploadPopup.classList.add("hidden");

            // Clear input fields
            photoInput.value = "";
            captionInput.value = "";
            detailsInput.value = "";
        };
        reader.readAsDataURL(file);
    } else {
        alert("Please upload an image and provide a caption.");
    }
});

// Initial render
renderMemories();
