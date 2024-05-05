function search() {
    let word = document.getElementById("searchInput").value.trim().toLowerCase();
    if (!word) { 
        return;
    }

    let results = document.getElementById("results");
    results.innerHTML = "";

    var pages = ['faq.html', 'schools.html', 'guides.html', 'ressources.html','esi.html'];

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
                        var link = document.createElement("a");
                        link.href = 'pages/' + pages[index];
                        link.textContent = 'Found on ' + pages[index];
                        result.appendChild(link);
                        results.appendChild(result);
                        results.appendChild(document.createElement("hr"));
                    }
                });
            });

            if (!flag) {
                results.textContent = "None found";
            }
        })
        .catch(error => console.error('Error fetching pages:', error));
}
