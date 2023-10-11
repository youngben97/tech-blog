const newCommentHandler = async (event) => {
    event.preventDefault();

    const comment = document.querySelector('#add-comment').value.trim();
    const blogpostIdInput = document.getElementById('blogpost_id');

    const blogpostId = blogpostIdInput.value;

    if (comment) {
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({
                comment: comment,
                blogpost_id: blogpostId
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to create comment');
        }
    }
}

document
.querySelector('.new-comment-form')
.addEventListener('submit', newCommentHandler);