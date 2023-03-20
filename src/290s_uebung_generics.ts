export default undefined;

/*
* Beschreibe eine typsichere `createSetter`-Funktion. 
* Die Funktion soll eine fiktive Setter-Funktion für ein Property eines beliebigen Objektes zurückliefern.
* Fachliche Idee: 
  - in der Setter-Funktion können z.B. Überprüfungen durchgeführt werden 
  - oder die Setter-Funktion könnte den Wert in eine DB schreiben
  - oder das Setzen des Wertes loggen o.ä.
 
* Die Funktion soll zwei Parameter haben:
  1. Ein beliebiges Objekt (`someObject`), 
  2. Den Namen eines Keys aus dem Objekt (`aKey`)

* Der Rückgabe-Typ soll eine Funktion sein, die ihrerseits ein Argument hat, das vom Typ des Properties aus dem übergebenen
  Objekt (`someObject`) ist, so dass diese Funktion aufgerufen werden kann, um den Wert des Objektes zu setzen. 

* In JavaScript sähe das so aus:
    function createSetter(someObject, aKey) { ... } 

    const ageSetter = createSetter({firstname: "Klaus", age: 32}, "firstname");
    ageSetter(33); 

* In TypeScript sollten dann folgende Beispiele funktionieren bzw. einen Fehler auslösen:
  const person = { firstname: "Klaus", age: 32 }

  createSetter(person, "firstname")("newFirstName"); // OK
  createSetter(person, "xxx")("newFirstName"); // Argument of type '"xxx"' is not assignable to parameter of type '"firstname" | "age"
  createSetter(person, "age")(33); // OK
  createSetter(person, "age")("33"); // ERR // Argument of type 'string' is not assignable to parameter of type 'number'
  createSetter("Klaus", "klaus"); // Argument of type 'string' is not assignable to parameter of type 'object'
  
*/

declare function createSetter<O extends object, K extends keyof O>(
  someObject: O,
  aKey: K
): (newValue: O[K]) => void;

// Identisch, nur mit explizitem Typen für die Setter-Funktion:
type SetterFn<Value> = (newValue: Value) => void;

declare function createSetter<O extends object, K extends keyof O>(
  someObject: O,
  aKey: K
): SetterFn<O[K]>;

// Mit spezialisiertem Typ für die Setter-Funktion:
type ObjectSetterFn<O extends object, K extends keyof O> = (
  newValue: O[K]
) => void;

declare function createSetter<O extends object, K extends keyof O>(
  someObject: O,
  aKey: K
): ObjectSetterFn<O, K>;
