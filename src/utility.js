import readline from 'readline';
import cloudscraper from 'cloudscraper';

export default class Utility {
    constructor() {
        this.io = readline.createInterface({
            input: process.stdin,
            output: process. stdout
        });
    }

    /**
     * Read input from user
     * @param {string} message
     * @param {function} callback
     */
    read(message = ": ") {
        return new Promise((resolve, reject) => {    
            if(typeof message != "string")
               reject(new Error(`read: first argument is expecting a string ${typeof message} given.`)); 

            this.io.question(message, (answer) => {
                resolve(answer);
            });
        });
    }

    /**
     * Close readline instance
     * @return {readline} close()
     */
    closeConsole() {
        return this.io.close();
    }

    /**
     * Scrape video link from string convert HTML.
     * @param {string} source
     * @return {string} matched video URL.
     */
    scrapeMP4(source) {
        if(typeof source != "string")
            throw new Error(`scrapeMP4: expecting a string ${typeof source} given.`);
        
        let match = source.match(/http:\/\/(.*?).mp4/g);
        
        // if there's no video link found using http protocol 
        // try to match source with https instead.
        if(typeof match == "array" && match < 0) {
            match = source.match(/https:\/\/(.*?).mp4/g);
        }

        return match[0];
    }

    /**
     * 
     * @param {string} url
     * @return {Promise}
     */
    * downloadPage(url) {
        return new Promise((resolve, reject) => {
            cloudscraper.get(url, (error, response, body) => {
                if(error) reject(error);

                resolve(body);
            });
        });
    }
}