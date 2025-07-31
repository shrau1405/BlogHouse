// Wait until DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Select all comment forms on the page (featured + grid posts)
  const commentForms = document.querySelectorAll('.comment-form');

// Loop through each form and add a submit event listener
  commentForms.forEach(form => {
    form.addEventListener('submit', function (event) {
      event.preventDefault();  // Prevent default form submission behavior (page reload)

// Get the input elements for name and message within the current form
      const nameInput = form.querySelector('.comment-name');
      const messageInput = form.querySelector('.comment-message');
      const commentsList = form.nextElementSibling;  // Get the comments container (div.comments-list) right after the form

      // Get trimmed values from the inputs
      const name = nameInput.value.trim();
      const message = messageInput.value.trim();

// Check if either field is empty
      if (!name || !message) {
        alert('Please enter your name and comment.');
        return;  // Exit the function if validation fails
      }

      // Create new comment div
      const commentDiv = document.createElement('div');
      commentDiv.classList.add('comment');  // Add class for styling


      // Format comment with name in bold and message below
      commentDiv.innerHTML = `<strong>${escapeHtml(name)}</strong><p>${escapeHtml(message)}</p>`;

      // Append new comment to comments list
      commentsList.appendChild(commentDiv);

      // Clear the form fields
      nameInput.value = '';
      messageInput.value = '';
    });
  });
});


// Helper function to escape HTML for security
function escapeHtml(text) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}


// Function to search posts based on the text entered in the search bar
function searchPosts() {
  const query = document.getElementById('searchBar').value.toLowerCase();
  const posts = document.querySelectorAll('.blog-post');

// Loop through all posts and show/hide based on whether the title includes the search query
  posts.forEach(post => {
    const title = post.querySelector('h2').textContent.toLowerCase();
    post.style.display = title.includes(query) ? 'block' : 'none';
  });
}

// Add event listeners to trigger search on input change and search icon click
document.getElementById('searchBar').addEventListener('input', searchPosts);
document.getElementById('searchIconBtn').addEventListener('click', searchPosts);

// Function to toggle fullscreen mode for a blog post
function toggleFullScreen(button) {
  const post = button.parentElement;  // Get the parent blog post container


  if (!document.fullscreenElement) {
// If not already in fullscreen, request it on the post element
    post.requestFullscreen().then(() => {
// Smooth scroll to top after entering fullscreen
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }).catch(err => {
// Show error message if fullscreen request fails
      alert(`Error: ${err.message}`);
    });
  } else {
// Exit fullscreen mode if already in fullscreen
    document.exitFullscreen();
  }
}

// Listen for fullscreen mode changes to toggle the expand/compress icon
document.addEventListener('fullscreenchange', () => {
  const isFullscreen = !!document.fullscreenElement;
  const allButtons = document.querySelectorAll('.expand-btn i');
// Loop through each icon and update the class based on fullscreen state
  allButtons.forEach(icon => {
    icon.classList.remove('fa-compress', 'fa-expand');
    icon.classList.add(isFullscreen ? 'fa-compress' : 'fa-expand');
  });
});
