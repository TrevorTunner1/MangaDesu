


document.querySelectorAll('.dropdown-btn').forEach(button => {
    button.addEventListener('click', () => {
        const dropdownId = button.getAttribute('data-dropdown');
        const dropdown = document.getElementById(dropdownId);

        // Toggle visibility
        dropdown.classList.toggle('activedropDown');
        


        document.querySelectorAll('.dropdown').forEach(otherDropdown => {
            if (otherDropdown !== dropdown && otherDropdown.classList.contains('activedropDown')) {
                otherDropdown.classList.remove('activedropDown');
            }
        });
    });
});





//Naviagtion bar toggle
const navbar = document.querySelector('.navbar');
const navitem = document.querySelector('.navitem');
const navToggle = document.querySelector('#hamburger')
const dropdownGroup = document.querySelector('.dropdown');

navToggle.addEventListener('click',function(){
    navbar.classList.toggle('active');
    header.style.backgroundColor= 'white';
    dropdownGroup.classList.toggle('active');
    document.body.classList.toggle('active'); 
})


const header = document.querySelector("[data-header]");

const activeHeader = function () {
    if (window.scrollY > 150) {
        header.classList.add("active");
        header.style.boxShadow= '0px -4px 7px 2px';
    } else {
        header.classList.remove("active");
        header.style.boxShadow= '0px 0px 0px 0px';
    }
}
window.addEventListener('scroll',activeHeader);

///Api
const container = document.querySelector('.manga-list');
const container2 = document.querySelector('.manga-list2');

const TrendingManga = async () => {
    try {
        const res = await fetch("https://kitsu.io/api/edge/trending/manga");
        const data = await res.json();
        console.log(data);
  
        getManga(data.data); // Call getManga after data is fetched
    } catch (error) {
        console.log(error);
    }
};

const newManga = async () => {
    try {
        const res = await fetch("https://kitsu.io/api/edge/manga?sort=-createdAt");
        const data = await res.json();
        console.log(data);

        NewgetManga(data.data); // Call NewgetManga after data is fetched
    } catch (error) {
        console.log(error);
    }
};

const developerPickManga = async () => {
    try {
        const res = await fetch("https://kitsu.io/api/edge/manga?filter[text]=chainsaw man");
        const data = await res.json();
        console.log(data);

        developerPick(data.data); // Call developerPick after data is fetched
    } catch (error) {
        console.log(error);
    }
}

// Fetch both manga lists
TrendingManga();
newManga();
developerPickManga();

// Function to display Trending Manga
function getManga(Data) {
    Data.forEach((manga) => {
        const mangaCard = createMangaCard(manga);
        container.appendChild(mangaCard);
    });
}

// Function to display New Manga
function NewgetManga(Data) {
    Data.forEach((manga) => {
        const mangaCard = createMangaCard2(manga);      
        container2.appendChild(mangaCard);   
    });
}

const container3 = document.querySelector('.manga-list3');
function developerPick(Data) {
    Data.forEach((manga) => {
        const mangaCard = createMangaCard2(manga);      
        container3.appendChild(mangaCard);   
    });
}

// Function to create a manga card
function createMangaCard(manga) {
    const mangaImg = document.createElement("img");
    mangaImg.classList.add("manga-img");

    // Function to update image based on screen size
    function updateImageSrc() {
        if (window.matchMedia("(max-width: 400px)").matches) {
            mangaImg.src = manga.attributes.posterImage.tiny;
        } else {
            mangaImg.src = manga.attributes.posterImage.small;
        }
    }


    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);
    
    mangaImg.alt = manga.attributes.titles.en || "Unknown Title";

    const mangaTitle = document.createElement("p");
    const mangaTextArea = document.createElement('div');
    mangaTextArea.classList.add('manga-text-area');
    mangaTitle.classList.add("manga-text");

    const title = manga.attributes.titles.en || "Unknown Title";
    mangaTitle.textContent = title;

    const mangaRating = document.createElement('span');
    mangaRating.textContent = manga.attributes.averageRating || '77.7';

    const mangaChapter = document.createElement('div');
    let chapters = `${manga.attributes.chapterCount || 100} Chapters`;
    mangaChapter.textContent = chapters;

    const mangaButton = document.createElement('button');
    mangaButton.textContent = 'Read More';
    mangaButton.classList.add('manga-btn')

    const discription = document.createElement('div');
    discription.classList.add('discription');
    discription.textContent = manga.attributes.synopsis || 'No synopsis available.';
    // Append elements
    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card');
    mangaTextArea.appendChild(mangaTitle);
    mangaTextArea.appendChild(mangaRating);
    mangaTextArea.appendChild(mangaChapter);
    mangaTextArea.appendChild(mangaButton);
    mangaCard.appendChild(discription);
    mangaCard.appendChild(mangaImg);
    mangaCard.appendChild(mangaTextArea);

    return mangaCard;
}


const createMangaCard2 = (manga) => {
    const mangaImg = document.createElement("img");
    mangaImg.classList.add("manga-img");

    // Function to update image based on screen size
    function updateImageSrc() {
        if (window.matchMedia("(max-width: 800px)").matches) {
            mangaImg.src = manga.attributes.posterImage.tiny;
        } else {
            mangaImg.src = manga.attributes.posterImage.small;
        }
    }


    updateImageSrc();
    window.addEventListener("resize", updateImageSrc);

   
    mangaImg.alt = manga.attributes.titles.en || 'Unknown Title';

    const mangaTitle = document.createElement('p');
    mangaTitle.classList.add('manga-text');

    const title = manga.attributes.titles.en || 'Unknown Title';
    mangaTitle.textContent = title;

    const mangaRating = document.createElement('span');
    mangaRating.textContent = manga.attributes.averageRating || '77.7';

    const mangaChapter = document.createElement('div');
    let chapters = `${manga.attributes.chapterCount || 100} Chapters`;
    mangaChapter.textContent = chapters;

    const mangaTextArea = document.createElement('div');
    mangaTextArea.classList.add('manga-text-area');

    const mangaButton = document.createElement('button');
    mangaButton.textContent = 'Read More';
    mangaButton.classList.add('manga-btn')

    const discription = document.createElement('div');
    discription.classList.add('discription');
    discription.textContent = manga.attributes.synopsis || 'No synopsis available.';
    


    const mangaCard = document.createElement('div');
    mangaCard.classList.add('manga-card2');

    mangaCard.appendChild(mangaImg);
    mangaTextArea.appendChild(mangaTitle);
    mangaTextArea.appendChild(mangaRating);
    mangaTextArea.appendChild(mangaChapter);
    mangaTextArea.appendChild(mangaButton);
    mangaCard.appendChild(discription);
    mangaCard.appendChild(mangaTextArea)
    return mangaCard;
}

//////////////////////////////////////////////




document.addEventListener("DOMContentLoaded", function () {
    const genreLinks = document.querySelectorAll(".dropdown-link");

    genreLinks.forEach(link => {
        link.addEventListener("click", function (event) {
            // event.preventDefault();
            const genre = this.getAttribute("data-genre");
            fetchMangaByGenre(genre);
        });
    });
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

