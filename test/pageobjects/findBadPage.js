
// currently unused

const Url = require('./url');

module.exports = class FindBadPage extends Url {
    async checkForBad(errorMessage) {
        const module = await import('node-fetch');
        const fetch = module.default;
        let url = await browser.getUrl();
        let code = await fetch(url);
        let status = code.status;
        if(status == 404){
            throw new Error(errorMessage);
        }
    }
};
