const loadData = async (searchtext) => {
    loadingSpinerhandel(true);
    const url = `https://openapi.programming-hero.com/api/retro-forum/posts?category=${searchtext}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayData(data.posts);
    } catch (error) {
        console.error('Error fetching data:', error);
    } finally {
        loadingSpinerhandel(false);
    }
};

const displayData = (info) => {
    const displayContainer = document.getElementById('container-card');
    displayContainer.innerHTML = '';

    for (const post of info) {
        const newDiv = document.createElement('div');
        newDiv.className = 'bg-purple-100 rounded-lg p-4 mb-6 shadow-md flex flex-col sm:flex-row items-center';

        newDiv.innerHTML = `
            <div class="flex-shrink-0 mb-4 sm:mb-0 sm:mr-4">
                <img src="${post.image}" alt="${post.title}" class="w-16 h-16 sm:w-12 sm:h-12 rounded-full object-cover">
            </div>
            <div class="flex-1">
                <div class="flex items-center mb-2">
                    <div class="${post.isActive ? 'bg-green-500' : 'bg-red-500'} w-4 h-4 rounded-full"></div>
                    <p class="text-gray-800 font-semibold ml-2">#${post.category} <span class="ml-4">Author: ${post.author.name}</span></p>
                </div>
                <h2 class="text-lg sm:text-xl font-bold text-gray-900">${post.title}</h2>
                <p class="text-gray-700 text-sm sm:text-base">${post.description}</p>
                <div class="border-t border-dashed border-gray-300 my-2"></div>
                <div class="flex items-center space-x-4 text-gray-800 text-sm sm:text-base">
                    <span><i class="far fa-comment"></i> ${post.comment_count}</span>
                    <span><i class="far fa-eye"></i> ${post.view_count}</span>
                    <span><i class="far fa-clock"></i> ${post.posted_time} min</span>
                    <div onclick="handelEmialIconeClick(${post.id})" class="ml-auto cursor-pointer">
                        <i class="fas fa-envelope text-green-500"></i>
                    </div>
                </div>
            </div>
        `;
        displayContainer.appendChild(newDiv);
    }
};

const handelSearch = () => {
    loadingSpinerhandel(true);
    const searchField = document.getElementById('search-field');
    const searchtext = searchField.value;
    loadData(searchtext)
    loadingSpinerhandel(false);
};

const loadingSpinerhandel = (isLoading) => {
    const loadingSpiner = document.getElementById('loading-spiner');
    isLoading ? loadingSpiner.classList.remove('hidden') : loadingSpiner.classList.add('hidden');
};

loadData();

const handelEmialIconeClick = async (id) => {
    try {
        const res = await fetch(`https://openapi.programming-hero.com/api/retro-forum/post/${id}`);
        const data = await res.json();
        showTitleaInfo(data.title, data.view_count);
    } catch (error) {
        console.error('Error fetching post data:', error);
    }
};

let titleCounter = 1;

const showTitleaInfo = (info, viewCount) => {
    const titlename = document.getElementById('title');
    titlename.insertAdjacentHTML('beforeend', `
        <div class="p-4 bg-white my-2 rounded-md">
            <div class="flex items-center space-x-2">
                <span>${titleCounter}.</span>
                <h3 class="text-gray-800">${info}</h3>
                <span><i class="far fa-eye text-gray-600"></i></span>
                <h3 class="text-gray-800">${viewCount}</h3>
            </div>
        </div>
    `);
    titleCounter++;
};

const latestPost = async () => {
    const res = await fetch('https://openapi.programming-hero.com/api/retro-forum/latest-posts');
    const datas = await res.json();
    displayLatestPost(datas);
}

const latestPostCard = document.getElementById("Latest-Posts-container");

const displayLatestPost = (datas) => {
    datas.forEach(data => {
        
        const postedDate = data.author?.posted_date ? data.author.posted_date : 'No publish date';
        const designation = data.author?.designation ? data.author.designation : 'Unknown';

        const postCard = document.createElement('div');
        postCard.classList = `bg-purple-100 rounded-lg p-6 shadow-md`;

        postCard.innerHTML = `
            <figure> <img src="${data.cover_image}" alt="" class="w-full h-auto"> </figure>
            <p class="mt-4 text-gray-800"><i class="fa-solid fa-calendar-days"></i> ${postedDate}</p>
            <h3 class="font-bold mb-2 text-gray-900">${data.title}</h3>
            <p class="text-gray-700 mb-4">${data.description}</p>
            <div class="flex items-center gap-4">
                <img src="${data.profile_image}" alt="" class="w-12 h-12 rounded-full object-cover">
                <div>
                    <h4 class="font-bold mb-1 text-gray-900">${data.author?.name || 'Unknown'}</h4>
                    <h4 class="text-gray-500 font-semibold">${designation}</h4>
                </div>
            </div>
        `;

        latestPostCard.appendChild(postCard);
    });
}

latestPost('coding');
