// TypeScript "Extreme" Workshop auf der Web Developer Conference,
//   Hamburg, September 2023
//
// Validierung von JS-Objekten zur Laufzeit und Typsicherheit
//   zur Build-Zeit: https://zod.dev/
//
// Zum Testen von TS Typen gibt es mehrere Bibliotheken, z.B.
//  https://github.com/garronej/tsafe
//  https://vitest.dev/guide/testing-types.html
//
// Meine "Mini-Bibliothek" zum Testen von Typen findest Du in
//   src/999_test.ts

declare function tt(m: keyof typeof messages): void;

type Person = { name: string; address: { city: string }; age: 32 };

type PropertyNamesOfPerson = keyof Person & string;
//

declare function saveToDatabase<T>(a: T): T;

const m = {
  title: "...",
  laufzeit: 90,
  firstname(firstname: string) {
    return 123;
  },
  age(a: number) {
    return 123;
  },
  1: "eins",
};

type ValidatedObject<T extends object> = {
  [K in keyof T]: T[K] | null;
};

type Flatten<O, T extends keyof O = keyof O> = {
  [P in T]: O[P];
} & {};

// type Movie = {
//   title: string,
//   laufzeit: number,
//   firstname(firstname: string): number
// };

// type MovieProxy = {
//   title(newValue: string): void,
//   laufzeit(newValue: number): void
// }

declare function getSize<V extends string | null>(
  v: V
): V extends string ? number : null;

const r1 = getSize("abc");
const r2 = getSize(null);

type SetterFunction<O> = (newValue: O) => void;

type SetterFunctionName<X> = X extends string ? `set${Capitalize<X>}` : never;

type ProxyObject<T extends object> = {
  [K in keyof T as SetterFunctionName<K>]: T[K] extends (a: infer A) => any
    ? (newValue: A) => void
    : SetterFunction<T[K]>;
} & {};

type BorderOrText = "border" | "text";
type Color = "red" | "green";
// border: red
// text: green
declare function setCssColor(x: `${BorderOrText}: ${Color}`): void;

// type MakeFirstCharacterUpperCase<X extends string> =
//   X extends `a${infer REST}` ? `A${REST}` :
//   X extends `b${infer REST}` ? `B${REST}`: X

type xxx = Capitalize<"bbc">;

// firstname = setFirstname

type Firstname = "firstname";

type FirstnameSetter = SetterFunctionName<Firstname>;

declare function createProxy<O extends object>(o: O): ProxyObject<O>;
const vt = createProxy(m);
const ll = createProxy(m);

declare function getPropertyFromPerson<O extends object, K extends keyof O>(
  p: O,
  propertyName: K
): O[K];

const t = getPropertyFromPerson(m, "title");
const l = getPropertyFromPerson(m, "laufzeit");
getPropertyFromPerson(666, "");

const p: any = {};

getPropertyFromPerson(p, "address");
