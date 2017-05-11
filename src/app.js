import Utility from './utility';
import {Anime} from 'anime-scraper';

export default class Application {

    constructor(){
        this.anime = {
            /**
             * searchKey            - keyword provided by user
             * searchResult         - results using the keyword provided by user
             * selectedAnimeIndex   - index defined by user for searchResult
             * anime                - object containing anime details
             * episodes             - object containing episode details
             * episodeSelection     - episode user wants to download
             */
        };
        this.utility = new Utility();
    }
    
    /**
     * Start the application
     * 
     */
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
        this.displayList(this.anime.searchResult);
        this.anime.selectedAnimeIndex = yield this.utility.read("Insert anime index> ");

        // stage 4: get episodes
        console.log(`[ANIME] Getting Episodes...\n`);
        this.anime.anime = yield Anime.fromUrl(this.anime.searchResult[this.anime.selectedAnimeIndex].url);
        this.anime.episodes = yield this.anime.anime['episodes'];

        // stage 5: display episodes
        console.log(`[ANIME] Displaying Episodes...\n`);
        this.displayList(yield this.anime.episodes);
        this.anime.episodeSelection = yield this.utility.read("Select episode: ");
 
        console.log(`[DOWN] Fetching Download Page, Matte kudasai...\n`);
        let page = yield this.utility.downloadPage(this.anime.episodes[this.anime.episodeSelection].url);

        console.log(`[DOWN] Scraping links...`);
        console.log(page);
        let downloadURI = this.utility.scrapeMP4(page);
        console.log(downloadURI);

    }

    /**
     * Display list in ordered manner
     * @param {object} list object containing anime information
     */
    displayList(list) {
        for(let index in list) {
            console.log(`[${index}]:${list[index].name}`);
        }
    }

    /**
     * Close readline object
     */
    closeConsole() {
        this.utility.closeConsole();
    }
}