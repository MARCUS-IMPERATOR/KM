document.addEventListener('DOMContentLoaded', () => {
  const logupBtn = document.getElementById('logup_btn');
  const logoutBtn = document.getElementById('logout_btn');
  const loginBtn = document.getElementById('login_btn');
  const usernameDisplay = document.getElementById('username');
  const commentSection = document.getElementById('comment-input');
  const postCommentBtn = document.getElementById('post-comment-btn');
  const commentsSection = document.getElementById('comments');

  // Hide logout button initially
  logoutBtn.style.display = 'none';
  usernameDisplay.style.display = 'none';

  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
      // User is logged in
      loginBtn.style.display = 'none';
      logupBtn.style.display = 'none';
      usernameDisplay.textContent = `Welcome, ${user.firstName}`;
      usernameDisplay.style.display = 'inline';
      logoutBtn.style.display = 'inline';
      commentSection.disabled = false;
      postCommentBtn.disabled = false;
  } else {
      commentSection.disabled = true;
      postCommentBtn.disabled = true;
  }

  logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('user');
      location.reload();
  });

  postCommentBtn.addEventListener('click', async () => {
      const commentText = commentSection.value.trim();
      if (!commentText) {
          return;
      }

      const newComment = {
          user: user.firstName,
          comment: commentText,
          timestamp: new Date().toISOString()
      };

      try {
          const response = await fetch('http://localhost:4202/comments', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(newComment)
          });

          if (!response.ok) {
              throw new Error('Failed to post comment');
          }

          // Append the new comment to the comments section
          addCommentToDOM(newComment);

          commentSection.value = ''; // Clear the comment input
      } catch (error) {
          console.error('Error posting comment:', error);
      }
  });

  async function loadComments() {
      try {
          const response = await fetch('http://localhost:4202/comments');
          if (!response.ok) {
              throw new Error('Failed to fetch comments');
          }
          const comments = await response.json();
          comments.forEach(addCommentToDOM);
      } catch (error) {
          console.error('Error loading comments:', error);
      }
  }

  function addCommentToDOM(comment) {
      const commentElement = document.createElement('div');
      commentElement.classList.add('comment');
      const date = new Date(comment.timestamp).toLocaleString();
      commentElement.innerHTML = `
          <p><strong>${comment.user}</strong> at ${date}:</p>
          <p>${comment.comment}</p>
      `;
      commentsSection.appendChild(commentElement);
  }

  loadComments(); // Load existing comments when the page loads
});





function search() {
    let word = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!word) { 
        return;
    }

    let results = document.getElementById("results");
    results.innerHTML = "";

    var pages = ['faq.html', 'schools.html', 'guides.html', 'ressources.html','esi.html','insea.html','/ensmr/ensmr.html'];

    Promise.all(pages.map(page => fetch('pages/' + page).then(response => response.text())))
        .then(contents => {
            var flag = false;

            contents.forEach((data, index) => {
                var doc = new DOMParser().parseFromString(data, 'text/html');
                var matches = doc.body.querySelectorAll('h1, h2, h3, h4, h5, h6, p, span');
                matches.forEach(match => {
                    if (match.textContent.toLowerCase().includes(word)) {
                        flag = true;
                        var result = document.createElement("div");
                        result.className = "result_card";
                        document.getElementById("results").appendChild(result);
                        var link = document.createElement("a");
                        link.href = 'pages/' + pages[index];
                        link.textContent = 'Found on ' + pages[index];
                        result.appendChild(link);
                        results.appendChild(result);
                        //results.appendChild(document.createElement("hr"));
                    }
                });
            });

            if (!flag) {
                results.textContent = "None found";
            }
        })
        .catch(error => console.error('Error fetching pages:', error));
}
function toggleTable() {
    var floatingStack = document.getElementById("floating-stack");
    floatingStack.classList.toggle("active");
    var bttn = document.getElementById("toggleTableBtn");
    if (floatingStack.classList.contains("active")) {
        bttn.textContent = "Hide";
    } else {
        bttn.textContent = "Show";
    }
}
window.onscroll = function() {scrolling()};

function scrolling() {
  var scrllbttn = document.getElementById("top");
  if (document.documentElement.scrollTop > 20) {
    scrllbttn.style.display = "block";
  } 
  else {
    scrllbttn.style.display = "none";
  }
}

function scrollToTop() {
  document.documentElement.style.scrollBehavior = 'smooth';
  document.documentElement.scrollTop = 0;
  setTimeout(function() {
    document.documentElement.style.scrollBehavior = 'auto';
  }, 800);
}