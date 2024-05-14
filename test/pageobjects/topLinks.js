
const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const FindBadPage = require('./findBadPage.js')

class TopLinks extends FindBadPage {
    get drop() {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(n)`);
    }
    options(i) {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(${i}) .elementor-widget:not(.elementor-widget-heading)`);
    }
    external(i) {
        return $$(`[class*="active"] .jet-mega-menu-list > :nth-child(${i}) .elementor-widget:not(.elementor-widget-heading) a[href]`);
    }
    async topLinkRun() {
        await browser.setWindowSize(1200, 800);
        await this.openUrl('');
        let dropLinkLength = await this.drop.length;
        for(let y = 0; y < dropLinkLength; y++){
            let optGrab = this.options(y+1);
            let external = this.external(y+1);
            let insLinkLength = await this.options(y+1).length;
            for(let i = 0;i < insLinkLength; i++){
                await this.openUrl('');
                let origUrl = await browser.getUrl();
                let chgTab = await browser.getWindowHandles();
                if(chgTab.length > 1){
                    await browser.switchToWindow(chgTab[0]);
                }
                await this.drop[y].waitForExist();
                await this.drop[y].click();
                let hrefTag = await external[i].getAttribute('href');
                await optGrab[i].waitForClickable();
                await optGrab[i].click();
                await this.checkForBad(`bad link detected on dropdown ${y+1}, link ${i+1} due to 404 or bad load time.`);
                if(hrefTag.includes('https') == false){
                    if(await browser.getUrl() == origUrl){
                        throw new Error(`Is the link detected on dropdown ${y+1}, link ${i+1} supposed to do nothing/ bring the user to the same page?`);
                    }
                }
            }
        }
    }
}

module.exports = new TopLinks();