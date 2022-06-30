'use strict'
// No cambies los nombres de las funciones.

function factorear(num) {
	// Factorear el número recibido como parámetro y devolver en un array
	// los factores por los cuales se va dividiendo a dicho número (De menor a mayor)
	// Ej: factorear(180) --> [1, 2, 2, 3, 3, 5] Ya que 1x2x2x3x3x5 = 180 y son todos números primos
	// Tu código:
	var array = [1];
	for (let i = 2; num > 1; i++) {
		// 180 % 2 = 0 => array = [2]
		// 90 % 2 = 0 => array = [2, 2]
		// 45 % 2 != 0 
		// 45 % 3 = 0 => array = [2, 2, 3]
		// 15 % 3 = 0 => array = [2, 2 , 3, 3]
		// 5 % 5 = 0 => array = [2, 2 , 3, 3, 5]
		// num = 0
		while (num % i === 0 && num !== 1) {
			array.push(i);
			num = num/i;
		}
	}
	return array;

}


//function bubbleSort(array) {	
// 	console.time()
// 	var isSwapped= true;
// 	  while(isSwapped){
// 		isSwapped = false;
// 		for(var i = 0; i< array.length-1; i++){
						 // quiero llegar hasta array.lenth - 1 porque a la derecha ya quedan ordenados
// 			if(array[i] > array[i + 1]){
// 			  var auxiliar = array[i];
// 			  array[i] = array[i+1];
// 			  array[i+1] = auxiliar;
// 			  isSwapped = true;
// 			}
// 		}
// 	  } console.timeEnd()
// 	  return array;
//}

function bubbleSort(array) {
	// Implementar el método conocido como bubbleSort para ordenar de menor a mayor
	// el array recibido como parámetro
	// Devolver el array ordenado resultante
	// Tu código:
	var swap = function(array, firstIndex, secondIndex) {
		var num = array[firstIndex];
		array[firstIndex] = array[secondIndex];
		array[secondIndex] = num;
	};
	console.time()
	// [5, 1, 4, 2, 8] -> [1, 2, 4, 5, 8]
	for (let i = 0; i <= array.length; i++) {
		// i = 0 => array[0] = 5
		// before swap i = 0 => array[0] = 1
		// i = 1 => array[1] = 5
		// before swap i = 1 => array[1] = 4
		// before swap i = 1 => array[1] = 2
		//  i = 2 => array[2] = 5
		// before swap i = 2 => array[2] = 4
		// i = 3 => array[3] = 5
		// i = 4 => array[4] = 8
		for (let j = i+1; j <= array.length; j++) {
			//---------i=0-------------
			// j = 1 => array[1] = 1 true -> swap
			// j = 2 => array[2] = 4
			// j = 3 => array[3] = 2
			// j = 4 => array[4] = 8
			//---------i=1-------------
			// j = 2 => array[2] = 4 true -> swap
			// j = 3 => array[3] = 2 true -> swap
			// j = 4 => array[4] = 8
			//---------i=2-------------
			// j = 3 => array[3] = 4 true -> swap
			// j = 4 => array[4] = 8
			//---------i=3-------------
			// j = 4 => array[4] = 8
			if(array[i] > array[j]) swap(array, i, j); // [5, 1, 4, 2, 8] => [1, 5, 4, 2, 8] => [1, 4, 5, 2, 8]
													   // => [1, 2, 5, 4, 8] => [1, 2, 4, 5, 8]
		}
	}
	console.timeEnd()
	return array;

}


function insertionSort(array) {
	// Implementar el método conocido como insertionSort para ordenar de menor a mayor
	// el array recibido como parámetro utilizando arreglos
	// Devolver el array ordenado resultante
	// Tu código:
	var insert = function(array, rightIndex, value) {
				//[5, 1, 4, 2, 8],     0,       1
				//[1, 5, 4, 2, 8],     1,       4 
		for(var i = rightIndex; i >= 0 && array[i] > value; i--) {
			//  i = 0 			0 >= 0       5  >  1 
			// hacer espacio corriendo todos los elementos mayores a value 1 posicion a la derecha
			array[i + 1] = array[i];
			// array[1] = 5
			// [5, 5, 4, 2, 8]
			// [1, 5, 5, 2, 8]
		}
		// inserta el valor en la posicion, es en i + 1 porque
		// i = rightIndex y a la izquierda de i los elementos son menores al valor a insertar
		// además los elementos a la izquierda ya estan ordenados
		
		// como el i era 0 en la primer vuelta del for entra hace lo que tiene que hacer y luego hacer i--
		// por lo tanto el i ahora es -1
		array[i + 1] = value; //array[-1+1] => array[0] = 1 --> [1, 5, 4, 2, 8]
							  //array[1+1] => array[2] = 4 --> [1, 4, 5, 2, 8]
	};
	console.time()
	var aux = 0;
	for (let i = 1; i < array.length; i++) {
		//[5, 1, 4, 2, 8]
		// toma el subarreglo [1, 4, 2, 8] porque [5] ya esta ordenado por eso empieza del i = 1
		aux = array[i]; // 1
		insert(array, i-1, aux); // insert([5, 1, 4, 2, 8], 0, 1)
								 // insert([1, 5, 4, 2, 8], 1, 4)
	}
	console.timeEnd()
	return array;

}


function selectionSort(array) {
	// Implementar el método conocido como selectionSort para ordenar de menor a mayor
	// el array recibido como parámetro utilizando dos arreglos
	// Devolver el array ordenado resultante
	// Tu código:
	var swap = function(array, i, minIndex) {
		var num = array[i];
		array[i] = array[minIndex];
		array[minIndex] = num;
	};

	// encontrar el indice del menor elemento
	var indexMin = function(array, i) {
		// recordar que los elementos a la izquirda en el ordenamiento por seleccion estan ordenados
		// partimos del indice 1 porque el subarreglo de 1 elemento ya esta ordenado
		var minValue = array[i] // empezamos por el primer valor del subarreglo
		var minIndex = i;
		for (let i = minIndex + 1; i < array.length; i++) {
			if(array[i] < minValue) {
				minValue = array[i];
				minIndex = i;
			}
		}
		return minIndex;
	}
	console.time()
	var minIndex = 0;
	for (let i = 0; i < array.length; i++) {
		minIndex = indexMin(array, i);
		swap(array, i, minIndex)
	}
	console.timeEnd();
	return array;
}


var arr = [5, 1, 4, 2, 8, 15, 3, 100, -1, -10];
console.log(bubbleSort(arr));
console.log(insertionSort(arr));
console.log(selectionSort(arr));

// No modificar nada debajo de esta línea
// --------------------------------

module.exports = {
	factorear,
	bubbleSort,
	insertionSort,
	selectionSort,
};
