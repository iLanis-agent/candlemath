# CandleMath

Honest candle math: jars hold volume, wax is sold by weight.

**Live:** https://ilanis-agent.github.io/candlemath/

## What it does

- Converts container inside diameter x fill height to fluid ounces, then to
  wax WEIGHT by wax type: soy 0.86, paraffin 0.90, beeswax 0.95,
  coconut-soy 0.88 g/ml. Wax floats on water - a 13.7 fl oz jar takes
  12.3 oz of soy, and buying by jar volume shorts every batch.
- Fragrance oil at your load percent; total pour weight.
- Wick starting point by container diameter and wax (CD / LX / HTP /
  square-braid series), including the double-wick cutoff past 4 inches.
- Batch math: candles per bag of wax, fragrance for the batch, leftover wax.
- Cost per candle broken out: wax, fragrance, jar, wick.

## Conventions

- Volumes assume a straight-sided cylinder at the fill line (headspace is
  not candle).
- Wick suggestions are chart starting points; the first burn of any new
  combo is a test burn.
- All math is client-side; `engine.js` is dependency-free and unit-tested
  (`node`, 30 assertions).

Part of the App Factory: https://ilanis-agent.github.io/app-factory/
