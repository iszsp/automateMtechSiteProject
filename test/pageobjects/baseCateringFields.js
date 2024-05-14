const RunTheSearchStuff = require("./baseSearch");

module.exports = class RunTheCateringStuff extends RunTheSearchStuff{
    get cookieBar() {
        return $('.wt-cli-ccpa-element');
    }
    get closeCookieBar() {
        return $('[data-cli_action="accept"]');
    }
    async startCatering() {
        await this.openUrl('catering/');
        await browser.setWindowSize(1200, 800);
        if(await this.cookieBar.isDisplayed()){
            await this.closeCookieBar.waitForClickable();
            await this.closeCookieBar.click();
        }
    }
}