export default undefined;

// Voraussetzung: Generics sind bekannt
declare function toObject<O>(o: O): { key: O };

function ___() {
  const x = toObject("hallo"); // { "key": string }
  const y = toObject(123); // { "key": number }

  function consume(a: { key: string }) {}
  consume(x);
  consume(y); // ERROR
}

// - Voraussetzung: Generics sind bekannt + Mapped Type Syntax (ist aber recht heftig)
declare function toObjectWithKey<K extends string, O>(
  key: K,
  value: O
): { [P in K]: O };
function __() {
  const x1 = toObjectWithKey("hallo", 123); // { "key": string }
  const x2 = toObjectWithKey("zahl", 123); // { "key": number }
}

// - Idee: wenn man eine Liste reinsteckt, kommt die unverändert
//   zurück
//   Wenn KEINE Liste reingesteckt wird, kommt eine Liste mit dem Ding zurück
// - Voraussetzung: Conditional Types sind bekannt
declare function toList<O>(o: O): O extends any[] ? O : O[];
function _() {
  const x1 = toList("hallo"); // string[]
  const x2 = toList(["hallo"]); //string[]
}

type ListOfStringsOrBooleans<X extends string | boolean> = Array<X>;
function ____() {
  const c1: ListOfStringsOrBooleans<string> = ["a"];
  const c2: ListOfStringsOrBooleans<boolean> = [true];

  const c3: ListOfStringsOrBooleans<boolean> = [true, "string"]; // no
  const c4: ListOfStringsOrBooleans<number> = [4]; // NO Type 'number' does not satisfy the constraint 'string | boolean'
}

type Person = {
  firstname: string;
  lastname: string;
};
declare function logPropertyOfPerson(propName: keyof Person): void;

logPropertyOfPerson("firstname"); // OK
logPropertyOfPerson("age"); // ERR: Argument of type '"age"' is not assignable to parameter of type 'keyof Person'

declare function validateObject<O extends object>(o: O): O | null;
validateObject("Klaus");

function ________() {
  function validate<O, R = string>(o: O): O | R {
    return null as any;
  }
  const x = validate("Hallo"); // x ist string | null
  const y = validate(7); // y ist number | null
  // ^?
  const a1 = validate<string>("Hallo"); // OK
  const a2 = validate<number>(7); // Argument of type 'number' is not assignable to parameter of type 'string'
}

function ___________() {
  type Tuple<X, Y = string> = [X, Y];

  type TupleOfNumberAndStrings = Tuple<number>; // [number, string]
  type TupleOfStringAndBoolean = Tuple<string, boolean>; // [string, boolean]
}

function ____________() {
  type Person = { firstname: string | null };
  function getOrDefault<P extends Person>(p: P): P {
    return null as any;
  }

  getOrDefault({});
}

function index() {
  type Person = {
    contacts: [
      {
        email: string;
        phone: string;
      }
    ];
  };

  type Contacts = Person["contacts"]; // Array<{ email: string, phone: string }>
  type Contact = Person["contacts"][number]; // { email: string, phone: string }
}

function fasdfaSD() {
  type Person = {
    firstname: string;
    lastname: string;
    age: number;
  };

  type ValidatedPerson = {
    readonly [Key in keyof Person]?: boolean;
  };
}

// TODO BEISPIELE FÜR CONDITONAL TYPES:

function rmX() {
  type Person = {
    firstname: string;
    lastname: string;
    age: number;
  };
  type ValidatedPerson = {
    [Key in keyof Person as Key extends "lastname" ? never : Key]: boolean;
  };
}

function ValidateObject() {
  // SCHRITT 1: Nur Ergebnis definieren
  type ValidationResult<O> = {
    readonly [K in keyof O]: boolean;
  };

  type ValidatorFunction<V> = (value: V) => boolean;

  // type ReturnTypeFromVoidFunction<FN> = FN extends () => infer RETVALUE ? never;

  // Übung infer
  // type ValidatorFunctionWithFunction<V> = V extends (a: infer A, ...args: any) => any ? (value: A) => boolean : (value: V) => boolean;

  type ValidatorObject<O extends object> = {
    readonly [K in keyof O]: ValidatorFunction<O[K]>;
  };

  function validateObject<O extends object, V extends Partial<O>>(
    o: O,
    validators: ValidatorObject<V>
  ): ValidationResult<V> {
    return {} as any;
  }

  const r = validateObject(
    { firstname: "nils", lastname: "hartmann" },
    { firstname: () => true }
  );

  type Person = {
    firstname: string;
    lastname: string;
    age: number;
  };
  const p: Person = { firstname: "Klaus", lastname: "Meier", age: 32 };

  type PersonValidator = ValidatorObject<Person>;
  const personValidator: PersonValidator = {} as unknown as PersonValidator;
  personValidator.age?.(7); // OK
  personValidator.age?.("fadfas"); // Argument of type 'string' is not assignable to parameter of type 'number'
  personValidator.age = undefined; // Cannot assign to 'age' because it is a read-only property.
  const result = validateObject(p, personValidator);
  const ageCorrect: boolean = result.age; // OK
  const lastnameCorrect: boolean = result.lastname;
  result.address; // Property 'address' does not exist on type 'ValidationResult<Person>'

  // Nächste Stufe: im Validator-Objekt (mit Cond. Types)
  // nur Funktionen für Properties, die im Original Objekt KEINE Funktionen sind!
  // Validator soll andere Namen zurückliefern
}

function cond() {
  declare function getLength<O extends string | null>(
    s: O
  ): O extends string ? number : null;
  const a = getLength("123"); // a: number
  const b = getLength(null); // b: null
}
type NumberOrNull<O> = O extends string ? number : null;

function a() {
  type X = NumberOrNull<string | null | number>;
}

type S = NumberOrNull<"huhu">; // N = number
type N = NumberOrNull<123>; // N = null
type A = NumberOrNull<true>; // A = null

type NumberOrStringOrNull<O> = O extends string
  ? number
  : O extends boolean
  ? string
  : null;

type T1 = NumberOrStringOrNull<"huhu">; // N = string
type T2 = NumberOrStringOrNull<123>; // N = null
type T3 = NumberOrStringOrNull<true>; // A = string

function setter() {
  type CHAR_MAP = {
    a: "A";
    b: "B";
    c: "C";
    d: "D";
    e: "E";
    f: "F";
    g: "G";
    h: "H";
    i: "I";
    j: "J";
    k: "K";
    l: "L";
    m: "M";
    n: "N";
    o: "O";
    p: "P";
    q: "Q";
    r: "R";
    s: "S";
    t: "T";
    u: "U";
    v: "V";
    w: "W";
    x: "X";
    y: "Y";
    z: "Z";
  };

  type MyCapitalize<STRING extends string> =
    STRING extends `${infer FIRST_CHAR}${infer REST}`
      ? FIRST_CHAR extends keyof CHAR_MAP
        ? `${CHAR_MAP[FIRST_CHAR]}${MyCapitalize<REST>}`
        : `${FIRST_CHAR}${MyCapitalize<REST>}`
      : STRING;

  type GetPost = MyCapitalize<"getPost">; // "GetPost"
}

function notMe() {
  type A<O> = O extends string ? boolean : never;
  type B = A<"">;
  type C = A<7>;
  type X = string | never; // string

  type NotNull<O> = O extends null ? never : O;
  type T1 = NotNull<string | null>; // string

  // Macht kein Sinn:
  type T2 = NotNull<null>; // never

  function ensureNotNull<O>(o: O): NotNull<O> {
    return "" as any;
  }

  const b = ensureNotNull(null); // never
  const c = ensureNotNull("huhu"); // string
}

function favoriteTeams() {
  type Teams = "hsv" | "fc bayern" | "st.pauli" | "bvb" | "sc freiburg";
  type Extract<O, I> = O extends I ? I : never;
  type FavTeams = Extract<Teams, "hsv" | "sc freiburg">; // OK

  type ExtractTeams<T extends Teams, I extends Teams> = Extract<T, I>;
  type FT = ExtractTeams<"hsv" | "fc bayern", "hsv">; // OK
  type FT2 = ExtractTeams<"hsv" | "fc bayern", "st. pauli">; // ERR: Type '"st. pauli"' does not satisfy the constraint 'Teams'
  type FT3 = ExtractTeams<"schalke 04" | "bvb", "bvb">; // ERR: Type '"schalke 04"' is not assignable to type 'Teams'
}

declare function validateX<O>(
  o: O
): O extends (b: string, ...a: any) => infer A ? A : O;

function infer_() {
  const p = validateX("fasdfasdf"); // string
  const p2 = validateX((a: string) => 123); // number
  const p20 = validateX(() => 123); // number
  const p3 = validateX((a: number, b: number) => 123); // number

  type X<A> = A extends (infer A)[] ? A : never;
  type C = X<string[]>;
  type D = X<boolean>;
}

function uebungConditional() {
  type Person = {
    firstname: string;
    age: 32;
    fullname: () => string;
  };

  type WithoutF<O extends object> = {
    [K in keyof O as O[K] extends () => any ? never : K]: O[K];
  };

  type X = WithoutF<Person>;

  const person = {
    firstname: "...",
    2: "zwei",
    [Symbol()]: "geheim",
  } as const;

  type P = typeof person;

  type X2 = {
    [K in keyof P as K extends string ? K : never]: P[K];
  };
}

type Color = "red" | "blue" | "green";
declare function bgColor<C extends Color>(c: Color): { backgroundColor: C };

bgColor("red"); // OK
bgColor("white"); // Argument of type '"white"' is not assignable to parameter of type 'Color'
declare function addListener<O extends object, K extends keyof O>(
  someObject: O,
  aKey: K
): (newValue: O[K]) => void;
function ab() {
  const person = {
    firstname: "Klaus",
    age: 32,
  };

  addListener(person, "firstname")("newFirstName"); // OK
  addListener(person, "xxx")("newFirstName"); // Argument of type '"xxx"' is not assignable to parameter of type '"firstname" | "age"
  addListener(person, "age")(33); // OK
  addListener(person, "age")("33"); // ERR // Argument of type 'string' is not assignable to parameter of type 'number'
  addListener("Klaus", "klaus"); // Argument of type 'string' is not assignable to parameter of type 'object'
}

function x() {
  type NotNull<O> = O extends null ? never : O;
  type T1 = NotNull<string | null>; // T1 = string
  type T2 = NotNull<string | boolean | null | undefined>; // T2 = string | boolean | undefined

  type NotNullOrUndefined<O> = O extends null | undefined ? never : O;
  type T3 = NotNullOrUndefined<string | null>; // T1 = string
  type T4 = NotNullOrUndefined<string | boolean | null | undefined>; // T2 = string | boolean | undefined
}
