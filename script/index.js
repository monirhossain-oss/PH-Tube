loadCategories = () => {
    // fetch the data 
    fetch('https://openapi.programming-hero.com/api/phero-tube/categories')
        // convert Promise to json 
        .then(response => response.json())
        // send data to display 
        .then((data) => displayCaregories(data.categories))
}
loadVedio = () => {
    fetch('https://openapi.programming-hero.com/api/phero-tube/videos')
        .then(response => response.json())
        .then((data) => displayVedio(data.videos))
}


// category: "Music"
// category_id:"1001"

displayCaregories = (categories) => {
    // get the conteiner
    const categoriesContainer = document.getElementById('categories-container')
    // loop operation on Array of Object 
    for (let cat of categories) {
        // console.log(cat)
        // create Element 
        const categorieDiv = document.createElement('div');
        categorieDiv.innerHTML = `
        <button class="bg-slate-300 px-4 py-1 rounded-md text-stone-600 hover:bg-[#FF1F3D] hover:text-white">${cat.category}</button>
        `
        // append the Element 
        categoriesContainer.appendChild(categorieDiv);
    }

}




displayVedio = (videos) => {
    // console.log(videos)
    const videosContainer = document.getElementById('video-container')
   videos.forEach((video) => {
    const videoCard = document.createElement('div');
    videoCard.innerHTML=`
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
                            <h2 class="text-sm font-bold">${video.title}</h2>
                            <p class="text-sm text-gray-600 flex gap-2">${video.authors[0].profile_name}<img
                                    src="https://img.icons8.com/color/20/000000/verified-badge.png" alt="Verified"></p>
                        </div>
                        <p class="text-sm text-gray-600">${video.others.views}</p>
                    </div>
                </div>
            </div>

    `
    videosContainer.appendChild(videoCard)
   });
  
}
loadVedio()
loadCategories()