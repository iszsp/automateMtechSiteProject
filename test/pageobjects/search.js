const { $ } = require('@wdio/globals');
const Url = require('./url.js');

class Search extends Url{
    get srcBtn() {
        return $('[class*="active"] .fa-search');
    }
    get srcInput() {
        return $('[class*="active"] [class="hfe-search-form__input"]');
    }
    get goodQuery() {
        return $('//h1[contains(text(),"Search")]');
    }
    badValue = ['',' ','null','undefined'];

    async searchRun() {
        for(let i = 0; i < this.badValue.length; i++){
            await this.openUrl('search');
            (await this.srcBtn).click();
            await this.srcInput.waitForStable();
            (await this.srcInput).click();
            (await this.srcInput).addValue(this.badValue[i]);
            await browser.keys(['Enter']);
            await this.goodQuery.waitForExist({ timeoutMsg: `the search breaks when ${this.badValue[i]} is entered.`});
        }
        
    }
}

module.exports = new Search();