
# Homework JavaScript Avanzado I

## Scope & Hoisting

Determiná que será impreso en la consola, sin ejecutar el código.

> Investiga cuál es la diferencia entre declarar una variable con `var` y directamente asignarle un valor.

```javascript
x = 1; // 1
var a = 5;
var b = 10;
var c = function(a, b, c) {
  var x = 10;
  console.log(x); // 10
  console.log(a); // 8
  var f = function(a, b, c) {
    b = a; // b = 8
    console.log(b); // 8 
    b = c; // b = 10
    var x = 5;
  }
  f(a,b,c);
  console.log(b);
}
c(8,9,10);
console.log(b); // 10
console.log(x); // 1
```

```javascript
console.log(bar); // undefined
console.log(baz); // error
foo(); // Hola!
function foo() { console.log('Hola!'); }
var bar = 1;
baz = 2;
```

```javascript
var instructor = "Tony";
if(true) {
    var instructor = "Franco"; // el if tiene su propio scope pero no su propio contexto de ejecucion
                               // el otro problema es que uso var y no let por lo tanto la variable instructors
                               // adentro del if es global. si hubiese sido let el resultado seria "Tony"
}
console.log(instructor); // Franco
```

```javascript
var instructor = "Tony";
console.log(instructor); // Tony
(function() {
   if(true) {
      var instructor = "Franco";
      console.log(instructor);
   }
})(); // Franco
console.log(instructor); // Tony
```

```javascript
var instructor = "Tony";
let pm = "Franco";
if (true) {
    var instructor = "The Flash";
    let pm = "Reverse Flash";
    console.log(instructor); // The Flash
    console.log(pm); // Reverse Flash
}
console.log(instructor); // The Flash
console.log(pm); // Franco
```
### Coerción de Datos

¿Cuál crees que será el resultado de la ejecución de estas operaciones?:

```javascript
6 / "3" // 2
"2" * "3" // 6
4 + 5 + "px" // "9px"
"$" + 4 + 5  // "$45"
"4" - 2 // 2
"4px" - 2 // NaN
7 / 0 // Infinity
{}[0] // [0]
parseInt("09") // 9
5 && 2 // 2
2 && 5 // 2
5 || 0 // 5
0 || 5 // 5
[3]+[3]-[10] // 23
3>2>1 // false
[] == ![] // true
```

> Si te quedó alguna duda repasá con [este artículo](http://javascript.info/tutorial/object-conversion).


### Hoisting

¿Cuál es el output o salida en consola luego de ejecutar este código? Explicar por qué:

```javascript
function test() {
   console.log(a); // undefined
   console.log(foo()); // 2

   var a = 1;
   function foo() {
      return 2;
   }
}

test();
```

Y el de este código? :

```javascript
var snack = 'Meow Mix';

function getFood(food) {
    if (food) {
        var snack = 'Friskies';
        return snack;
    }
    return snack; 
}

getFood(false); // en realidad no devuelve nada pero si hacemos un console.log(getFood(false)) = undefined
                // esto ocurre porque si bien el if tiene su propio scope no tiene su propio contexto de
                // ejecucion por lo tanto, cuando dentro del if se declara var snack el hoisting reconoce la
                // declaracion de la variable y dado que la funcion getFood tiene su propio contexto de ejecucion 
                // cuando return snack hace referencia a la variable declarada dentro del if.
```


### This

¿Cuál es el output o salida en consola luego de ejecutar esté código? Explicar por qué:

```javascript
var fullname = 'Juan Perez';
var obj = {
   fullname: 'Natalia Nerea',
   prop: {
      fullname: 'Aurelio De Rosa',
      getFullname: function() {
         return this.fullname; // Aurelio De Rosa
      }
   }
};

console.log(obj.prop.getFullname()); // Aurelio De Rosa

var test = obj.prop.getFullname; // se guarda una instancia de la funcion getFullname dentro de la variable test

console.log(test()); // Juan Perez
                     // cuando ejecuto test() es como si ejecutara la funcion en el contexto global, por lo tanto el
                     // el this hace referencia al entorno global y toma fullname como "Juan Perez"
```

### Event loop

Considerando el siguiente código, ¿Cuál sería el orden en el que se muestra por consola? ¿Por qué?

```javascript
function printing() {
   console.log(1); // 1
   setTimeout(function() { console.log(2); }, 1000); // 2
   setTimeout(function() { console.log(3); }, 0); // 3
   console.log(4); // 4
}

printing(); // 1, 4, 3, 2
```
