const RunTheSearchStuff = require("./baseSearch");

module.exports = class RunTheCateringStuff extends RunTheSearchStuff{
    async startCatering() {
        await this.openUrl('catering/');
        if(await this.cookieBar.isExisting()){
            await this.closeCookieBar.waitForClickable();
            await this.closeCookieBar.click();
        }
    }
}