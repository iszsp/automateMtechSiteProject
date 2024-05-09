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
    get reqFieldsNoCal() {
        return $$('[aria-required="true"]:not([placeholder="mm/dd/yyyy"])');
    }
    get selectReqFields() {
        return $$('select[aria-required="true"]');
    }
    selectReqFieldsOption(do1ForEmpty) {
        return $$(`select[aria-required="true"] :nth-child(${do1ForEmpty})`);
    }
    get inputReqFieldsNoCal() {
        return $$('input[aria-required="true"]:not([placeholder="mm/dd/yyyy"])');
    }
    get calendarClick() {
        return $$('tr:last-of-type td[data-handler="selectDay"]');
    }
    get calendar() {
        return $('[placeholder="mm/dd/yyyy"]');
    }
    get closeDrpDwn() {
        return $('//*[contains(text(),"Additional Information")]');
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
    async allBut2InputRun() {
        await browser.setWindowSize(1200, 800);
        await this.startCatering();
        let calLength = await this.calendarClick.length-1;
        //await this.calendar.waitForClickable();
        
        let reqLength = await this.reqFieldsNoCal.length
        for(let i = 0; i < reqLength; i++){
            await this.calendar.click();
            await this.calendarClick[calLength].click();
            //await this.inputReqFields[0].setValue('Bo');
            await this.inputReqFieldsNoCal[1].setValue('Jills');
            await this.inputReqFieldsNoCal[2].setValue('BoJills@gmail.com');
            await this.inputReqFieldsNoCal[3].setValue('9999999999');
            await this.inputReqFieldsNoCal[4].setValue('0');
            await this.inputReqFieldsNoCal[5].setValue('my hamster ate food');
            await this.inputReqFieldsNoCal[6].setValue('3');
            await this.inputReqFieldsNoCal[7].setValue('0');
            
            await this.selectReqFields[0].click();
            
            await this.selectReqFieldsOption(2)[0].click();
            
            await this.selectReqFields[1].click();
            
            
            await this.selectReqFieldsOption(2)[1].click();
            await this.closeDrpDwn.click();
            await browser.pause('5000');
            if(i < 8){
                await this.inputReqFieldsNoCal[i].waitForClickable();
                await this.inputReqFieldsNoCal[i].clearValue();
            }
            else{
                await this.selectReqFields[i-8].click();
                await this.selectReqFieldsOption(1)[i-8].click();
                //await this.selectReqFieldsOption(1)[i-9].click();
            }
            await this.catSbmBtn.click();
            if(await !this.badSbm.isExisting()){
                throw new Error(`Submit button may have worked even though 1 required field (field: ${i}) was empty`);
            }
        }
    }
}

module.exports = new CateringFields();