const accessKey = "YOUR_UNSPLASH_ACCESS_KEY";

// SELECTORS

const searchForm = document.querySelector(".searchform");
const searchInput = document.querySelector(".search-input");
const imgCon = document.querySelector(".img-con");
const loadMoreBtn = document.querySelector(".loadmore");
const themeBtn = document.querySelector(".theme-btn");

// VARIABLES

let page = 1;
let currentQuery = "";

// FETCH IMAGES

const fetchImages = async (query, page) => {

  try {

    if(page === 1){

      imgCon.innerHTML = `
        <div class="loading">
          Loading Images...
        </div>
      `;

    }

    const url =
    `https://api.unsplash.com/search/photos?page=${page}&query=${query}&per_page=12&client_id=${accessKey}`;

    const response = await fetch(url);

    const data = await response.json();

    if(data.results.length > 0){

      if(page === 1){
        imgCon.innerHTML = "";
      }

      data.results.forEach((photo)=>{

        const card = document.createElement("div");

        card.classList.add("card");

        card.innerHTML = `

          <img
            src="${photo.urls.regular}"
            alt="${photo.alt_description}"
          >

          <div class="card-content">

            <h3>
              ${photo.user.name}
            </h3>

            <p>
              ${photo.alt_description || "Beautiful Image"}
            </p>

          </div>

        `;

        imgCon.appendChild(card);

      });

      if(page >= data.total_pages){

        loadMoreBtn.style.display = "none";

      }
      else{

        loadMoreBtn.style.display = "block";

      }

    }
    else{

      imgCon.innerHTML = `
        <div class="loading">
          No Images Found
        </div>
      `;

      loadMoreBtn.style.display = "none";

    }

  }
  catch(error){

    imgCon.innerHTML = `
      <div class="loading">
        Failed To Fetch Images
      </div>
    `;

    console.log(error);

  }

};

// SEARCH

searchForm.addEventListener("submit",(e)=>{

  e.preventDefault();

  const inputText = searchInput.value.trim();

  if(inputText !== ""){

    page = 1;

    currentQuery = inputText;

    fetchImages(currentQuery,page);

  }
  else{

    imgCon.innerHTML = `
      <div class="loading">
        Please Enter Search Query
      </div>
    `;

    loadMoreBtn.style.display = "none";

  }

});

// LOAD MORE

loadMoreBtn.addEventListener("click",()=>{

  page++;

  fetchImages(currentQuery,page);

});

// THEME TOGGLE

themeBtn.addEventListener("click",()=>{

  document.body.classList.toggle("light-theme");

  if(document.body.classList.contains("light-theme")){

    themeBtn.innerHTML = "☀️";

  }
  else{

    themeBtn.innerHTML = "🌙";

  }

});
