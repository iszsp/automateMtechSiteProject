const Search = require('../pageobjects/search.js');

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