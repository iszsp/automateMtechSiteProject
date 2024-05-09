const Search = require('../pageobjects/search.js');

describe('testing the search field', () => {
   it('negative test', async () => {
      await Search.searchBadRun();
   });
   it('positive test', async () => {
      await Search.searchGoodRun();
   });
   it('boundary test', async () => {
      await Search.searchBoundRun();
   });
});