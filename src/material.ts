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

function st() {
  type Mouse = {
    position: [number, number];
    leftButtonState: boolean;
    rightButtonState: boolean;
  };

  type MouseEventName<O extends object> = `on${Capitalize<keyof O>}Change`;
  // Here R is a inferred type
  type MouseEventKey<T> = T extends `on${infer R}Change`
    ? Uncapitalize<R>
    : never;
}

function keyoftest() {
  const person = {
    B: "b",
    firstname: "...",
    2: "zwei",
    [Symbol()]: "geheim",
  };

  type Abc = "A" | "B";
  type OhneB<X> = X extends "B" ? never : X;
  type Ab = OhneB<keyof typeof person>;

  type StringKeysOf2<T> = T extends string ? string : never;
  type StringKeysOf<T extends object, K = keyof T> = K extends string
    ? K
    : never;
  type StringKeysOfA<T extends object> = [keyof T] extends [string]
    ? true
    : never;

  type SetterObject<O extends object> = {
    [Key in StringKeysOf<O> as `set${Capitalize<Key>}`]: (
      newValue: O[Key]
    ) => void;
  };

  type XXXX = SetterObject<P>;

  type P = typeof person;
  type PKeys = StringKeysOf<P>;
  type YKeys = StringKeysOf2<keyof P>;
  type ZKeys = StringKeysOfA<P>;

  type X = {
    [K in StringKeysOf<P> as `on${Capitalize<K>}Change`]: boolean;
  };

  type MouseEventName<O extends object> = `on${Capitalize<
    StringKeysOf<O>
  >}Change`;
}

function dasdfasdf() {
  type Person = { firstname: string; age: number };
  type Animal = { name: string; species: string };
  type PersonOrAnimal = Person | Animal;

  function sayHello(p: PersonOrAnimal) {
    if ("firstname" in p) {
      p.firstname.toUpperCase(); // OK
      //^? Person
    }
  }
}

function afasdfasfasdfasdfasdf() {
  type StringOrNum = string | number;
  type StringOrNumAndString = StringOrNum & string;

  type ColorsOfSwiss = "red" | "white";
  type ColorsOfFrance = "blue" | "white" | "red";
  type ColorsOfSwissAndFrance = ColorsOfSwiss & ColorsOfFrance;
}

function aaaa() {
  const person = {
    firstname: "Klaus",
    2: "zwei",
    [Symbol()]: "geheim",
  };

  type P = typeof person;
  type Keysx = keyof P;
  type KKKKKK = Keysx & string;

  type Keys<O> = {
    [K in keyof O]: K;
  };

  type PKeys = Keys<P>;
  type RKeys = Keys<Record<string, string>>;

  type NeuerName<O extends object> = {
    [K in keyof O as `${K}`]: boolean;
  };

  type Neu = NeuerName<P>;

  type NN<X extends string | number | bigint | boolean | null | undefined> =
    `${X}`;

  type AAA = `${4}`;

  type Things = 4 | true | "Hello" | "123";

  type Things2 = 5 | false | "Hello";

  type AllThings = Things & Things2;

  type ThingsString = Things & string;

  type A = {
    a: string;
  };

  type B = {
    a: number;
  };

  type C = A & B;
  const c: C = null as any as C;

  const a: A = c;
  const b: B = c;
}
type Animal = "lion" | "tiger";
type Domestic = "bee" | "cow";
type DomesticAnimal = Animal & Domestic;

type AllColorsOfSwissAndFrance = "blue" | "white" | "red";
const c: AllColorsOfSwissAndFrance = "blue";
const f: ColorsOfFrance = c; // OK
const s: ColorsOfSwiss = c;
type ColorsOfFrance = "blue" | "white" | "red";
type ColorsOfSwiss = "red" | "white";

type SetterObject<O extends object> = {
  [Key in keyof O & string as `set${Capitalize<Key>}`]: (
    newValue: O[Key]
  ) => void;
};

type X = SetterObject<Person>;

function fasdfasdfasfasdfasdf() {
  type Color = "red";
  type Msg = `My favorite color: ${Color}`;

  function say(m: Msg) {
    /* ... */
  }
  say("My favorite color: red"); // OK
  say("My favorite color: black"); // ERR: Argument of type '"My favorite color: black"' is not assignable
  //   to parameter of type '"My favorite color: red"
}

function fasfsdfähioafre() {
  type Spacing = "margin" | "padding";
  type Direction = "top" | "right" | "bottom" | "left";

  type CSSClassNames = `${Spacing}-${Direction}`;

  declare function setCssClass(c: CSSClassNames): void;
  setCssClass("margin-right"); // OK
  setCssClass("padding-center"); // ERROR

  // IDEE 1:
  type ToReactClassName<C extends string> =
    C extends `${infer left extends Spacing}-${infer right extends Direction}`
      ? `${left}${Capitalize<right>}`
      : never;

  declare function toReactClassName<C extends string>(
    c: C
  ): ToReactClassName<C>;
  const result = toReactClassName("margin-bottom");
  // ^? "marginBottom"
  const invalidResult = toReactClassName("background-color");
  // ^? never

  // IDEE 2:
  type ToCamelCase<C extends string> = C extends `${infer left}-${infer right}`
    ? `${left}${Capitalize<right>}`
    : never;

  declare function toCamelCase<C extends string>(c: C): ToCamelCase<C>;
  const cc = toCamelCase("margin-bottom");
  // ^? "marginBottom"
  const invalidCc = toCamelCase("background-color");
  // ^? backgroundColor
}

function cssa() {
  type Unit = "em" | "px" | "rem";
  type X = `${number}${Unit}`;

  const s: X = "2em";
  const t: X = "2rem";
  const y: X = "2 x"; //

  type RGB = `rgb(${number},${number},${number})`;
  type HEX = `{"0" | "1" "1" | "A" | "B" | "C" | "D" | "E" | "F"}`;
  type HEX_COLOR = `#${HEX}`;

  const h: HEX = "#1A";
}

declare function sayHello(name: string): string | null;
type Fn = typeof sayHello;

const languages = {
  de: "DE",
  en: "EN",
};

type TLanguages = typeof languages; // TLanguages ist TYPE, languages ist WERT
//
type FirstArg<O extends (a: any, ...args: any) => any> = O extends (
  a: infer A,
  ...args: any
) => any
  ? A
  : never;

function hurzeppurzel() {
  type ToCamelCase<S> = S extends `${infer left}-${infer right}`
    ? ToCamelCase<`${left}${Capitalize<right>}`>
    : S;

  const ml: ToCamelCase<"margin-left"> = "marginLeft";
  const mbw: ToCamelCase<"max-border-width"> = "maxBorderWidth";
  const c: ToCamelCase<"color"> = "color";

  type ToCamelCase2<
    S,
    D extends string = "-"
  > = S extends `${infer left}${D}${infer right}`
    ? ToCamelCase<`${left}${Capitalize<right>}`>
    : S;

  const ml2: ToCamelCase2<"margin-left"> = "marginLeft";
  const helloWorld: ToCamelCase2<"hello world", " "> = "helloWorld";
}

type ListenerName<E extends string> = `add${E}Listener`;
type ChangeListenerName = ListenerName<"change">;
const changeListenerName: ChangeListenerName = "addChangeListener";

function inferTemplateLiteral() {
  type IsHausnummer<S> = S extends `${number}a` ? true : false;
  type aaa = IsHausnummer<"41a">;

  type IsAddListenerForEventName<S, E> = S extends `add${Capitalize<E>}Listener`
    ? true
    : false;

  type IsChangeListener = IsAddListenerForEventName<
    "addChangeListener",
    "change"
  >; // "true"
  type IsChangeOrUpdateListener = IsAddListenerForEventName<
    "addChangeListener",
    "change" | "update"
  >; // "true"
  type IsUpdateListener = IsAddListenerForEventName<
    "addChangeListener",
    "update"
  >; // "false"

  type Event = "change" | "update";
  type GetEventNameFromListener<S extends string> =
    S extends `add${infer EN extends Event}Listener` ? Uncapitalize<EN> : never;

  type ChangeEvent = GetEventNameFromListener<"addChangeListener">; // "change"
  type NoListener = GetEventNameFromListener<"addInsertListener">; // "never"
  type NoEvent = GetEventNameFromListener<"addChangeHandler">; // never
}

function infer2() {
  type Event = "change" | "update";
  type IsAddListenerForEventName<
    S extends string,
    E extends Event = "change"
  > = S extends `add${Capitalize<E>}Listener` ? true : false;
  type IsChangeListener = IsAddListenerForEventName<"addChangeListener">; // "true"
  type IsUpdateListener = IsAddListenerForEventName<"addUpdateListener">; // "false"
}

function Sizes() {
  type Direction = "top" | "right" | "bottom" | "left";
  type Size = `${number}${NonEmpty<string>}`;

  type NonEmptyString<T extends string> = "" extends T
    ? never
    : T extends never
    ? never
    : T;

  type NonEmpty<T extends string> = "" extends T ? never : T;

  type X = NonEmptyString<"s">;
  type Y = NonEmptyString<"">;

  function setMargin(d: Direction, size: Size): void {}

  setMargin("middle", "2ddd"); // OK
  setMargin("top", "2"); // ERR
}

function s2() {
  type Direction = "top" | "right" | "bottom" | "left";
  type Unit = "em" | "rem" | "px";
  // type Size = `${number}em` | `${number}rem` | `${number}px`
  type Size = `${number}${"em" | "rem" | "px"}`;

  function setMargin(d: Direction, size: Size): void {}

  setMargin("top", "2px"); // OK
  setMargin("top", "1.5rem"); // OK
  setMargin("top", "24pt"); // ERR
  setMargin("top", "2"); // ERR
}

function spacing() {
  type Spacing = "margin" | "padding";
  type Direction = "top" | "right" | "bottom" | "left";
  type Size = `${number}${"em" | "rem" | "px"}`;

  type CSSClassNames = `${Spacing}-${Direction}`;

  function setSpacing(c: CSSClassNames, size: Size): void {}
  setSpacing("margin-right", "2rem"); // OK
  setSpacing("padding-center", "2rem"); // ERROR

  function setX(c: `${CSSClassNames}:${Size}`) {}
  setX("margin-right: 2rem");
}

function swap() {
  type Swap<S extends string> = S extends Capitalize<S>
    ? Uncapitalize<S>
    : Capitalize<S>;

  type A = Swap<"addListener">;
  // ^?  "AddListener"

  type B = Swap<"AddListener">;
  // ^?  "addListener"
}

function IfThenElse() {
  type IfThenElse<Current, I, T, E> = Current extends I ? T : E;

  function getLength<O extends string | null>(
    s: O
  ): IfThenElse<O, string, number, null> {
    return null as any;
  }

  const a = getLength("123"); // a: number
  const b = getLength(null); // b: null
}

function NotNull() {
  function ensureNotNull<O>(o: O | null): O {
    return "" as any;
  }

  ensureNotNull("");
  ensureNotNull(null);

  type NotNull<O> = O extends null ? never : O;
  function ensureNotNull2<O>(o: O | null): NotNull<O> {
    return "" as any;
  }
  const a = ensureNotNull2("fasdfasdf");
  const b: string = ensureNotNull2(null);

  function sayHelslo(s: string) {}

  sayHelslo(b as never);
}
