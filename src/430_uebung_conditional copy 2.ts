export default undefined;

// * Erweitere die `validate`-Funktion
//   - Wenn der Typ einer Eigenschaft im Original-Objekt eine *Funktion* ist, soll deren Rückgabe-Typ
//     (oder null) im `ValidatedObject` auftauchen
//   - Fachlicher Idee:
//      - beim Validieren des Objektes werden daran enthaltenen Funktionen ausgeführt und dann deren
//        Rückgabetyp validiert (anstatt die Funktion selbst zu validieren)

// AUSGANGSPUNKT (kennst Du aus letzer Übung):
type ValidationResult<O> = {
  readonly [K in keyof O]: boolean;
};

// Typ für eine Validator Callback-Funktion
type ValidatorFunction<V> = (value: V) => boolean;
type ValidatorFunctionWithFunction<V> = V extends (...args: any) => infer A
  ? (value: A) => boolean
  : (value: V) => boolean;

type ExcludeVoidFunction<
  O extends object,
  Key extends keyof O
> = O[Key] extends (...args: any) => infer A
  ? A extends void
    ? never
    : Key
  : Key;

type ValidatorObject<O extends object> = {
  readonly [K in keyof O as ExcludeVoidFunction<
    O,
    K
  >]: ValidatorFunctionWithFunction<O[K]>;
};

declare function validate<O extends object>(
  anObject: O,
  validators: ValidatorObject<O>
): ValidationResult<O>;

// AUFGABE:
//
//  - Du musst den ValidatorFunction-Typen anpassen!
//     - Dieser nimmer in der jetzigen Version einen Typen entgegen
//       und erzeugt eine Funktion, die diesen Typen zurückliefert
//     - Du musst nun prüfen, ob dieser Typ (V) selbst eine FUNKTION ist
//       - Falls ja: deren Rückgabe-Typ(!) soll der Rückgabetyp der
//         Validierungsfunktion sein!

const person = {
  firstname: "Mo",
  address() {
    // Funktion, die string zurückgibt!
    return "Hamburg";
  },
};

const result = validate(
  // 1. Parameter: Objekt, das validiert werden soll:
  person,
  // 2. Parameter: Objekt mit Validierungsfunktionen:
  {
    firstname(s) {
      // OK: s soll korrekt als 'string' abgeleitet werden
      return s.length > 3;
    },
    address(a) {
      // a soll hier 'string' sein!
      return a.toUpperCase() === "HAMBURG";
    },
    fasdfasdf() {
      return true;
    },
  } satisfies ValidatorObject<typeof person>
);
