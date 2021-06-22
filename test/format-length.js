var should = require('should');
var jspack = require('../jspack.js').jspack;

describe('Test strict format length:', function () {

  it('pack less data (fails)', function () {
    var buf = jspack.Pack('<BB', [0]);

    buf.should.be.false();
  });

  it('unpack less data (fails)', function () {
    var buf = jspack.Unpack('<BB', [0]);

    should.not.exist(buf);
  });

});

describe('Test loose format length:', function () {

  it('pack less data', function () {
    var buf = jspack.Pack('<BB', [2], true);

    buf.should.be.eql([0x02]);
  });

  it('pack less data, series 3B', function () {
    // Data for series 3B is not enough so it will abort before that
    var buf = jspack.Pack('<B3B', [2, 4], true);

    buf.should.be.eql([0x02]);
  });

  it('unpack less data', function () {
    var buf = jspack.Unpack('<BB', [2], true);

    buf.should.be.eql([0x02]);
  });

  it('unpack less data, I', function () {
    // Cuts off before the I (needs 4 bytes)
    var buf = jspack.Unpack('<BI', [2, 10, 0, 0], true);

    buf.should.be.eql([0x02]);
  });

  it('unpack less data, series 3B', function () {
    // Cuts off after I but has not enough for 3B anymore
    var buf = jspack.Unpack('<BI3B', [2, 10, 0, 0, 0, 4], true);

    buf.should.be.eql([0x02, 0x0a]);
  });

});

