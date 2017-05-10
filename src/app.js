import Utility from './utility';
import {Anime} from 'anime-scraper';

export default class Application {

    constructor(){
        this.anime = {};
        this.utility = new Utility();
    }

    * run() {
        // stage 1: allow user to input the anime they want to watch
        this.anime.searchKey = yield this.utility.read("Search an anime you wanna watch> ");
        
        // stage 2: search for that anime
        console.log(`[SEARCH] Searching for ${this.anime.searchKey}...`);
        this.anime.searchResult = yield Anime.search(this.anime.searchKey);
        
        // stage 3: display anime results, and save the index 
        // of the chosen anime
        console.log(`[SEARCH] Search complete... displaying results...\n`);
        console.log(`---------------------------------------------------`);
        this.displayAnime(this.anime.searchResult);
        this.anime.selectedAnimeIndex = yield this.utility.read("Insert anime index> ");

        // stage 4: get episodes
        console.log(`[ANIME] Getting Episodes...\n`);
        this.anime.episodes = yield Anime.fromUrl(this.anime.searchResult[this.anime.selectedAnimeIndex].url);
        
        // stage 5: display episodes
        console.log(`[ANIME] Displaying Episodes...\n`);
        this.displayAnimeEpisodes(yield this.anime.episodes['episodes']);
    }

    displayAnime(searchResult) {
        for(let index in searchResult) {
            console.log(`[${index}]:${searchResult[index].name}`);
        }
    }

    displayAnimeEpisodes(episodes) {
        for(let index in episodes) {
            console.log(`[${index}]:${episodes[index].name}`);
        }
    }

    closeConsole() {
        this.utility.closeConsole();
    }
}