const CateringFields = require('../pageobjects/cateringFields.js');
const Search = require('../pageobjects/search.js');
const TopLinks = require('../pageobjects/topLinks.js');
const BottomLinks = require('../pageobjects/bottomLinks.js');

describe('testing the top links', () => {
   it('', async () => {
        await TopLinks.topLinkRun();
   });
});
describe('testing the bottom links', () => {
   it('', async () => {
        await BottomLinks.bottomLinkRun();
   });
});
describe('testing the search field', () => {
   it('bad value test', async () => {
      await Search.searchBadRun();
   });
   it('search for an existing program test', async () => {
      await Search.searchGoodRun();
   });
   it('boundary test', async () => {
      await Search.searchBoundRun();
   });
});
describe('testing required fields for catering reservations', () => {
   it('no inputs submit test', async () => {
      await CateringFields.noInputsRun();
   });
   it('all but one field filled submit test', async () => {
      await CateringFields.allBut1InputRun();
   });
});