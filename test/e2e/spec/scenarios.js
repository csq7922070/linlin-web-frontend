'use strict';

/* https://github.com/angular/protractor/blob/master/docs/toc.md */

describe('my app', function() {


  it('should automatically redirect to /view1 when location hash/fragment is empty', function() {
    browser.get('index.html');
    expect(browser.getLocationAbsUrl()).toMatch("/home/shop-info/1");
  });


  describe('#/home/shop-info/1', function() {

    beforeEach(function() {
      browser.get('#/home/shop-info/1');
    });


    it('should render view1 when user navigates to /view1', function() {
      expect(element.all(by.css('.cell_phone')).first().getText()).
        toMatch('电话');
    });

  });


  describe('#/home/shop-info/2', function() {

    beforeEach(function() {
      browser.get('#/home/shop-info/2');
    });


    it('should render view2 when user navigates to /view2', function() {
      expect(element.all(by.css('.cell_phone')).first().getText()).
        toMatch('电话');
    });

  });

  describe('#/home/shop-info/3', function() {

    beforeEach(function() {
      browser.get('#/home/shop-info/3');
    });


    it('should render view3 when user navigates to /view3', function() {
      expect(element.all(by.css('.online_err')).first().getText()).
        toMatch('程序员哥哥');
    });

  });

  describe('#/repair-list', function() {

    beforeEach(function() {
      browser.get('#/repair-list');
    });


    it('should render view3 when user navigates to repair-list', function() {
      expect(element.all(by.css('.check')).first().getText()).
        toMatch('查看');
    });

  });

  describe('#/repair/44', function() {

    beforeEach(function() {
      browser.get('#/repair/44');
    });


    it('should render view3 when user navigates to #/repair/44', function() {
      expect(element.all(by.css('.date_time')).first().getText()).
        toMatch('2016-01-14');
    });

  });

  describe('#/repair-add', function() {

    beforeEach(function() {
      browser.get('#/repair-add');
    });


    it('should render view3 when user navigates to #/repair-add', function() {
      expect(element.all(by.css('[name]=mobile')).first().getText()).
        toMatch('2016-01-14');
    });

  });
});
