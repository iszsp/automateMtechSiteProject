const { $ } = require('@wdio/globals');
const { $$ } = require('@wdio/globals');
const RunTheCateringStuff = require("./baseCateringFields.js");

class CateringFields extends RunTheCateringStuff {
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
    calendarClick(whichDay) {
        return $$(`tr:last-of-type td[data-handler="selectDay"]:nth-child(${whichDay})`);
    }
    get closeCalendar() {
        return $('[placeholder="mm/dd/yyyy"] + img');
    }
    get spinner() {
        return $('.gform_ajax_spinner');
    }
    get catSbmBtn() {
        return $('//*[contains(@value,"Submit")]');
    }
    get badSbm() {
        return $('.gform_validation_errors');
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
            await this.inputReqFields[0].waitForClickable();
            await this.inputReqFields[0].setValue('Bo');
            await this.inputReqFields[1].setValue('Jills');
            await this.inputReqFields[2].setValue('BoJills@gmail.com');
            await this.inputReqFields[3].setValue('9999999999');
            await this.inputReqFields[4].waitForClickable();
            await this.inputReqFields[4].click();
            let dayLength = await this.calendarClick('n').length;
            await this.calendarClick(dayLength)[0].click();
            await this.inputReqFields[5].setValue('0');
            await this.inputReqFields[6].setValue('my hamster destroyed the moon');
            await this.inputReqFields[7].setValue('3');
            await this.inputReqFields[8].setValue('0');

            await this.selectReqFields[0].click();
            await this.selectReqFieldsOption(2)[0].click();
            await this.selectReqFields[0].waitForStable();

            await this.selectReqFields[1].click();
            await this.selectReqFieldsOption(2)[1].click();
            await this.selectReqFields[1].waitForStable();

            let inLen = await this.inputReqFields.length;
            if(i < inLen){
                await this.inputReqFields[i].waitForClickable();
                await this.inputReqFields[i].clearValue();
                if(i == 4){
                    await this.closeCalendar.click();
                }
            }
            else{
                await this.selectReqFields[i-inLen].waitForClickable();
                await this.selectReqFields[i-inLen].click();
                await this.selectReqFieldsOption(1)[i-inLen].waitForStable();
                await this.selectReqFieldsOption(1)[i-inLen].click();
                await this.selectReqFields[i-inLen].waitForStable();
            }
            await this.catSbmBtn.click();
            await this.spinner.waitForExist({ reverse: true });
            await this.badSbm.waitForExist({ timeout: 350, timeoutMsg: `Submit button worked even though required field ${i} was empty` })
        }
    }
}

module.exports = new CateringFields();