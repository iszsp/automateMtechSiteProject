const RunTheSearchStuff = require("./baseSearch");

module.exports = class RunTheCateringStuff extends RunTheSearchStuff{
    async startCatering() {
        await browser.setWindowSize(1200, 800);
        await this.openUrl('catering/');
        if(await this.cookieBar.isExisting()){
            await this.closeCookieBar.waitForClickable();
            await this.closeCookieBar.click();
        }
    }
}