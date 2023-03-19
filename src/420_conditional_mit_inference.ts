export default undefined;

declare function check<O>(o: O): O;

check(() => 123); // Rückgabetyp von 'check' soll number sein
check(() => "Hallo"); // Rückgabetyp von 'check'  soll string sein

declare function check2<O>(o: O): O extends (...args: any) => infer A ? A : O;

const a = check2(() => 123);
//    ^?
const b = check2(() => "Hallo");
//    ^?

// Warum ist a 123 und b 'Hallo' (und nicht number und string)?

// Ermitteln von Argumenten einer Funktion:
type FirstArg<O> = O extends (a: infer A, ...args: any) => any ? A : never;

// Ermitteln des Types eines Arrays:
type TypeOfArray<A> = A extends (infer A)[] ? A : never;

type T1 = TypeOfArray<string[]>; // string
type T2 = TypeOfArray<string>; // never

// Für typische Anforderungen gibt es bereits fertige _Utility Typen_, z.B.:
// * [Awaited](https://www.typescriptlang.org/docs/handbook/utility-types.html#awaitedtype): Liefert Typ von Promises zurück
// * [ReturnType](https://www.typescriptlang.org/docs/handbook/utility-types.html#returntypetype): Rückgabe-Typ einer Methode
// * [InstanceType](https://www.typescriptlang.org/docs/handbook/utility-types.html#instancetypetype): Typ der Instanz einer Klasse
