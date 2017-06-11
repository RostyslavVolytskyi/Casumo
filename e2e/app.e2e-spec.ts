import { BooklistPage } from './app.po';

describe('booklist App', () => {
  let page: BooklistPage;

  beforeEach(() => {
    page = new BooklistPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
