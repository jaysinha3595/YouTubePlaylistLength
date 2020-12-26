import {nov, searchInput, playlist} from '../base';

export function renderVid(tit, dur){
    for(let i=0; i<tit.length; i++){
        let template = `
             <tr>
                <td class="tc"><input type="checkbox" class="trc"></td>
                <td class="tsn">${i+1}</td>
                <td class="tt">${tit[i]}</td>
                <td class="tdu">${dur[i].slice(2).replace('H', 'H ').replace('M','M ').replace('S','S ')}</td>
              </tr>
        `
        // <td>${dur[i].slice(2).replace('H', ':').replace('M',':').replace('S','')}</td>
        playlist.insertAdjacentHTML('beforeend', template);
    }
}
