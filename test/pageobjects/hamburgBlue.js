
const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const Url = require('./url.js');

class ProofOfConcept extends Url {
    drop(i) {
        return $(`[class*="active"] .jet-mega-menu-list > :nth-child(${i})`);
    }
    options(i) {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(${i}) .elementor-widget.elementor-cta--valign-middle`);
    }
    async proofRun() {
        await this.openUrl('');
        let length = await this.options(1).length;
        for(let i = 0;i < this.length; i++){
        await this.openUrl('');
        (await this.drop(1)).click();
        await browser.pause(500);
        (await this.options(1)[i]).click();
        await browser.pause(500);
        }
    }
}

module.exports = new ProofOfConcept();