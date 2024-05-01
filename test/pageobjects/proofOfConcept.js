import { $ } from '@wdio/globals'
import { $$ } from '@wdio/globals'
import { browser } from '@wdio/globals'
class Dogs {

    open = () => {
        return browser.url('https://cannonkeys.com/');
    };
    numSlide = () => {
        return $$('.slide');
    };
    current = () => {
        return $('.slick-current');
    };
    get cart() {
        return $('.cart-link');
    }
    async cheese() {
        let cur = (await this.current());
        let num = (await this.numSlide());
        await browser.url('https://cannonkeys.com/');
        await num.waitForExist();
        console.log((await num.length) + 'cheese');
        for(let i = 0; i < (await num.length); i++) {
            await console.log('im waiting to click')
            await $('button[class*="next"]').waitForClickable({ timeout: 3000 });
            await cur.waitForStable();
            await $('button[class*="next"]').click();
        };
    };
    async cheddar() {
        await browser.url('https://cannonkeys.com/');
        await this.click();
        console.log('cheesys');
        await $('a.no-wrap[href="/search"]').click();
        console.log('cheesys2');
    }
};
export default new Dogs();

