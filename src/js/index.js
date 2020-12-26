import Search from './model/Search';
import {searchButton, searchInput, nov, td, playlist, speedCtrl, homeSearch, advBtn, main, footer, searchFormHome, loader} from './base';
import {renderVid} from './view/searchView';
import {showFormattedTime, durationAtSpeed, totalS, formatDur, advSearch, checkboxDuration, xyz} from './view/durationView';

export const state = {};

// const s = new Search('PLBlnK6fEyqRgp46KUv4ZY69yXmpwKOIev');
// s.playVidId(null);

// console.log(searchInputValue);
async function searchController(query=searchInput.value){
    //const query = searchInput.value;
    if(query){
        main.style.display='none';
        footer.style.display='none'
        loader.style.display='flex';
        playlist.innerHTML = `
        <tr class="t-head">
                <th>
                  <input type="checkbox" class="sd-all">
                </th>
                <th>SI</th>
                <th>Title</th>
                <th>Length</th> 
        </tr>
        `
        const s = new Search(query);
        await s.playVidId(null);
        s.formatVidIDs(s.ids);
        await s.vidDetails(s.idArr);
        renderVid(s.titles, s.durationArr);
        loader.style.display='none';
        main.style.display='flex';
        footer.style.display='flex'
        nov.textContent = s.totalVids;
        
        state.simpleDurationArray = formatDur(s.durationArr);
        state.totalS =  totalS(state.simpleDurationArray);
        td.textContent = showFormattedTime(state.totalS);
        checkboxDuration(state.simpleDurationArray);
        xyz();

    }
}

searchButton.addEventListener('click', (e)=> {
    e.preventDefault();
    searchController();
})

for(let i=1; i<speedCtrl.children.length; i++){
    speedCtrl.children[i].addEventListener('click', e=>{
    durationAtSpeed(e.currentTarget.innerHTML, state.totalS);
    })
}

advBtn.addEventListener('click', ()=> {
    advSearch(state.simpleDurationArray);
});


function homepageSearch(e){
    e.preventDefault();
    //window.location.href='../dst/results.html'
    const query = document.querySelector('.search-input-home').value;
    if(query){
        searchController(query);
        document.querySelector('.container').style.display='block';
        document.querySelector('#particles-js').style.display='none';
    }
}
searchFormHome.addEventListener('submit', (e)=>{
    homepageSearch(e);
})


homeSearch.addEventListener('click', (e)=>{
    homepageSearch(e);
})

// document.querySelector('.search-btn-home').addEventListener('click', (e)=>{
//     e.preventDefault();
//     searchController();
// })
