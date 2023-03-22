import { compareType } from "./999_test";

export default undefined;

// * ÜBUNG 1: Modifiziere den Typ von 'ValidatorObjekt':
//
//    - die Keys in dem Objekt, unter dem die Validierungsfunktionen abgelegt sind,
//       sollen jetzt "validateKey" (validate + camelCase key-Name heißen):
//         object: { lastname: "Meier "},
//         validatorObject: { validateLastname(s: string) { return true } }
//
// * ÜBUNG 2, OPTIONAL, wenn wir noch Zeit haben:
//   kannst das keyof-Statement so umbauen, dass Keys, die auf eine void-Funktion zeigen,
//     NICHT im ValidatorObject auftauchen? 🤯
//     (Fachliche Motivation: unsere ausgedachte 'validate'-Funktion kann mit void-Funktionen
//     nichts anfangen, weil es keinen Wert zu validieren gibt)
//      - Beispiel:
//         - anObject = { lastname: "Klaus", sayHello() { /* void Funktion! */ }
//         - validator = { validateLastname(n) { /* ... /} , /* KEIN Eintrag für sayHello */}
//
//     Um zu prüfen, ob ein Typ einer void-Funktion entspricht, kannst Du den IsVoidFunction-Typ
//      verwenden.
//
//      - Wenn Du dem Typen eine void-Funktion übergibst liefert sie 'true' zurück, sonst 'false':
//        type Ja = IsVoidFunction<() => {}>; // true
//        type Nein = IsVoidFunction<string>; // false
//
//      - Diesem Typen musst Du den passenden Eintrag zu einem Key aus dem zu validieren Objekt
//        ('anObject') übergeben
//
//      - IsVoidFunction müsste also 'lastname' (bzw. string) und 'sayHello' (Function) überrpüfen
//      - Bei der Verwendung des keyof-Operators muss dass dann mit einem conditional type überprüfen
//      - Wenn IsVoidFunction 'true' zurückliefert, musst Du statt des keys 'never' zurückgeben:
//      -  IsVoidFunction<????> extends true ? never : validateKeyname

// AUSGANGSPUNKT (kennst Du aus letzer Übung):
type ValidationResult<O> = {
  readonly [K in keyof O]: boolean;
};

type IsVoidFunction<F> = F extends (...args: any) => infer A
  ? A extends void
    ? true
    : false
  : false;

// Typ für eine Validator Callback-Funktion
type ValidatorFunctionWithFunction<V> = V extends (...args: any) => infer A
  ? (value: A) => boolean
  : (value: V) => boolean;

// ==========v Hier soll der Key "umbenannt" werden!
type ValidatorObject<O extends object> = {
  readonly [K in keyof O]: ValidatorFunctionWithFunction<O[K]>;
};

declare function validate<O extends object>(
  anObject: O,
  validators: ValidatorObject<O>
): ValidationResult<O>;

const person = {
  firstname: "Klaus",
  age: 32,
  setLastname(s: string): void {
    /* ... */
  },
};

const personValidator: ValidatorObject<typeof person> = {
  validateAge(a) {
    // Das soll funktionieren/compilieren!
    return a > 0;
  },
  validateFirstname(f) {
    // Das soll funktionieren/compilieren!
    return f.length > 3;
  },
  validateSetLastname(s) {
    // MIT Ausschluss der void-Funktion muss es hier einen Fehler geben!
    return false;
  },
};

validate(person, personValidator);
