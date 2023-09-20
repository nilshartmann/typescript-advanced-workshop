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
  2. Den Namen eines Keys aus dem Objekt (`aKey`). Alle anderen Strings sind verboten.
     Kleiner Tipp: Du musst 'keyof' verwenden :-)

* Der Rückgabe-Typ soll eine Funktion sein, die ihrerseits ein Argument hat, das vom Typ des Properties aus dem übergebenen
  Objekt (`someObject`) ist, so dass diese Funktion aufgerufen werden kann, um den Wert des Objektes zu setzen. 
  - Tipp: hier musst Du mit dem 'index access'-Operator' arbeiten...

* In JavaScript sähe das so aus:
    function createSetter(someObject, aKey) { ... } 

    const ageSetter = createSetter({firstname: "Klaus", age: 32}, "firstname");
    ageSetter(33); 

* In TypeScript sollten dann folgende Beispiele funktionieren bzw. einen Fehler auslösen:
  const person = { firstname: "Klaus", age: 32 }

  createSetter(person, "firstname")("newFirstName"); // 'firstname' gibt an 'person', und "newFirstName" ist korrekter Typ (string)
  createSetter(person, "xxx")("newFirstName"); // ERR: "xxx" gibt es nicht an 'person'
  createSetter(person, "age")(33); // OK, 'age' gibt es an 'person' und 33 ist korrekter Typ (number)
  createSetter(person, "age")("33"); // ERR 'age' gibt es an 'person', aber "33" (string) ist falscher Typ
  createSetter("Klaus", "klaus"); // Error: erster Parameter "Klaus" ist kein Objekt

*/
