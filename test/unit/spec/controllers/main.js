'use strict';

describe("A spec (with setup and tear-down)", function() {
  var foo;
  beforeEach(function() {
    foo = 0;
    foo += 1;
  });
  afterEach(function() {
    foo = 0;
  });
  it("can have more than one expectation", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
  it("can have more than one expectation2", function() {
    expect(foo).toEqual(1);
    expect(true).toEqual(true);
  });
  it("is just a function, so it can contain any code", function() {
    expect(foo).toEqual(1);
  });
});
