export default undefined;

declare function validateAny(obj: any): any;
const a1 = validateAny("hallo"); // p soll string sein (ist: any 😔)
const a2 = validateAny(123); // n soll number sein (ist: any 😔)
a2.toUpperCase(); // Kein compile-Fehler, weil any

// Mit generic
// "O" ist Typ Variable
declare function validate<O>(o: O): O;
const p = validate("hallo"); // p jetzt string 😊
const n = validate(123); // n jetzt number 😊
n.toUpperCase(); // ERR!

// ------------------------------------------------------------------------
// Default Variablen
// ------------------------------------------------------------------------
type Tuple<X, Y = string> = [X, Y];

type TupleOfNumberAndStrings = Tuple<number>; // [number, string]
type TupleOfStringAndBoolean = Tuple<string, boolean>; // [string, boolean]

//
type ReactUseStateTuple<V> = Tuple<V, (newValue: V) => void>;
// [ V, function(a: V): void ]

// ------------------------------------------------------------------------
// Constraints
// ------------------------------------------------------------------------
// Beliebiges Objekt zulässig
declare function validateObject<O extends object>(o: O): O | null;

validateObject({ name: "Klaus" }); // OK
validateObject("Klaus"); // ERR: Argument of type 'string' is not
// assignable to parameter of type 'object'

// Beispiel: nur Objekte mit bestimmter Struktur erlaubt
type Person = { firstname: string | null };

declare function getOrDefault<P extends Person>(p: P): P;

getOrDefault({}); // ERR: Property 'firstname' is missing in type '{}'
// but required in type 'Person'

// ------------------------------------------------------------------------
// Union Types
// ------------------------------------------------------------------------
type Color = "red" | "blue" | "green";

declare function bgColor<C extends Color>(c: Color): { backgroundColor: C };

bgColor("red"); // OK
bgColor("white"); // Argument of type '"white"' is not
// assignable to parameter of type 'Color'

// Liste
type ListOfStringsOrBooleans<X extends string | boolean> = Array<X>;

const c1: ListOfStringsOrBooleans<string> = ["a"]; // Ok
const c2: ListOfStringsOrBooleans<boolean> = [true]; // Ok
const c3: ListOfStringsOrBooleans<string | boolean> = [true, "jo!"]; // Ok

const c4: ListOfStringsOrBooleans<number> = [4]; // ERR Type 'number' does not satisfy
// the constraint 'string | boolean'

declare function validateNumberOrString<O extends string | number>(
  o: O
): O | null;
