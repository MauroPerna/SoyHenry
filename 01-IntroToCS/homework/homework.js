'use strict'

// function BinarioADecimal(num) {
//   // tu codigo aca
//   // return Parseint (num,2);
//   let newNum = num.split('').reverse();
//   // num = "10" -> ['1', '0'] -> ['0', '1']
//   let array = [];
//   for (let i = 0; i < newNum.length; i++) {
//     const numDecimal = newNum[i] * Math.pow(2, i);
//     array.push(numDecimal);
//     // array = [0, 2] 
//   }
//   const valInicial = 0;
//   const sumatoria = array.reduce(
//     (valorPrevio, valorActual) => valorPrevio + valorActual,
//     valInicial
//   );
//   // let sumatoria = 0;
//   // for (let j = 0; j < array.length; j++) {
//   //   sumatoria += array[j];
//   // }
//   return sumatoria;
// }


// Binario a Decimal con recursividad
function BinarioADecimal(num) {
  var res = 0;
  if(num.length === 0) return res;
  var newNum = num.slice(1);
  res = num.charAt(0) * Math.pow(2, num.length - 1);
  return BinarioADecimal(newNum) + res;
}

function DecimalABinario(num) {
  // tu codigo aca
  let numero = num;
  // numero = 7
  let numBinario = []; // [1, 1, 0] -> [0, 1, 1]
  for (let i = 0; numero >= 1; i++) {
    let numbin = numero % 2;
    numBinario.push(numbin);
    numero = Math.trunc(numero / 2);
  }
  return numBinario.reverse().join(''); // -> "011"
}


module.exports = {
  BinarioADecimal,
  DecimalABinario,
}