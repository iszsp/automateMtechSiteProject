const { browser } = require('@wdio/globals');

module.exports = class Url {

   async openUrl(endPoint) {
       return browser.url(`https://mtec.edu/${endPoint}`);
   }

};