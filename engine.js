/* CandleMath engine - honest candle math: wax is bought by weight, sized by volume and density. */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.CandleEngine = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  var ML_PER_FLOZ = 29.574;
  var G_PER_OZ = 28.35;

  var WAXES = {
    soy:       { name: 'Soy (container blend)', density: 0.86, wickSeries: 'CD'  },
    paraffin:  { name: 'Paraffin',              density: 0.90, wickSeries: 'LX'  },
    beeswax:   { name: 'Beeswax',               density: 0.95, wickSeries: 'Square braid' },
    coconut:   { name: 'Coconut-soy',           density: 0.88, wickSeries: 'HTP' }
  };

  /* Cylinder fill volume in fluid ounces. */
  function containerVolumeFloz(diaIn, heightIn) {
    var r = diaIn / 2;
    var in3 = Math.PI * r * r * heightIn;
    return in3 * 0.554113;
  }

  /* Weight oz of wax for a fluid-ounce fill volume: wax floats on water, so it weighs less. */
  function waxOz(volFloz, waxKey) {
    var d = WAXES[waxKey].density;
    return (volFloz * ML_PER_FLOZ * d) / G_PER_OZ;
  }

  function fragranceOz(waxWeightOz, loadPct) {
    return waxWeightOz * loadPct / 100;
  }

  /* Whole candles from a batch of wax, fragranced: jar count is limited by wax weight,
     fragrance scales with it. */
  function candlesPerBatch(batchWaxLb, perCandleWaxOz) {
    return Math.floor(batchWaxLb * 16 / perCandleWaxOz);
  }

  /* Wick suggestion bands by container inside diameter. */
  function wickFor(waxKey, diaIn) {
    var s = WAXES[waxKey].wickSeries;
    if (s === 'Square braid') {
      if (diaIn <= 2) return s + ' 1/0';
      if (diaIn <= 2.5) return s + ' 2/0';
      if (diaIn <= 3) return s + ' 4/0';
      if (diaIn <= 3.5) return s + ' #2';
      if (diaIn <= 4) return s + ' #4';
      return 'two ' + s + ' 2/0 wicks';
    }
    if (diaIn <= 2) return s + '-5';
    if (diaIn <= 2.5) return s + '-8';
    if (diaIn <= 3) return s + '-12';
    if (diaIn <= 3.5) return s + '-16';
    if (diaIn <= 4) return s + '-20';
    return 'two ' + s + '-12 wicks';
  }

  function costPerCandle(waxWeightOz, waxPricePerLb, foOz, foPricePerOz, jarCost, wickCost) {
    var waxCost = (waxWeightOz / 16) * waxPricePerLb;
    var foCost = foOz * foPricePerOz;
    return Math.round((waxCost + foCost + jarCost + wickCost) * 100) / 100;
  }

  function r2(x) { return Math.round(x * 100) / 100; }

  return {
    WAXES: WAXES,
    containerVolumeFloz: containerVolumeFloz,
    waxOz: waxOz,
    fragranceOz: fragranceOz,
    candlesPerBatch: candlesPerBatch,
    wickFor: wickFor,
    costPerCandle: costPerCandle,
    r2: r2
  };
});
