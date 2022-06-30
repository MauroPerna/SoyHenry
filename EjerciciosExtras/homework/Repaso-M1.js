const {
    Queue,
    Node,
    LinkedList,
    BinarySearchTree
} = require('./DS.js')

// Implementar la función countArray: a partir de un array en el cual cada posición puede ser un único
// número u otro array anidado de números, determinar la suma de todos los números contenidos en el array.
// El array será recibido por parámetro.
// Ejemplo:
//    const array = [1, [2, [3,4]], [5,6], 7];
//    countArray(array); --> Debería devolver 28 (1 + 2 + 3 + 4 + 5 + 6 + 7)
// Pista: utilizar el método Array.isArray() para determinar si algun elemento de array es un array anidado
// [Para más información del método: https://developer.mozilla.org/es/docs/Web/JavaScript/Referencia/Objetos_globales/Array/isArray]

var countArray = function(array) {
    // Tu código aca:
    // primero necesito recorrer el array.
    // luego si el elemento es un array necesito meterme adentro y recorrer ese subarreglo
    // si dentro de ese subarreglo hay otro array necesito meterme dentro y recorrerlo para obtener el resultado.
    var resultado = array.reduce((previousValue, currentValue) => {
        if(typeof previousValue === 'number' && typeof currentValue === 'number') {
            return previousValue + currentValue}
        if(Array.isArray(previousValue) || Array.isArray(currentValue)) {
            if(Array.isArray(previousValue) && Array.isArray(currentValue)) {
                return countArray(previousValue) + countArray(currentValue);
            }
            if(Array.isArray(previousValue)) {
                return countArray(previousValue) + currentValue;
            }
            if(Array.isArray(currentValue)) {
                return previousValue + countArray(currentValue);
            }
        }
    });
    return resultado;
}


// Implementar la función countProps: a partir de un objeto en el cual cada propiedad puede contener
// cualquier tipo de dato, determinar la cantidad de propiedades de objetos en cualquier nivel, ya sea el inicial
// u objetos anidados
// Ejemplo:
// var obj = {
//   a: {
//     a1: 10,
//     a2: 'Franco',
//     a3: {f: 'r', a: 'n', c: {o: true}}
//   },
//   b: 2,
//   c: [1, {a: 1}, 'Franco']
// }
// countProps(obj)--> Deberia devolver 10 ya que el objeto inicial tiene 3 propiedades, pero a su vez
// dentro de a tenemos 3 propiedades mas, luego a3 tiene otras 3 y por ultimo c tiene una extra.
// Propiedades: a, a1, a2, a3, f, a, c, o, b, c --> 10 en total

var countProps = function(obj) {
    // Tu código aca:
    var qProps = 0;
    Object.keys(obj).forEach((key) => {
        if(typeof obj[key] === 'object') {
            if(Array.isArray(obj[key])) {
                // si el value del una propiedad es un array necesitamos recorrer el array para saber si
                // adentro hay otro objeto.
                for (let i = 0; i < obj[key].length; i++) {
                    if(typeof obj[key][i] === 'object') {
                        qProps += countProps(obj[key][i]);
                    }
                }
            }
            if(!Array.isArray(obj[key])){ 
                qProps += countProps(obj[key]);
            }
        }
        qProps++;
    });
    return qProps;

}


// Implementar el método changeNotNumbers dentro del prototype de LinkedList que deberá cambiar
// aquellos valores que no puedan castearse a numeros por 'Kiricocho' y devolver la cantidad de cambios que hizo
// Aclaracion: si el valor del nodo puede castearse a número NO hay que reemplazarlo
// Ejemplo 1:
//    Suponiendo que la lista actual es: Head --> [1] --> ['2'] --> [false] --> ['Franco']
//    lista.changeNotNumbers();
//    Ahora la lista quedaría: Head --> [1] --> ['2'] --> [false] --> ['Kirikocho] y la función debería haber devuelto el valor 1

LinkedList.prototype.changeNotNumbers = function(){
    // Tu código aca:
    // la funcion isNaN intenta convertir el parámetro pasado a un número. 
    // Si el parámetro no se puede convertir, devuelve true; en caso contrario, devuelve false.
    //['uno'] -> ['2'] -> ['3'] -> ['cuatro'] -> ['cinco']
    var contador = 0;
    var nodoActual = this.head;
    while(nodoActual === null) return null;
    while(nodoActual) {
        if(isNaN(nodoActual.value)) {
            nodoActual.value = 'Kiricocho';
            contador++;
        }
        nodoActual = nodoActual.next;
    }

    return contador;
}


// Implementar la función mergeQueues que a partir de dos queues recibidas por parametro
// debe devolver una nueva Queue que vaya mergeando los nodos de las anteriores.
// Ejemplo:
// - queueOne: [7,3,5]
// - queueTwo: [2,4,6]
// mergeQueues(queueOne, queueTwo) --> [7,2,3,4,5,6]
// IMPORTANTE: NO son arreglos sino que son Queues.

var mergeQueues = function(queueOne, queueTwo) {
    // Tu código aca:
    // queueOne = [1, 3, 5, 7, 9]
    // queueTwo = [2, 4, 6]
    var newQueue = new Queue();
    
    newQueue.enqueue(queueOne.dequeue());
    newQueue.enqueue(queueTwo.dequeue());
    while(queueOne.size() || queueTwo.size()) {
        if(queueOne.size()) newQueue.enqueue(queueOne.dequeue());
        if(queueTwo.size()) newQueue.enqueue(queueTwo.dequeue());
    }

    return newQueue;
}

// var q1 = new Queue();
// q1.enqueue(1);
// q1.enqueue(3);
// q1.enqueue(5);
// q1.enqueue(7);
// q1.enqueue(9);
// console.log(q1);
// var q2 = new Queue();
// q2.enqueue(2);
// q2.enqueue(4);
// q2.enqueue(6);
// console.log(q1);
// console.log(mergeQueues(q1, q2));


// Implementar la funcion closureMult que permita generar nuevas funciones que representen
// las tablas de multiplicación de distintos numeros
// Ejemplo: 
// - var multByFour = closureMult(4);
// - multByFour(2) --> 8 (2 * 4)
// - multByFour(5) --> 20
// - var multBySix = closureMult(6);
// - multBySix(4) --> 24

var closureMult = function(multiplier) {
    // Tu código aca:
    return function(num) {
        var resultado = multiplier * num;
        return resultado;
    }
}

// Implementar el método sum dentro del prototype de BinarySearchTree
// que debe retornar la suma total de los valores dentro de cada nodo del arbol
BinarySearchTree.prototype.sum = function(result = 0, array = []) {
    // Tu código aca:
    result += this.value;
    if(this.left !== null) array.push(this.left);
	if(this.right !== null) array.push(this.right);
    if(array.length > 0) return array.shift().sum(result, array);
    return result;
}

var bst = new BinarySearchTree(15);
bst.insert(10);
bst.insert(17);
bst.insert(5);
bst.insert(7);
bst.insert(3);
bst.insert(25);
console.log(bst.sum());

module.exports = {
    countArray,
    countProps,
    mergeQueues,
    closureMult
}