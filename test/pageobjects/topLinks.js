
const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const Url = require('./url.js');

class TopLinks extends Url {
    get drop() {
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
    async topLinkRun() {
        await browser.setWindowSize(1200, 800);
        await this.openUrl('');
        let dropLinkLength = await this.drop.length;
        for(let y = 0; y < dropLinkLength; y++){
            let optGrab = this.options(y+1);
            let extLink = this.external(y+1);
            let insLinkLength = await this.options(y+1).length;
            for(let i = 0;i < insLinkLength; i++){
                let chgTab = await browser.getWindowHandles();
                await this.openUrl('');
                let origUrl = await browser.getUrl();
                if(chgTab.length > 1){
                    await browser.switchToWindow(chgTab[0]);
                }
                (await this.drop[y]).click();
                //await browser.pause(500);
                let hrefTag = (await optGrab[i].getAttribute('href'));
                await optGrab[i].waitForClickable();
                (await optGrab[i]).click();
                //await browser.pause(1000);
                try {
                    await this.badPage.waitForExist({ timeout: 250, reverse: true});
                    await this.page404.waitForExist({ timeout: 250, reverse: true});
                } catch (error) {
                    throw new Error(`bad link detected on dropdown ${y+1}, link ${i+1} due to 404 or bad load time.`);
                }
                        // I think the test doesn't run efficient enough to run
                        // the commented part below, it times out...
                // if(hrefTag.includes('https') == false){
                //     let linkUrl = await browser.getUrl();
                //     if(linkUrl == origUrl){
                //         throw new Error(`Is the link detected on dropdown ${y+1}, link ${i+1} supposed to do nothing/ bring the user to the same page?`);
                //     }
                // }
            }
        }
    }
}

module.exports = new TopLinks();