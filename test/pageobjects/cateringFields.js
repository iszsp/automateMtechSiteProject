const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const RunTheCateringStuff = require("./baseCateringFields.js");

class CateringFields extends RunTheCateringStuff {
    get allFields() {
        return $$('.gf_browser_chrome input:not([type="hidden"]):not([disabled="disabled"]):not(.button), .gf_browser_chrome select:not([type="hidden"]):not([disabled="disabled"]), textarea');
    }
    get allInputs() {
        return $$('.gf_browser_chrome input:not([type="hidden"]):not([disabled="disabled"]):not(.button), textarea');
    }
    get reqFields() {
        return $$('[aria-required="true"]');
    }
    get selectReqFields() {
        return $$('select[aria-required="true"]');
    }
    selectReqFieldsOption(do1ForEmpty) {
        return $$(`select[aria-required="true"] :nth-child(${do1ForEmpty})`);
    }
    get inputReqFields() {
        return $$('input[aria-required="true"]');
    }
    get closeCalendar() {
        return $('//label[contains(text(),"MTECH Campus")]');
    }
    get catSbmBtn() {
        return $('//*[contains(@value,"Submit")]');
    }
    get badSbm() {
        return $('.gform_validation_errors');
    }
    get cookieBar() {
        return $('.wt-cli-ccpa-element');
    }
    get closeCookieBar() {
        return $('[data-cli_action="accept"]');
    }
    async noInputsRun() {
        await this.startCatering();
        let numOfInput = await this.allInputs.length
        for(let i = 0; i < numOfInput; i++){
            await this.allInputs[i].clearValue();
        }
        await this.catSbmBtn.click();
        if(await this.badSbm.isExisting({ return: false })){
            throw new Error('Submit button may have worked even though all input fields are empty');
        }
    }
    async allBut1InputRun() {
        await this.startCatering();
        let reqLength = await this.reqFields.length
        for(let i = 0; i < reqLength; i++){
            //await this.inputReqFields[0].setValue('Bo');
            await this.inputReqFields[1].setValue('Jills');
            await this.inputReqFields[2].setValue('BoJills@gmail.com');
            await this.inputReqFields[3].setValue('9999999999');
            await this.inputReqFields[4].setValue('11/11/1111');
            await this.inputReqFields[5].setValue('0');
            await this.inputReqFields[6].setValue('my hamster ate food');
            await this.inputReqFields[7].setValue('3');
            await this.inputReqFields[8].setValue('0');
            await this.selectReqFields[0].click();
            await this.selectReqFieldsOption(2)[0].click();
            await this.selectReqFields[1].click();
            await this.selectReqFieldsOption(2)[1].click();
            if(i < 9){
                await this.inputReqFields[i].waitForClickable();
                await this.inputReqFields[i].clearValue();
            }
            else{
                await this.selectReqFields[i-9].click();
                await this.selectReqFieldsOption(1)[i-9].click();
                await this.selectReqFieldsOption(1)[i-9].click();
            }
            await this.catSbmBtn.click();
            if(await !this.badSbm.isExisting()){
                throw new Error(`Submit button may have worked even though 1 required field (field: ${i}) was empty`);
            }
        }
    }
}

module.exports = new CateringFields();