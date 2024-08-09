
document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const postId = urlParams.get('id');

  if (!postId) {
    alert("No post ID found.");
    return;
  }

  fetch(`/api/posts/${postId}`)
    .then(response => response.json())
    .then(post => {
      document.getElementById('post-title').textContent = post.title;
      document.getElementById('post-author').textContent = post.author;
      document.getElementById('post-date').textContent = new Date(post.date).toLocaleDateString();
      document.getElementById('video-source').src = post.videoUrl;
      document.getElementById('video-player').load();

      // Load comments
      loadComments(postId);
    })
    .catch(error => {
      console.error("Error loading post:", error);
      alert("Failed to load post.");
    });

  const commentForm = document.getElementById('comment-form');
  commentForm.addEventListener('submit', event => {
    event.preventDefault();
    submitComment(postId);
  });
});

function loadComments(postId) {
  fetch(`/api/posts/${postId}/comments`)
    .then(response => response.json())
    .then(comments => {
      const commentsContainer = document.getElementById('comments');
      commentsContainer.innerHTML = ""; // Clear existing comments

      if (comments.length === 0) {
        commentsContainer.innerHTML = "<p>No comments yet. Be the first to comment!</p>";
      } else {
        comments.forEach(comment => {
          const commentElement = document.createElement('p');
          commentElement.textContent = `${comment.author}: ${comment.text}`;
          commentsContainer.appendChild(commentElement);
        });
      }
    })
    .catch(error => {
      console.error("Error loading comments:", error);
      alert("Failed to load comments.");
    });
}

function submitComment(postId) {
  const commentText = document.getElementById('comment-text').value;
  if (!commentText) return;

  fetch(`/api/posts/${postId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ text: commentText })
  })
    .then(response => response.json())
    .then(comment => {
      document.getElementById('comment-text').value = "";
      loadComments(postId); // Reload comments after submitting
    })
    .catch(error => {
      console.error("Error submitting comment:", error);
      alert("Failed to submit comment.");
    });
}
