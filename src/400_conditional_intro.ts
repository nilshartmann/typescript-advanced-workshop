export default undefined;

// - Beispiel 1: getLength

// - Union Type mit Condiational: NumberOrNull
//   -  type NumberOrNull<O> = O extends string ? number : null;
//       NumberOrNull<string|boolean>

// - exkurs: Union Type mit "never"

// - Conditional mit never ("ensureNotNull"):
//   - NotNull
//   - Funktion mit NotNull als Rückgabetyp

// - Conditional mit Inference
//    declare function check<O>(o: O): O;
//    check( () => 123 ); // Rückgabetyp soll number sein
//    check( () => "Hallo" ); // Rückgabetyp soll string sein
//    - Exkurs: Warum ist Rückgabewert 123 bzw "hallo" und nicht number/string

// - Vorbereitung für Übung: (nur vielleicht)
//   - Keys Filtern aus einem Objekt


declare function readFromDatabase