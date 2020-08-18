let limit = 5;
let page = 1;

const lists = document.querySelector('.lists');
const loader = document.querySelector('.loader');
const searchBar = document.querySelector('.search');

(showPosts = () => {
    // 로더 감추기
    loader.classList.remove("show");

    // axios를 이용하여 데이터 가져오기
    axios.get(`https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
        .then(function (response) {
            // 가져온 데이터를 html요소에 추가하기
            const items = response.data;
            items.forEach((item) => {
                const li = document.createElement('li');
                li.classList.add("list")
                li.innerHTML = `<h2 class="item-title">${item.title}</h2>
                                <p class="item-body">${item.body}</p>
                                <div class="list-tag">${item.id}</div>`
                lists.appendChild(li);
            })
        })
        .catch(function (error) {
            console.log(error);
        })
    page++;
})();

// 아래하단 로딩함수 처리
showLoading = () => {
    loader.classList.add("show");
    setTimeout(showPosts, 2000);
}


// 검색창 필터 처리
searchBar.addEventListener("input", (e) => {
    const keyword = e.target.value;
    const contentLists = document.querySelectorAll('.list');

    contentLists.forEach((contentList) => {
        const title = contentList.querySelector('.item-title').innerHTML;
        const content = contentList.querySelector('.item-body').innerHTML;
        (title.indexOf(keyword) > -1 || content.indexOf(keyword) > -1) ? contentList.classList.remove('hidden'): contentList.classList.add('hidden');
    })
})


// 스크롤바 위치에 따른 이벤트 처리
window.addEventListener('scroll', () => {
    const {
        scrollTop,
        scrollHeight,
        clientHeight
    } = document.documentElement;

    if (scrollTop + clientHeight >= scrollHeight - 1) {
        showLoading();
    } else {
        loader.classList.remove("show");
    }
});