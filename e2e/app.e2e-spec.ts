import { CleanFootPrintPage } from './app.po';

describe('clean-foot-print App', () => {
  let page: CleanFootPrintPage;

  beforeEach(() => {
    page = new CleanFootPrintPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
