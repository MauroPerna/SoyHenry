"use strict";

/*
Implementar la clase LinkedList, definiendo los siguientes métodos:
  - add: agrega un nuevo nodo al final de la lista;
  - remove: elimina el último nodo de la lista y retorna su valor (tener en cuenta el caso particular de una lista
	de un solo nodo y de una lista vacía);
  - search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: 
  el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado;
  en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
  Ejemplo: 
  search(3) busca un nodo cuyo valor sea 3;
  search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
  busca un nodo cuyo valor sea un número par.
  En caso de que la búsqueda no arroje resultados, search debe retornar null.
*/

function LinkedList() {
	this._length = 0;
	this.head = null;
}

function Node(value) {
	this.value = value;
	this.next = null;
}

LinkedList.prototype.add = function (data) {
	var newNodo = new Node(data);
	var current = this.head;
	if(!current) {
		// si esta vacia
		this.head = newNodo;
		this._length++;
		return newNodo;
	}
	// si no esta vacia
	while(current.next) {
		current = current.next;
	}
	// el while llega al ultimo nodo el cual su sucesor no existe y devuelve null por lo tanto sale del while
	current.next = newNodo;
	this._length++;
	return newNodo;
}

LinkedList.prototype.remove = function () {
	//Empezamos preguntado si la lista esta vacia
	var current = this.head;
	if(!current) return this.head;
	// vemos si la lista tiene un solo nodo
	if(current.next === null) {
		let node = current;
		this.head = null;
		return node.value;
	}
	// si la lista tiene mas de un elemento
	while(current.next.next) {
		// 5 -> 10 -> 25 -> null
		current = current.next;
	}
	var lastItem = current.next; // 25
	current.next = null; // Node {data: 10, next: null}
	return lastItem.value;
}

LinkedList.prototype.search = function(arg) {
	/*
	- search: recibe un parámetro y lo busca dentro de la lista, con una particularidad: 
	el parámetro puede ser un valor o un callback. En el primer caso, buscamos un nodo cuyo valor coincida con lo buscado;
	en el segundo, buscamos un nodo cuyo valor, al ser pasado como parámetro del callback, retorne true. 
	Ejemplo: 
	search(3) busca un nodo cuyo valor sea 3;
	search(isEven), donde isEven es una función que retorna true cuando recibe por parámetro un número par, 
	busca un nodo cuyo valor sea un número par.
	En caso de que la búsqueda no arroje resultados, search debe retornar null.
	*/
	//caso si no hay elementos en la lista
	if(this.head === null) return null;
	var current = this.head;
	while(current) {
		if(current.value === arg) return current.value;
		else if(typeof arg === 'function') {
			if(arg(current.value)) {
				return current.value;
			} 
		}
		current = current.next;
	}
	return null;
}

/*


Implementar la clase HashTable.

Nuetra tabla hash, internamente, consta de un arreglo de buckets (slots, contenedores, o casilleros; es decir, 
posiciones posibles para almacenar la información), donde guardaremos datos en formato clave-valor (por ejemplo, {instructora: 'Ani'}).
Para este ejercicio, la tabla debe tener 35 buckets (numBuckets = 35). 
(Luego de haber pasado todos los tests, a modo de ejercicio adicional, pueden modificar un poco la clase para que 
reciba la cantidad de buckets por parámetro al momento de ser instanciada.)

La clase debe tener los siguientes métodos:
  - hash: función hasheadora que determina en qué bucket se almacenará un dato. Recibe un input alfabético, 
  suma el código numérico de cada caracter del input (investigar el método charCodeAt de los strings) 
  y calcula el módulo de ese número total por la cantidad de buckets;
  de esta manera determina la posición de la tabla en la que se almacenará el dato.
  - set: recibe el conjunto clave valor (como dos parámetros distintos), hashea la clave invocando al método hash,
   y almacena todo el conjunto en el bucket correcto.
  - get: recibe una clave por parámetro, y busca el valor que le corresponde en el bucket correcto de la tabla.
  - hasKey: recibe una clave por parámetro y consulta si ya hay algo almacenado en la tabla con esa clave 
  (retorna un booleano).

Ejemplo: supongamos que quiero guardar {instructora: 'Ani'} en la tabla. Primero puedo chequear, con hasKey,
si ya hay algo en la tabla con el nombre 'instructora'; luego, invocando set('instructora', 'Ani'),
se almacenará el par clave-valor en un bucket específico (determinado al hashear la clave)
*/

function HashTable(value) {
	this.array = [];
	this.numBuckets = value || 35;
}

HashTable.prototype.hash = function(input) {
	var res = 0;
	for (let i = 0; i < input.length; i++) {
		res += input.charCodeAt(i)
	}
	return res % this.numBuckets;
};


HashTable.prototype.set = function(clave, valor) {
	// foo, bar1 y ofo, bar2
	if(typeof clave !== 'string') throw new TypeError('Keys must be strings')
	var key = this.hash(clave);
	var obj = {};
	obj[clave] = valor; // {foo: bar1} -> {ofo: bar2}
	if(typeof this.array[key] === 'object') {
		if(this.array[key].hasOwnProperty(clave)) {
			this.array[key] = obj;
		}
		let bar = this.array[key];
		this.array[key] = [];
		this.array[key].push(bar);
		this.array[key].push(obj);
		return;
	} 
	if(Array.isArray(this.array[key])){
		// Si es un array es porque hay varios obj
		for (let i = 0; i < this.array[key].length; i++) {
			if(this.array[key][i].hasOwnProperty(clave)){
				this.array[key][i] = obj;
			}	
		}
		this.array[key].push(obj);
	}
	this.array[key] = obj;	
};


HashTable.prototype.get = function(key) {
	let bar = this.hash(key);
	if(Array.isArray(this.array[bar])){
		for (let i = 0; i < this.array[bar].length; i++) {
			if(this.array[bar][i].hasOwnProperty(key)){
				return this.array[bar][i][key];
			}
		}
	}
	return this.array[bar][key];
};


HashTable.prototype.hasKey = function(key) {
	var bar = this.hash(key);
	// Caso en el que en ese buckets haya un array, tendriamos que recorrerlo
	// e ir evaluando si en cada objeto existe la clave que me pasan por input si esto es asi 
	// retornar true, caso contrario retornar false.
	if(Array.isArray(this.array[bar])){
		for (let i = 0; i < this.array[bar].length; i++) {
			if(this.array[bar][i].hasOwnProperty(key)){
				return true;
			}
		}
		return false;	
	}
	return this.array[bar].hasOwnProperty(key);	
};

// No modifiquen nada debajo de esta linea
// --------------------------------

module.exports = {
	Node,
	LinkedList,
	HashTable,
};
