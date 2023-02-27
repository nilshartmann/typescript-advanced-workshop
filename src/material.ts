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

  // Ausgangsbasis wie bei getSomething, O muss ein object sein

  type ValidatorFunction<V> = (value: V) => boolean;

  type ValidatorObject<O extends object> = {
    readonly [K in keyof O]: ValidatorFunction<O[K]>;
  };

  function validateObject<O extends object>(
    o: O,
    validators: ValidatorObject<O>
  ): ValidationResult<O> {
    return {} as any;
  }

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
