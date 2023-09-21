export default undefined;
// Schritte:
//  - Mapped Type konkret für Person
//    - weitere Beispiele:
//      - Alle Keys werden optional
//      - Original-Typ kommt zurück oder null
//        - Erinnerung: index operator!
//  - für bel. Objekt (Generics)

// Eine fiktive JAVASCRIPT "Bibliothek"
// wie können wir die vernünftig mit Typen versehen?
declare function validateObject(object: any): any;

type Person = {
  firstname: "Klaus";
  age: number;
};

const person: Person = {
  firstname: "Klaus",
  age: 32,
};

const result = validateObject(person);
//       result: { firstname: true / false, age: true / false}
