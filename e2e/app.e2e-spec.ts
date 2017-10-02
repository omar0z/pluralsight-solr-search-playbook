import { Mean2SeedPage } from './app.po';

describe('mean2-seed App', () => {
  let page: Mean2SeedPage;

  beforeEach(() => {
    page = new Mean2SeedPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
