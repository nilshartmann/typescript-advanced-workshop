export default undefined;

// Use-Case: Umbenennen von Keys
//  - Keys sind Typen
//  - wir können bzw. müssen auf anderen Typen casten!
//  - außerdem müssen wir `& string` verwenden
//     (aus Gründen, Erläuterung überspringen, Verweis auf Slides)
//

type SetterObject<O extends object> = {
  // "& string" sorgt dafür, dass alle Keys, die nicht vom Typ 'string' sind, rausgefiltert werden
  // 'as' ist ein Typecast und castet den ursprünglichen Typen des Keys ('lastname', 'age')
  // auf einen neuen Typen
  [Key in keyof O & string as `set${Capitalize<Key>}`]: (
    newValue: O[Key]
  ) => void;
};

function createSetter<O extends object>(o: O): SetterObject<O> {
  // Implementierung egal
  return null as any;
}

const setters = createSetter({ firstname: "klaus", age: 32 });
// Ändern des Vornamens:
setters.setFirstname("Moni"); // OK
setters.setAge(33); // OK
setters.firstname("Moni"); // ERR
