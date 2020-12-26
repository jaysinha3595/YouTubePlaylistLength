import {tdsec, advFrom, advTo, td, nov} from '../base';
import {state} from '../index';

export function formatDur(timestamp){
    const hregexPatt = /\d{1,2}H/;
    const mregexPatt = /\d{1,2}M/;
    const sregexPatt = /\d{1,2}S/;
    const simpleDurrArrS = [];

    for(let i=0; i<timestamp.length; i++){
        let hregex = timestamp[i].match(hregexPatt);
        let mregex = timestamp[i].match(mregexPatt);
        let sregex = timestamp[i].match(sregexPatt);
        let tempS = 0;
     
        if(hregex){
            hregex = hregex.toString();
            let temp1 =  parseInt(hregex.slice(0,-1))*60*60;
            tempS += temp1
        }
        if(mregex){
            mregex = mregex.toString();
            let temp2 = parseInt(mregex.slice(0,-1))*60;
            tempS += temp2
        }
        if(sregex){
            sregex = sregex.toString();
            let temp3 = parseInt(sregex.slice(0,-1));
            tempS += temp3;
        }
        simpleDurrArrS.push(tempS);
    }
    return simpleDurrArrS;
}


export function totalS(arr, lb=0, ub=arr.length){
    let totalSec = 0;
    for(let i=lb; i<ub; i++){
        totalSec += arr[i];
    }
    return totalSec;
}

function timeFormatted(totalS){
    const hrs = parseInt(totalS/(60*60));
    totalS %= 60*60;
    const mins = parseInt(totalS/60);
    const secs = parseInt(totalS%60);

    return `${hrs}H ${mins}M ${secs}S`;
}

export function showFormattedTime(totalS){
    return timeFormatted(totalS);
}

export function durationAtSpeed(speed, totalSecsStored){
    switch(speed){
        case '1.25x':
            tdsec.textContent = timeFormatted(parseInt(totalSecsStored/1.25));
            break;
        case '1.5x':
            tdsec.textContent = timeFormatted(parseInt(totalSecsStored/1.5));
            break;
        case '1.75x':
            tdsec.textContent = timeFormatted(parseInt(totalSecsStored/1.75));
            break;
        case '2x':
            tdsec.textContent = timeFormatted(parseInt(totalSecsStored/2));
            break;
    }
}

// export function advSearch(simpleDurationArray){
//     console.log(timeFormatted(totalS(simpleDurationArray, parseInt(advFrom.value)-1, parseInt(advTo.value))));
// }

export function advSearch(simpleDurationArray){
    if(advFrom.value && advTo.value){
        tdsec.textContent='';
        let lb = parseInt(advFrom.value)-1;
        let ub = parseInt(advTo.value);
        const carray = document.querySelectorAll('.trc');
        for(let i=0; i<carray.length; i++){
            if(carray[i].checked){
                carray[i].checked = false;
                let event = new Event('change');
                carray[i].dispatchEvent(event);
            }
        }
        for(let i=lb; i<ub; i++){
            carray[i].checked = true;
            carray[i].dispatchEvent(new Event('change'));
        }
    }
}

function count(){
    const a = document.querySelectorAll('.trc');
    let c = 0;
    for(let i=0; i<a.length; i++){
        if(a[i].checked == true){
            c++;
        }
    }
    return c;
}


export function checkboxDuration(sda){

    let tempS = 0;
    const carray = document.querySelectorAll('.trc');
    for(let i=0; i<carray.length; i++){
        tempS += sda[i];
    }
    for(let i=0; i<carray.length; i++){
        carray[i].addEventListener('change', function(){
            tdsec.textContent='';
            if(this.checked){
                tempS += sda[this.parentElement.parentElement.children[1].innerHTML - 1];
            }else{
                tempS -= sda[this.parentElement.parentElement.children[1].innerHTML - 1];
            }

            //console.log(showFormattedTime(tempS));
            td.textContent = showFormattedTime(tempS);
            state.totalS = tempS;
            nov.textContent = count();
        })
    }
}

export function xyz(){
    const carray = document.querySelectorAll('.trc');
    for(let i=0; i<carray.length; i++){
        carray[i].checked = true;
        carray[i].dispatchEvent(new Event('click'));
    }
    const sdAll = document.querySelector('.sd-all');
    sdAll.checked=true;
    sdAll.addEventListener('change', ()=>{
        tdsec.textContent='';
        const carray = document.querySelectorAll('.trc');

        let flag = false;
        for(let i=0; i<carray.length; i++){
            if(carray[i].checked){
                flag = true;
                sdAll.checked = false;
                for(let i=0; i<carray.length; i++){
                    if(carray[i].checked){
                        carray[i].checked = false;
                        let event = new Event('change');
                        carray[i].dispatchEvent(event);
                    }
                }
            }
        }
        if(flag == false){
            for(let i=0; i<carray.length; i++){
                carray[i].checked = true;
                let event = new Event('change');
                carray[i].dispatchEvent(event);
            }
        }
    })
}


