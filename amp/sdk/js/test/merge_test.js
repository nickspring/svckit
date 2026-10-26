let assert = require("assert");
let merge = require("../src/merge.js");

describe('merge', function() {

  it("should drop null keys of a new subtree", function() {
    let full = {};
    merge(full, {m: {a: null, b: 1}}, true, true);
    assert.deepEqual(full, {m: {b: 1}});
  });

  it("should add a key again after a new subtree deleted it", function() {
    let full = {};
    merge(full, {m: {a: null}}, true);
    merge(full, {m: {a: {x: 1}}}, true);
    assert.equal(full.m.a.x, 1);
  });

  it("should not keep diff objects in the merged state", function() {
    let full = {};
    let diff = {m: {a: 1}};
    merge(full, diff, true, true);
    diff.m.a = 2;
    assert.equal(full.m.a, 1);
  });

});
