const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const RunTheSearchStuff = require("./searchBase");

class CateringFields extends RunTheSearchStuff {
    get allFields() {
        return $$('.gf_browser_chrome input:not([type="hidden"]):not([disabled="disabled"]):not(.button), .gf_browser_chrome select:not([type="hidden"]):not([disabled="disabled"]), textarea')
    }
    get allInputs() {
        return $$('.gf_browser_chrome input:not([type="hidden"]):not([disabled="disabled"]):not(.button), textarea')
    }
    get reqFields() {
        return $$('[aria-required="true"]')
    }
    get catSbmBtn() {
        return $('//*[contains(@value,"Submit")]')
    }
    async noInputsRun() {
        await this.openUrl('catering/')
        let numOfInput = await this.allInputs.length
        for(let i = 0; i < numOfInput; i++){
            
        }
    }
    async allBut1InputRun() {
        await this.openUrl('catering/')

    }
}