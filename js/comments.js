document.addEventListener('DOMContentLoaded', function() {
    const registrationForm = document.getElementById('registerForm');
    const registrationFormContainer = document.getElementById('registrationForm');

    // Check if user is already registered
    function checkRegistration() {
        const registeredUser = localStorage.getItem('registeredUser');
        if (registeredUser) {
            registrationFormContainer.style.display = 'none';
            loadComments();
        }
    }

    // Handle registration
    registrationForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        if (name && email) {
            localStorage.setItem('registeredUser', JSON.stringify({ name, email }));
            registrationFormContainer.style.display = 'none';
            loadComments();
        }
    });

    // Comment handling
    function loadComments() {
        const commentsSection = document.querySelector('.comments-section');
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        commentsSection.innerHTML = '';
        comments.forEach(comment => {
            const commentDiv = document.createElement('div');
            commentDiv.className = 'comment';
            commentDiv.innerHTML = `
                <p><strong>${comment.name}</strong>: ${comment.text}</p>
                <button class="reply-button" data-id="${comment.id}">Reply</button>
                <div class="replies"></div>
            `;
            commentsSection.appendChild(commentDiv);
        });
        addReplyHandlers();
    }

    function addReplyHandlers() {
        const replyButtons = document.querySelectorAll('.reply-button');
        replyButtons.forEach(button => {
            button.addEventListener('click', function() {
                const commentId = this.getAttribute('data-id');
                const repliesDiv = this.nextElementSibling;
                const replyForm = document.createElement('form');
                replyForm.innerHTML = `
                    <textarea placeholder="Write your reply here..."></textarea>
                    <button type="submit">Reply</button>
                `;
                replyForm.addEventListener('submit', function(e) {
                    e.preventDefault();
                    const replyText = this.querySelector('textarea').value;
                    if (replyText) {
                        addReply(commentId, replyText);
                        repliesDiv.innerHTML = '';
                    }
                });
                repliesDiv.appendChild(replyForm);
            });
        });
    }

    function addReply(commentId, replyText) {
        const comments = JSON.parse(localStorage.getItem('comments')) || [];
        const comment = comments.find(c => c.id === commentId);
        if (comment) {
            comment.replies = comment.replies || [];
            comment.replies.push(replyText);
            localStorage.setItem('comments', JSON.stringify(comments));
            loadComments();
        }
    }

    checkRegistration();
});