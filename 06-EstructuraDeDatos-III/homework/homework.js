"use strict";

/*
 Implementar la clase BinarySearchTree, definiendo los siguientes métodos recursivos:
  - size: retorna la cantidad total de nodos del árbol
  - insert: agrega un nodo en el lugar correspondiente
  - contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
  - depthFirstForEach: recorre el árbol siguiendo el orden depth first (DFS) en cualquiera de sus variantes, 
  según se indique por parámetro ("post-order", "pre-order", o "in-order"). Nota: si no se provee ningún parámetro, 
  hará el recorrido "in-order" por defecto.
  - breadthFirstForEach: recorre el árbol siguiendo el orden breadth first (BFS)

  El ábrol utilizado para hacer los tests se encuentra representado en la imagen bst.png dentro del directorio homework.
*/

function BinarySearchTree(data) {
	this.value = data;
	this.left = null;
	this.right = null;
	this._length = 1;
}

BinarySearchTree.prototype.insert = function(data) {
	// var bts = new BinarySearchTree(20)
	// bts.insert(12)
	// bts.insert(22)
	if(data >= this.value) {
		if(this.right === null) {
			this.right = new BinarySearchTree(data);
			this._length++;
		}
		else this.right.insert(data);
	}
	if(data < this.value) {
		if(this.left === null) {
			this.left = new BinarySearchTree(data);
			this._length++;
		}
		else this.left.insert(data);
	} 
};

BinarySearchTree.prototype.size = function() {
	// caso base: nodo hoja 
	if(this.left === null && this.right === null) return 1;
	if(this.left === null && this.right !== null) return 1 + this.right.size();
	if(this.left !== null && this.right === null) return 1 + this.left.size();
	if(this.left !== null && this.right !== null) return 1 + this.left.size() + this.right.size();
};

// FORMA ITERATIVA
// BinarySearchTree.prototype.contains = function(value){ 
// 	let current = this.root; 
// 	while(current){ 
// 		if(value === current.value) return true; 
// 		if(value < current.value) current = current.left;
// 		if(value > current.value) current = current.right; 
// 	} 
// 	return false;
// };

// FORMA RECURSIVA
BinarySearchTree.prototype.contains = function(data) {
	// contains: retorna true o false luego de evaluar si cierto valor existe dentro del árbol
	// valuesToInsert = [15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 45, 13, 12, 11, 30, 35, 33, 31, 34];
	// data = 12
	// 1era -> this.value = 20/ 12vo -> to back: true (line 71); 
	// 2da -> this.value = 15 / 11vo -> to back: true (line 71); 
	// 3era -> this.value = 5 / 10mo -> to back: true (line 72); 
	// 4ta -> this.value = 14 / 9no -> to back: true (line 71); 
	// 5ta -> this.value = 13 / 8vo -> to back: true (line 71); 
	// 6ta -> this.value = 12 / 7mo -> to back: true (line 71);
	if(data === this.value) return true;
	if(data < this.value && this.left !== null) return this.left.contains(data);
	if(data > this.value && this.right !== null) return this.right.contains(data);
	return false;
};

BinarySearchTree.prototype.depthFirstForEach = function(cb, order) {
	// ("post-order", "pre-order", o "in-order")
	if(order === 'pre-order') {
		// [20, 15, 5, 0, 1, 14, 13, 12, 11, 17, 25, 21, 28, 50, 45, 30, 35, 33, 31, 34]
		cb(this.value);
		if(this.left !== null) this.left.depthFirstForEach(cb, order);
		if(this.right !== null) this.right.depthFirstForEach(cb, order);
	} else if(order === 'post-order') {
		// [ 1, 0, 11, 12, 13, 14, 5, 17, 15, 21, 31, 34, 33, 35, 30, 45, 50, 28, 25, 20 ]
		if(this.left !== null) this.left.depthFirstForEach(cb, order);
		if(this.right !== null) this.right.depthFirstForEach(cb, order);
		cb(this.value);
	} else{
		// [ 0, 1, 5, 11, 12, 13, 14, 15, 17, 20, 21, 25, 28, 30, 31, 33, 34, 35, 45, 50 ]
		if(this.left !== null) this.left.depthFirstForEach(cb, order);
		cb(this.value);
		if(this.right !== null) this.right.depthFirstForEach(cb, order);
	}
};
BinarySearchTree.prototype.breadthFirstForEach = function(cb, array = []) {
	//breadthFirstForEach(cb)
	// let cb = cb;
	// let array = []; -> valores por default o propiedades por default: si no te paso nada inicialo como vacio.

	//breadthFirstForEach(cb, array)
	// let cb = cb;
	// let array = array; -> si se lo paso como parametro me arrastra el parametro a las sucesivas llamadas

	// depth = [20, 15, 25, 5, 17, 21, 28, 0, 14, 50, 1, 13, 45, 12, 30, 11, 35, 33, 31, 34]
	if(this.left !== null) array.push(this.left);
	if(this.right !== null) array.push(this.right);
	cb(this.value);
	if(array.length > 0) array.shift().breadthFirstForEach(cb, array);
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
  BinarySearchTree,
};
