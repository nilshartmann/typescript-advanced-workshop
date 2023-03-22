export default undefined;

// Use-Case: Umbenennen von Keys
//  - Keys sind Typen
//  - wir können bzw. müssen auf anderen Typen casten!
//  - außerdem müssen wir `& string` verwenden
//     (aus Gründen, Erläuterung überspringen, Verweis auf Slides)
//
//  - Übung 690

type SetterObject<O extends object> = {
  [Key in keyof O]: (newValue: O[Key]) => void;
};

function createSetter<O extends object>(o: O): SetterObject<O> {
  // Implementierung egal
  return null as any;
}

const setters = createSetter({ firstname: "klaus", age: 32 });
// Ändern des Vornamens soll über 'setFirstname' gehen:
setters.firstname("Moni"); // OK
setters.age(33); // OK
setters.firstname("Moni"); // ERR
