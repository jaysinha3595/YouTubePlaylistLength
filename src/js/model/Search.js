import {loader} from '../base';

const axios = require('axios');

function extractQuery(query){
    // Extract query using regEx
    return query;
}

export default class Search{
    constructor(query){
        this.query = extractQuery(query);
        this.vidCount = 0;
        this.missingFiles = 0;
        this.missingFlag = false;
        this.ids = [];
        this.idArr = [];
        this.durationArr = [];
        this.titles = [];
    }

    formatVidIDs(ids){
        for(let i=0; i<ids.length; i++){
            for(let y=0; y<ids[i].vidCount.length; y++){
                this.idArr.push(ids[i].vidCount[y].contentDetails.videoId);
            }
        }
    }

    // get video details
    async vidDetails(ids){
        const videoURL = 'https://www.googleapis.com/youtube/v3/videos';
        const key = 'AIzaSyBrw5x3Jhi2wJ6Fc34fSkm7ToTCZ69MwAQ';
        try{
            for(let i=0; i<this.idArr.length; i+=50){
                const vidData = await axios.get(videoURL, {
                    params: {
                        part: 'snippet,contentDetails',
                        key: key,
                        id: this.idArr.slice(i, i+50).join()
                    }
                });
                //console.log(vidData); ////////////////////////dev
                for(let j=0; j<vidData.data.items.length; j++){
                    //console.log(j+i+1, vidData.data.items[j].snippet.title); /////////////////dev
                    this.durationArr.push(vidData.data.items[j].contentDetails.duration);
                    this.titles.push(vidData.data.items[j].snippet.localized.title);
                }
            }
        }catch(error){
            alert('Something went wrong!!! Try Reloading...');
            //alert(error);
        }
    }

    // get video IDs 
    async playVidId(pageToken){
        const playlistURL = 'https://www.googleapis.com/youtube/v3/playlistItems';
        const key = 'AIzaSyBrw5x3Jhi2wJ6Fc34fSkm7ToTCZ69MwAQ';
        try{
            if(!pageToken){
                pageToken = '';
            }
            const plData = await axios.get(playlistURL, {
                params: {
                    part: 'snippet,contentDetails',
                    key: key,
                    playlistId: this.query,
                    maxResults: 50,
                    pageToken: pageToken
                }
            });
            //console.log(plData.data);
            this.totalVids = plData.data.pageInfo.totalResults;

            const idobj = {
                vidCount: plData.data.items
            }
            this.ids.push(idobj);


            // Next loop controller
            if(plData.data.items.length<50){
                if(plData.data.items.length == plData.data.pageInfo.totalResults%50){
                    if(!this.missingFlag){
                        this.missingFlag = true;
                    }else{
                        this.missingFiles += 50 - plData.data.items.length;
                    }
                }else{
                    this.missingFiles += 50 - plData.data.items.length;
                }
            }

            this.vidCount += plData.data.items.length;
            if(this.vidCount < plData.data.pageInfo.totalResults-this.missingFiles){
                await this.playVidId(plData.data.nextPageToken);
            }
        }catch(error){
            //console.log(error);
            alert('Something went wrong!!! Check Entered Link');
            loader.style.display='none';
        }
    }


}