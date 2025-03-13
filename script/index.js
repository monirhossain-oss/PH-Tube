removeActioveClass = () => {
    const activeButtons = document.getElementsByClassName('Active')
    for (let btn of activeButtons) {
        btn.classList.remove('Active')
    }
}
loadCategories = () => {
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert Promise to json 
        .then(response => response.json())
        // send data to display 
        .then((data) => displayCaregories(data.categories))
}
loadVedio = (searchText="") => {
    fetch(`https://openapi.programming-hero.com/api/phero-tube/videos?title= ${searchText}`)
        .then(response => response.json())
        .then((data) => {
            removeActioveClass()
            document.getElementById('btn-all').classList.add('active');
            displayVedio(data.videos)
        })
}
loadVideoDetails = (videoId) => {
    // console.log(videoId)
    const url = `https://openapi.programming-hero.com/api/phero-tube/video/${videoId}`
    fetch(url)
        .then(res => res.json())
        .then(data => displayVideoDescription(data.video))
}
loadCategoriesVideo = (id) => {
    const url = `https://openapi.programming-hero.com/api/phero-tube/category/${id}`
    // console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(data => {
            removeActioveClass()
            const clickedButton = document.getElementById(`btn-${id}`)
            clickedButton.classList.add('Active')
            // console.log(clickedButton)
            displayVedio(data.category)
        })
}


// category: "Music"
// category_id:"1001"
displayVideoDescription = (videoDis) => {
    console.log(videoDis);
    document.getElementById('video_details').showModal();
    const detailsContainer = document.getElementById('details-container');
    detailsContainer.innerHTML = `
    <div class="card bg-base-100 image-full shadow-sm">
        
        <figure>
            <img src="${videoDis.thumbnail}" alt="" />
        </figure>
        <div class="card-body">
            <h2 class="card-title"> ${videoDis.title}</h2>
            <p>${videoDis.description}</p>
        </div>
    </div>
    `
}

displayCaregories = (categories) => {
    // get the conteiner
    const categoriesContainer = document.getElementById('categories-container')
    // loop operation on Array of Object 
    for (let cat of categories) {
        // console.log(cat)
        // create Element 
        const categorieDiv = document.createElement('div');
        categorieDiv.innerHTML = `
        <button id="btn-${cat.category_id}" onclick="loadCategoriesVideo(${cat.category_id})" class="bg-slate-300 px-4 py-1 rounded-md text-stone-600 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // append the Element 
        categoriesContainer.appendChild(categorieDiv);
    }
}

displayVedio = (videos) => {
    // console.log(videos)
    const videosContainer = document.getElementById('video-container')
    videosContainer.innerHTML = "";
    if (videos.length == 0) {
        videosContainer.innerHTML = `
        <div class="col-span-full flex gap-4 flex-col justify-center items-center text-center py-20">
                <img class="w-[140px]" src="image/Icon.png" alt="">
                <h2 class="text-xl font-bold">Oops!! Sorry, There is no <br> content here</h2>
        </div>
        `
        return;
    }
    videos.forEach((video) => {
        const videoCard = document.createElement('div');
        videoCard.innerHTML = `
    <div class="card bg-base-100 p-2 w-full">
                <figure class="relative">
                    <img class="w-full h-[150px]" src="${video.thumbnail}" alt="Thumbnail" />
                    <span class="absolute bg-black rounded-sm px-2 py-1 bottom-2 right-2 text-white">3hrs 56 min
                        ago</span>
                </figure>
                <div class="flex gap-4 p-2">
                    <div class="avatar">
                        <div class="w-12 h-12 rounded-full">
                            <img src="${video.authors[0].profile_picture}"
                                alt="User Avatar" />
                        </div>
                    </div>
                    <div>
                        <div>
                            <h2 class="text-xl font-bold">${video.title}</h2>
                            <p class="text-lg text-gray-600 flex gap-2">${video.authors[0].profile_name}
                              ${video.authors[0].verified === true ? ` <img
                                    src="https://img.icons8.com/color/28/000000/verified-badge.png" alt="Verified">` : ""}
                           </p>
                        </div>
                        <p class="text-sm text-gray-600">${video.others.views}</p>
                    </div>
                </div>
                <button onclick="loadVideoDetails('${video.video_id}')" class="btn btn-block"> Video Details </button>
            </div>
          
    `
        videosContainer.appendChild(videoCard)
    });

}
document.getElementById('input-search').addEventListener('keyup', (e) => {
    const input= e.target.value;
    loadVedio(input)
})

loadCategories()
