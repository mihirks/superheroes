const TabsHeadAll = document.querySelectorAll('.tab-head-single');
const TabsBodyAll = document.querySelectorAll('.tab-body-single');
const SearchInp = document.querySelectorAll('.inp-search')[0];
const SearchBtn = document.getElementsByClassName('btn-search')[0];

const SearchList = document.querySelector('.search-list');

var currActive=1;
const init = () => {
    ActiveHead();
    ActiveBody();
}

function ActiveHead(){
    removeAllHeads();
    TabsHeadAll[currActive -1].classList.add('active-tab');
};

const removeAllHeads = () => {
    TabsHeadAll.forEach ((i)  => {
        i.classList.remove('active-tab');
    })
};

const ActiveBody =() =>{
    removeAllBody();
    TabsBodyAll[currActive - 1].classList.remove('no-show-tab');
};

const removeAllBody = () => {
    TabsBodyAll.forEach ( (i) => {
        i.classList.add('no-show-tab');
    })
};

window.addEventListener(onload, init());

TabsHeadAll.forEach( (TabsHeadSingle) => {
    TabsHeadSingle.addEventListener("click", ()=>{
        currActive = TabsHeadSingle.getAttribute('data-id');
        init();
    })
})

const InpValue = (event) =>{

    event.preventDefault();
    const hero = SearchInp.value.trim();
    FetchHero(hero);
    SearchList.innerHTML="";
}

SearchBtn.addEventListener('submit',InpValue);

const FetchHero =async(hero) => {

    const heroName = hero;
    // console.log(heroName);
    var url =`https://www.superheroapi.com/api.php/727054372039115/search/${heroName}`;

    try {
        const response = await fetch(url);
        const jsonData = await response.json();
        if (jsonData.response === 'success')
        {
            GetSearchList(jsonData.results);
        }

    } catch (error) {
        console.log(error);
    }

}

SearchInp.addEventListener('keyup',InpValue);

const GetSearchList = (HeroList) => {
    SearchList.innerHTML="";
    // console.log(HeroList);
    HeroList.forEach ( (Single_Hero) => {
        const div1 = document.createElement('div');
        div1.classList.add('search-list-items');
        div1.setAttribute("id",Single_Hero.id);
        div1.innerHTML = `
        <img class="search-img" id=${Single_Hero.id} src="${Single_Hero.image.url}" alt="">
        <div class="search-name" id=${Single_Hero.id} >${Single_Hero.name}</div>
        `
        SearchList.appendChild(div1);
    })
    // console.log(SearchList);

    SearchList.addEventListener('click', (event) => {
        // console.log(event);
        let searchId = event.target.id;
        // console.log(searchId);
        let singleData = HeroList.filter(i => {
            return searchId === i.id;
        })[0]
        // console.log(singleData);
        showSuperheroDetails(singleData);
        SearchList.innerHTML = "";
        SearchInp.value="";
    });
}

const showSuperheroDetails = (singleData) => {
    document.querySelector('.hero-img').innerHTML=`
    <img title='${singleData.name}' src="${singleData.image.url}" alt="">
    `
    const Name = singleData.name.toUpperCase();
    document.querySelector('.hero-name').innerHTML=`
    ${Name}
    `
    document.querySelector('.content-powerstats').innerHTML =`
<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>intelligence</span>
    </div>
    <span>${singleData.powerstats.intelligence}</span>
</li>
<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>strength</span>
    </div>
    <span>${singleData.powerstats.strength}</span>
</li>

<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>speed</span>
    </div>
    <span>${singleData.powerstats.speed}</span>
</li>
<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>durability</span>
    </div>
    <span>${singleData.powerstats.durability}</span>
</li>
<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>power</span>
    </div>
    <span>${singleData.powerstats.power}</span>
</li>
<li>
    <div>
        <i class = "fa-solid fa-shield-halved"></i>
        <span>combat</span>
    </div>
    <span>${singleData.powerstats.combat}</span>
</li>
    `

    document.querySelector('.content-biography').innerHTML =`
<li>
    <span>full name:</span>
    <span>${singleData.biography['full-name']}</span>
</li>
<li>
    <span>alter-egos:</span>
    <span>${singleData.biography['alter-egos']}</span>
</li>
<li>
    <span>aliases:</span>
    <span>${singleData.biography['aliases']}</span>
</li>
<li>
    <span>place-of-birth:</span>
    <span>${singleData.biography['place-of-birth']}</span>
</li>
<li>
    <span>first-apperance:</span>
    <span>${singleData.biography['first-appearance']}</span>
</li>
<li>
    <span>publisher:</span>
    <span>${singleData.biography['publisher']}</span>
</li>
    `

    document.querySelector('.content-appearance').innerHTML=`
<li>
    <span>
        <i class = "fas fa-star"></i><span>gender</span>
    </span>
    <span>${singleData.appearance['gender']}</span>
</li>
<li>
    <span>
        <i class = "fas fa-star"></i><span>race</span>
    </span>
    <span>${singleData.appearance['race']}</span>
</li>
<li>
    <span>
        <i class = "fas fa-star"></i><span>height</span>
    </span>
    <span>${singleData.appearance['height'][0]}</span>
</li>
<li>
    <span>
        <i class = "fas fa-star"></i><span>weight</span>
    </span>
    <span>${singleData.appearance['weight'][0]}</span>
</li>
<li>
    <span>
        <i class = "fas fa-star"></i><span>eye-color</span>
    </span>
    <span>${singleData.appearance['eye-color']}</span>
</li>
<li>
    <span>
        <i class = "fas fa-star"></i><span>hair-color</span>
    </span>
    <span>${singleData.appearance['hair-color']}</span>
</li>
    `

    document.querySelector('.content-connections').innerHTML=`
<li>
    <span>group--affiliation</span>
    <span>${singleData.connections['group-affiliation']}</span>
</li>
<li>
    <span>relatives</span>
    <span>${singleData.connections['relatives']}</span>
</li>

    `
}
