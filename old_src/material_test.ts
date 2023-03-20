import { compareType } from "../src/999_test";

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
// type ValidatorFunction<V> = (value: V) => boolean;
type ValidatorFunctionWithFunction<V> = V extends (...args: any) => infer A
  ? (value: A) => boolean
  : (value: V) => boolean;

type ValidatorObject<O extends object> = {
  readonly [K in keyof O]: ValidatorFunctionWithFunction<O[K]>;
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

const result = validate(
  // 1. Parameter: Objekt, das validiert werden soll:
  {
    firstname: "Mo",
    address() {
      // Funktion, die string zurückgibt!
      return "Hamburg";
    },
  },
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
  }
);

// Ausblick: für das nächste fachliche Feature brauchen wir einen generischen Typen
//   mit einem Typ-Parameter. Der Typ soll zurückliefern:
//     - wenn der Typ eine übergebene Funktion ist:
//       - ...und deren Rückgabe-Typ "void" ist: never
//       - ansonsten deren Rückgabetyp
//     - in allen anderen Fällen den übergebenen Typen
// Probiere, ob du diesen Typen bauen kannst (statt "any"),
// so dass die darauffolgenden Zeilen sich korrekt verhalten:

// type ExcludeVoidFunction<F> = any;
type ExcludeVoidFunction<F> = F extends (...args: any) => infer A
  ? A extends void
    ? never
    : A
  : F;

declare function setValue(): void;
declare function getValue(): number;

declare function type<T>(t?: T): T;
// type Expectation<T> = {
//   toBe<X extends T>(x?: X): void
// }

type ToBe<T, Y, Z = Check<T, Y>> = Z extends false
  ? {}
  : {
      equal(): void;
    };

type Expectation<T> = {
  andType<Y>(y?: Y): ToBe<T, Y>;
};

declare function expect<T>(t: T): Expectation<T>;

type Check<A, B> = [A] extends [B] ? ([B] extends [A] ? A : false) : false;

type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

expect(type("")).andType(null).equal();
expect(type("")).toBe("");
expect(type("")).toBe("");
expect(type("")).toBe(type<string>());
expect(type(null)).toBe<null>();
expect(type<never>()).toBe<never>();
expect(type<string>()).toBe<never>();
