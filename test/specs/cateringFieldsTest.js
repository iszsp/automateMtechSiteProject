const CateringFields = require('../pageobjects/cateringFields.js');

describe('testing required fields for catering reservations', () => {
   it.skip('no inputs test', async () => {
      await CateringFields.noInputsRun();
   });
   it('all but two field test', async () => {
      await CateringFields.allBut2InputRun();
   });
});