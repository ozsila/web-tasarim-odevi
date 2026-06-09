const API_KEY = "kxvZyuWx1e0-RNSoKuYipCGQ5n2WyOy32u-LWFGAbis";

let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

async function searchTattoos(){

    const search = document.getElementById("searchInput").value;
    const category = document.getElementById("category").value;

    const query = search || category;

    const gallery = document.getElementById("gallery");
    gallery.innerHTML = "Yükleniyor...";

    try{

        const res = await fetch(
            `https://api.unsplash.com/search/photos?query=${query}&per_page=12&client_id=${API_KEY}`
        );

        const data = await res.json();

        gallery.innerHTML = "";

        data.results.forEach(img => {

            const div = document.createElement("div");
            div.classList.add("card");

            div.innerHTML = `
                <img src="${img.urls.regular}">
                <button onclick="addFavorite('${img.urls.regular}')">
                    ⭐ Favori
                </button>
            `;

            gallery.appendChild(div);
        });

    }catch(err){
        gallery.innerHTML = "Hata oluştu";
        console.log(err);
    }
}

function addFavorite(url){

    if(!favorites.includes(url)){
        favorites.push(url);
        localStorage.setItem("favorites", JSON.stringify(favorites));
        loadFavorites();
    }
}

function removeFavorite(url){

    favorites = favorites.filter(x => x !== url);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    loadFavorites();
}

function loadFavorites(){

    const favDiv = document.getElementById("favorites");
    favDiv.innerHTML = "";

    favorites.forEach(url => {

        const div = document.createElement("div");
        div.classList.add("card");

        div.innerHTML = `
            <img src="${url}">
            <button onclick="removeFavorite('${url}')">
                ❌ Sil
            </button>
        `;

        favDiv.appendChild(div);
    });
}

loadFavorites();
searchTattoos();