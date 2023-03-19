export default undefined;

// -----------------------------------------------------------------------------------------
// Mit UNION TYPES
// -----------------------------------------------------------------------------------------
type NumberOrNull<O> = O extends string ? number : null;
type R = NumberOrNull<string | null | boolean>;
//   ^?

// - 'string' wird zu 'number'
// - 'null' wird null (kein string)
// - 'boolean' wird null (kein string)

// das obige Beispiel entspricht diesem hier:
type R2 = NumberOrNull<string> | NumberOrNull<null> | NumberOrNull<boolean>;
//   ^?

// -----------------------------------------------------------------------------------------
// Exkurs: UNION TYPES mit never
// -----------------------------------------------------------------------------------------

type X = string | number | never; // string | number
//   ^?

// -----------------------------------------------------------------------------------------
// Conditionals mit Union Types und never
// -----------------------------------------------------------------------------------------

type NotNull<O> = O extends null ? never : O;

declare function ensureNotNull<O>(o: O): NotNull<O>;

const c = ensureNotNull("huhu");
// ^? string

// hier macht 'never' Sinn, da die Funktion hier nicht zurückkommt:
const b = ensureNotNull(null);
// ^? never
