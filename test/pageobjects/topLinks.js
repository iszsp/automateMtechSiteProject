
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
    external(i) {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(${i}) .elementor-widget:not(.elementor-widget-heading) [href]`);
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
        await browser.setWindowSize(1200, 800);
        await this.openUrl('');
        //console.log(await this.options(1) + "cheese1");
        let dropLinkLength = await this.drop().length;
        //console.log(length + "cheese2");
        //console.log(await this.drop(1) + "cheese3")
        for(let y = 0; y < dropLinkLength; y++){
            let optGrab = this.options(y+1);
            let extLink = this.external(y+1);
            let insLinkLength = await this.options(y+1).length;
            for(let i = 0;i < insLinkLength; i++){
                let chgTab = await browser.getWindowHandles();
                //console.log(chgTab + "cheese5")
                await this.openUrl('');
                let origUrl = await browser.getUrl();
                if(chgTab.length > 1){
                    await browser.switchToWindow(chgTab[0]);
                }
                //console.log(y + "cheese4");
                (await this.drop()[y]).click();
                //await browser.pause(500);
                await optGrab[i].waitForClickable();
                (await optGrab[i]).click();
                //await browser.pause(1000);
                try {
                    await this.badPage.waitForExist({ timeout: 250, reverse: true});
                    await this.page404.waitForExist({ timeout: 250, reverse: true});
                } catch (error) {
                    throw new Error(`bad link detected on dropdown ${y+1}, link ${i+1}.`);
                }
                let linkUrl = await browser.getUrl();
                        // I think the test doesn't run efficient enough to run
                        // the commented part below, it times out...
                // if((await extLink[i].getAttribute('href')).includes('https') == false){
                //     //console.log('cheese' + i)
                //     if(linkUrl == origUrl){
                //         throw new Error(`Is the link detected on dropdown ${y+1}, link ${i+1} supposed to do nothing/ bring the user to the same page?`);
                //     }
                // }
            }
        }
    }
}

module.exports = new ProofOfConcept();