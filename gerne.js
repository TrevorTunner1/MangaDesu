document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const genre = urlParams.get('genre');

    if (genre) {
        fetchMangaByGenre(genre);
    } else {
        document.getElementById("Mymanga-list").innerHTML = "<p>No genre specified.</p>";
    }
});

function fetchMangaByGenre(genre) {
    const apiUrl = `https://kitsu.io/api/edge/manga?filter[categories]=${genre}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            displayMangaList(data.data);
        })
        .catch(error => console.error("Error fetching manga:", error));
}

function displayMangaList(mangaList) {
    const mangaContainer = document.getElementById("Mymanga-list");
    mangaContainer.innerHTML = "";

    if (mangaList.length === 0) {
        mangaContainer.innerHTML = "<p>No manga found for this genre.</p>";
        return;
    }

    mangaList.forEach(manga => {
        const mangaElement = document.createElement("div");
        mangaElement.classList.add("manga-item");
        mangaElement.innerHTML = `
            <img src="${manga.attributes.posterImage.small}" alt="${manga.attributes.titles.en || manga.attributes.titles.ja_jp}">
            <h3>${manga.attributes.titles.en || manga.attributes.titles.ja_jp}</h3>
            <p>${manga.attributes.synopsis ? manga.attributes.synopsis.substring(0, 100) + "..." : "No synopsis available."}</p>
        `;
        mangaContainer.appendChild(mangaElement);
    });
}