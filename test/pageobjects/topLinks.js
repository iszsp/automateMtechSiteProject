
const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const Url = require('./url.js');

class ProofOfConcept extends Url {
    drop() {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(n)`);
    }
    options(i) {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(${i}) .elementor-widget:not(.elementor-widget-heading)`);
    }
    get badPage() {
        return $('//*[contains(text(),"Uh oh.")]')
    }
    get page404() {
        return $('//*[contains(text(),"404 Not Found")]')
    }
    get page() {
        return $('html');
    }
    async proofRun() {
        await this.openUrl('');
        //console.log(await this.options(1) + "cheese1");
        let dropLinkLength = await this.drop().length;
        //console.log(length + "cheese2");
        //console.log(await this.drop(1) + "cheese3")
        for(let y = 0;y < dropLinkLength; y++){
            let optGrab = this.options(y+1);
            let insLinkLength = await this.options(y+1).length;
            for(let i = 0;i < insLinkLength; i++){
                let chgTab = await browser.getWindowHandles();
                //console.log(chgTab + "cheese5")
                await this.openUrl('');
                let origUrl = browser.getUrl();
                if(chgTab.length > 1){
                    await browser.switchToWindow(chgTab[0]);
                }
                //console.log(y + "cheese4");
                (await this.drop()[y]).click();
                //await browser.pause(500);
                await optGrab[i].waitForStable();
                (await optGrab[i]).click();
                await browser.waitUntil(async () => {
                    let linkUrl = await browser.getUrl();
                    return linkUrl !== origUrl;
                }, {
                    timeout: 2000,
                    timeoutMsg: "link doesn't work or the link brings user to same page"
                });
                //await browser.pause(1000);
                try {
                    await this.badPage.waitForExist({ timeout: 250, reverse: true});
                    await this.page404.waitForExist({ timeout: 250, reverse: true});
                } catch (error) {
                    throw new Error(`bad link detected on dropdown ${y+1}, link ${i+1}.`);
                }
            }
        }
    }
}

module.exports = new ProofOfConcept();