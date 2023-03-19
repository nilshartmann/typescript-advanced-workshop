export default undefined;

type NumberOrNull<O> = O extends string ? number : null;

type S = NumberOrNull<"huhu">; // N = number
type N = NumberOrNull<123>; // N = null
type A = NumberOrNull<true>; // A = null
type IsPerson<O> = O extends { firstname: string; lastname: string }
  ? true
  : false;

// Rekursive Aufrufe
type NumberOrStringOrNull<O> = O extends string
  ? number
  : O extends boolean
  ? string
  : null;

type T1 = NumberOrStringOrNull<"huhu">; // T1 = string
type T2 = NumberOrStringOrNull<123>; // T2 = null
type T3 = NumberOrStringOrNull<true>; // T3 = string

// getLength mit Conditionals:
declare function getLength<O extends string | null>(
  s: O
): O extends string ? number : null;

const a = getLength("123"); // a: number
//    ^?
const b = getLength(null); // b: null
//    ^?

// getLenth, 2. Variante
type IfThenElse<Current, I, T, E> = Current extends I ? T : E;

declare function getLength<O extends string | null>(
  s: O
): IfThenElse<O, string, number, null>;

// -----------------------------------------------------------------------------------------
// Mit UNION TYPES
// -----------------------------------------------------------------------------------------
