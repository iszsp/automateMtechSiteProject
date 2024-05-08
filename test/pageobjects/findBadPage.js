
// currently unused

const { $ } = require('@wdio/globals');

module.exports = class BadPage {
    get badPage() {
        return $('//*[contains(text(),"Uh oh.")]')
    }
    get page404() {
        return $('//*[contains(text(),"404 Not Found")]')
    }
    async checkForBad() {
        try {
            await this.badPage.waitForExist({ timeout: 250, reverse: true});
            await this.page404.waitForExist({ timeout: 250, reverse: true});
        } catch (error) {
            throw new Error(`bad link detected on column ${y+1}, link ${i+1} due to 404 or bad load time.`);
        }
    }
};