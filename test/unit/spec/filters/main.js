myModule.filter('length', function() {
  return function(text) {
    return ('' + (text || '')).length;
  }
});

describe('length filter', function() {
  beforeEach(module('myModule'));

  var $filter;

  beforeEach(inject(function(_$filter_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $filter = _$filter_;
  }));

  it('returns 0 when given null', function() {
    var length = $filter('length');
    expect(length(null)).toEqual(0);
  });

  it('returns the correct value when given a string of chars', function() {
    var length = $filter('length');
    expect(length('abc')).toEqual(3);
  });
});