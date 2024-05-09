const FindBadPage = require('./findBadPage.js');

module.exports = class RunTheSearchStuff extends FindBadPage{
    async query(whatToSearch) {
        await this.openUrl('search');
        await this.srcBtn.click();
        await this.srcInput.waitForStable();
        await this.srcInput.click();
        await this.srcInput.addValue(whatToSearch);
    }
}