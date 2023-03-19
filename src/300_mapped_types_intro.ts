export default undefined;
// Schritte:
//  - Mapped Type konkret für Person
//    - weitere Beispiele:
//      - optional
//      - Original-Typ! oder null
//        - Erinnerung: index operator!
//  - für bel. Objekt (Generics)

// Eine fiktive JAVASCRIPT "Bibliothek"
// wie können wir die vernünftig mit Typen versehen?
function validateObject(object) {
  if (object == null || typeof object !== "object") {
    throw new Error("invalid type");
  }

  function validateField(value: any) {
    // Validierungslogik...
    // (da kümmern wir uns später drum!)
    return true; // oder false
  }

  const result = {};
  Object.keys(object).forEach((k) => {
    result[k] = validateField(object[k]);
  });
  return result;
}

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
