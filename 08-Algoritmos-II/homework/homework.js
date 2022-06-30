'use strict'

const { merge } = require("@11ty/eleventy/src/TemplateData");

// No cambies los nombres de las funciones.

function quickSort(array) {
	// Implementar el método conocido como quickSort para ordenar de menor a mayor
	// el array recibido como parámetro
	// Devolver el array ordenado resultante
	// Tu código:
	// [5, 1, 4, 2, 8] ===> [5, 8] => [4, 5, 8] => [1, 2, 4, 5, 8]
	//              ^
	// left = [5, 1, 4, 2]
	// equals = [8]
	// right = []
	// left = [5, 1, 4, 2]
	//                  ^
	//         left = [1]
	//         equals = [2]
	//         right = [5, 4]
	//                     ^
	//                 left = []
	//                 equals = [4]
	//                 right = [5]
	// var pivot = Math.floor(Math.random()*array.length);
	var pivot = array.length - 1;
	var left = [];
	var equals = [];
	var right = [];
	equals.push(array[pivot]);
	for (let i = 0; i < array.length - 1; i++) {
		if (array[i] <= array[pivot]) left.push(array[i]);
		if (array[i] > array[pivot]) right.push(array[i]);
	}
	if (left.length <= 1 && right.length <= 1) return left.concat(equals).concat(right);
	if (left.length >= 1 && right.length <= 1) return quickSort(left).concat(equals).concat(right);
	if (left.length <= 1 && right.length >= 1) return left.concat(equals).concat(quickSort(right));
	if (left.length > 1 && right.length > 1) return quickSort(left).concat(equals).concat(quickSort(right));
}

console.log(quickSort([10, 10, 16, 12]));

function mergeSort(array) {
	// Implementar el método conocido como mergeSort para ordenar de menor a mayor
	// el array recibido como parámetro
	// Devolver el array ordenado resultante
	// Tu código:
	// [5, 1, 4, 2, 8]

	//caso base
	if(array.length <= 1) {
		return array;
	}

	var merge = function(left, right) {
		var sortedArray = [];
		while(left.length && right.length) {
			if(left[0] >= right[0]) {
				sortedArray.push(right.shift());
			}
			if(left[0] < right[0]) {
				sortedArray.push(left.shift());
			}
		}
		// if(left.length) sortedArray.concat(left);
		// if(right.length) sortedArray.concat(right);
		return sortedArray.concat(left).concat(right);	
	}

	// [5, 1, 4, 2, 8]
	//        ^
	// mitad = 2
	// left = [5, 1]
	//            ^
	// 			mitad = 1
	// 			left = [5]
	//		 	right = [1]
	// right = [4, 2, 8]
	//			   ^
	//			mitad = 2 
	//			left = [4]
	//			right = [2, 8]
	// 						^
	//				 	mitad = 1 
	//					left = [2]
	//				 	right = [8]

	var mitad = Math.floor(array.length / 2);
	const left = array.slice(0, mitad);
    const right = array.slice(mitad, array.length);
	// if(left.length > 1  && right.length > 1) return merge(mergeSort(left), mergeSort(right));
	// 														//[1, 5]     , [2, 4 ,8]   
	// if(left.length === 1 && right.length === 1) return merge(left, right); // [1, 5]
	// 																	   // [2, 8]
	// if(left.length > 1 && right.length === 1) return merge(mergeSort(left), right);
	// if(left.length === 1 && right.length > 1) return merge(left, mergeSort(right));
														//  [2, 4, 8]


	return merge(mergeSort(left), mergeSort(right));
				// [5, 1]       ,   [4, 2, 8]
				// [1, 5]       , 	[2, 4, 8]
			// [1, 2, 4, 5, 8]
}

console.log(mergeSort([5, 1, 4, 2, 8]));

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
	quickSort,
	mergeSort,
};
