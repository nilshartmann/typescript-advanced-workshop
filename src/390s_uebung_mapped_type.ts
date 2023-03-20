export default undefined;

// Eine weitere Variante der validate Funktion:
// - Der Aufrufer der validate-Funktion muss nun auch ein Objekt mit Validierungsregeln
//   übergeben.
//
// - Dazu soll `validate`-Funktion als zweiten Parameter ein Objekt entgegen nehmen:
//    - Darin enthalten sind Callback-Funktionen (`ValidatorFn`),
//      in denen jeweils die Validierungsregel für ein Property implementiert sind,
//    - Die Callback-Funktionen liefern jeweils true/false zurück
// - Das Ergebnis ist das Objekt aus unserem ersten Beispiel:
//     ein Objekt, das alle Keys aus dem übergebenen Objekt hat,
//     deren Typen sind aber jeweils "boolean"

type ValidationResult<O> = {
  readonly [K in keyof O]: boolean;
};
// Typ für eine Validator Callback-Funktion
type ValidatorFunction<V> = (value: V) => boolean;

type ValidatorObject<O extends object> = {
  readonly [K in keyof O]: ValidatorFunction<O[K]>;
};

declare function validate<O extends object>(
  anObject: O,
  validators: ValidatorObject<O>
): ValidationResult<O>;

const result = validate(
  // 1. Parameter: Objekt, das validiert werden soll:
  { firstname: "Mo", age: 32, address: "Hamburg" },
  // 2. Parameter: Objekt mit Validierungsfunktionen:
  {
    firstname(s) {
      // OK: s soll korrekt als 'string' abgeleitet werden
      return s.length > 3;
    },
    age(a) {
      // OK: a soll korrekt als 'number' abgeleitet werden
      return a > 0;
    },
    lastname(s) {
      // ERR: soll in TS verboten sein, weil 'person' kein 'lastname' hat,
      //      Dieser Fehler wird von TS erst angezeigt, wenn, 'address'
      //      unten einen boolean zurückliefert!
      return true;
    },
    address(a) {
      // ERR: soll in TS verboten sein, weil address null zurückgibt, aber nur boolean erlaubt ist
      return null;
    },
  }
);

// result: { firstname: boolean, age: boolean }

// nur zum Prüfen, dass TS Typen korrekt sind
const firstNameResult: boolean = result.firstname; // OK
const ageResult: boolean = result.age; // OK
const invalidAgeResult: string = result.age; // ERR: Type 'boolean' is not assignable to type 'string'
const unknownReuslt: boolean = result.lastname; // ERR: Property 'lastname' does not exist on type 'ValidationResult'

// Du musst also:
//  1. Den Mapped-Type für das Ergebnis schreiben (ValidationResult)
//    (alle Keys aus O, aber als "boolean")

//  2. Einen Typen für das Objekt mit den Validator-Funktionen (ValidatorObject)
//     - Alle Keys aus O
//     - Werte aber jeweils vom Typ der Validierungsfunktion:
//       - 1. Parameter Typ aus dem Objekt O
//            - Beispiel: Wenn im Objekt für den Key 'lastname' ein 'string' übergeben wird,
//              soll die passende Funktion als 1. Parameter einen 'string' haben,
//            - Beispiel: Wenn im Objekt für den Key 'age' ein 'number' übergeben wird,
//              soll die passende Funktion als 1. Parameter einen 'number' haben,
//            - Du kannst im ersten Schritt für den ersten Parameter auch erstmal 'any'
//              zulassen und diesen dann später konkretisieren
//       - Rückgabe: immer boolean
//
// Wenn Du die Typen korrekt gesetzt hast, sollte der Code wie oben beschrieben
//  funktionieren bzw. nicht funktionieren (OK bzw. ERR)
