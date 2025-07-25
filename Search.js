const acceskey = `63UANLvEpreDU-ipUoH7f4gw6i-67I4EdEtvhNWcCQE`;

const searchForm = document.querySelector('.searchform');
const inputCon = document.querySelector('.search-input');
const imgCon = document.querySelector('.img-con');
const loadMore = document.querySelector('.loadmore');

let page = 1;
 const fetchImages = async (query,page) => {
    try{
        if(page === 1){
        imgCon.innerHTML = `<h3>Loading...</h3>`;
    }

    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=26&client_id=${acceskey}`;

    const response  = await fetch(url);
    const data = await response.json();
    
    if(data.results.length> 0){
        if (page === 1) imgCon.innerHTML = '';
        data.results.forEach(photo => {
        
        const imageElement = document.createElement('div');
        imageElement.classList.add('imagediv');
        imageElement.innerHTML = `<img src = "${photo.urls.regular}"/>`

        // overlay Div 
        const overlayElement = document.createElement('div');
        overlayElement.classList.add('overlay');

        // overlay text 
        const overlayText = document.createElement('h3');
        overlayText.innerText = `${photo.alt_description}`

        overlayElement.appendChild(overlayText);
        imageElement.appendChild(overlayElement);
        imgCon.appendChild(imageElement);
    });

    if(data.total_pages === page){
        loadMore.style.display = "none";
    }
    else{
        loadMore.style.display = "block";
    }

    }else{
        imgCon.innerHTML = `<h2> No image found !! </h2>`
    }
}
catch(error){
        imgCon.innerHTML = `<h2> Failed to fetch Images !! </h2>`
    }
};
searchForm.addEventListener('submit',(e) => {
    e.preventDefault();
    const inputText = inputCon.value.trim();
    if (inputText !== '') {
        page = 1;
        fetchImages(inputText,page);   
    }else{
        imgCon.innerHTML = `<h2> Please enter a seacrh query !! </h2>`
        if (loadMore.style.display === "block") {
            loadMore.style.display = "none";
        }
    }
});

loadMore.addEventListener('click', ()=> {
    fetchImages(inputCon.value.trim(),++page);
});
