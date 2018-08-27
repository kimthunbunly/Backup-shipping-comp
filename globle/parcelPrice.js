module.exports = function (volume, weight, qty) {
  let vPrice = 0, wPrice = 0, totalPrice = 0;
  if (volume <= 1000) vPrice = volume * 0.001;
  else if (volume <= 10000) vPrice = 1 + (volume - 1000) * 0.0008;
  else if (volume <= 100000) vPrice = 1 + 7.2 + (volume - 10000) * 0.0005;
  else if (volume <= 1000000) vPrice = 1 + 7.2 + 45 + (volume - 100000) * 0.0001;
  else {
      vPrice = 1 + 7.2 + 45 + 90 + (volume - 1000000) * 0.05;
  }
  if (weight <= 1) wPrice = weight * 0.7;
  else if (weight <= 10) wPrice = 0.7 + (weight - 1) * 0.5;
  else if (weight <= 100) wPrice = 0.7 + 4.5 + (weight - 10) * 0.2;
  else if (weight <= 1000) wPrice = 0.7 + 4.5 + 18 + (weight - 100) * 0.08;
  else {
      wPrice = 0.7 + 4.5 + 18 + 64 + (weight - 1000) * 1;
  }
  return totalPrice = (vPrice + wPrice) * qty;
}
