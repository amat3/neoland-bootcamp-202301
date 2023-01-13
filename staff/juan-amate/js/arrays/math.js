/**
 * Returns the max value in the array of numbers
 *
 * @param {array} nums The array of numbers to be multiplicados
 * @param {number} multiplicador
 * @return {array} array of numbers multiplicados
 */

var value = [];

function multiplicar(numbers, multiplicador) {
  for (var i = 0; i < numbers.length; i++) {
    value[i] = numbers[i] * multiplicador;
  }
  return value;
}

var result = multiplicar([10, 60, 5], 2);
console.log(result);
// output expectd = [20, 120, 10]

var result = multiplicar([7, 3, 1], 10);
console.log(result);
// output expectd = [70, 30, 10]
