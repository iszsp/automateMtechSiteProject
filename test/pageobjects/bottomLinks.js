
const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const Url = require('./url.js');

class BottomLinks extends Url {
    get section() {
        return $$('.elementor-column:nth-of-type(n) .elementor-nav-menu--toggle');
    }
    options(i) {
        return $$(`.elementor-column:nth-of-type(${i}) .elementor-nav-menu--toggle .menu-item :not([tabindex])`);
    }
    get badPage() {
        return $('//*[contains(text(),"Uh oh.")]')
    }
    get page404() {
        return $('//*[contains(text(),"404 Not Found")]')
    }
    async bottomLinkRun() {
        await browser.setWindowSize(1200, 800);
        await this.openUrl('');
        let sectionLinkLength = await this.section.length;
        for(let y = 0; y < sectionLinkLength; y++){
            let optGrab = this.options(y+1);
            let insLinkLength = await this.options(y+1).length;
            for(let i = 0;i < insLinkLength; i++){
                let chgTab = await browser.getWindowHandles();
                await this.openUrl('');
                let origUrl = await browser.getUrl();
                if(chgTab.length > 1){
                    await browser.switchToWindow(chgTab[0]);
                }
                let hrefTag = (await optGrab[i].getAttribute('href'));
                await optGrab[i].waitForClickable();
                (await optGrab[i]).click();
                //await browser.pause(1000);
                try {
                    await this.badPage.waitForExist({ timeout: 250, reverse: true});
                    await this.page404.waitForExist({ timeout: 250, reverse: true});
                } catch (error) {
                    throw new Error(`bad link detected on column ${y+1}, link ${i+1} due to 404 or bad load time.`);
                }
                        // This test seems to run shorter than topLinks
                        // so the part below doesn't time out.
                if(hrefTag.includes('https') == false){
                    let linkUrl = await browser.getUrl();
                    if(linkUrl == origUrl){
                        throw new Error(`Is the link detected on dropdown ${y+1}, link ${i+1} supposed to do nothing/ bring the user to the same page?`);
                    }
                }
            }
        }
    }
}

module.exports = new BottomLinks();