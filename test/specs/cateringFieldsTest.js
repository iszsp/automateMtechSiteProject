const CateringFields = require('../pageobjects/cateringFields.js');

describe('testing required fields for catering reservations', () => {
   it('no inputs submit test', async () => {
      await CateringFields.noInputsRun();
   });
   it('all but one field filled submit test', async () => {
      await CateringFields.allBut1InputRun();
   });
});