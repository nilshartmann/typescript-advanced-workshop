export default undefined;

// fikitve JAVASCRIPT Bibliothek

declare function validateObject(object: any): any;

// --- Mapped Type allgemein:
type Person = { firstname: string; age: number };
type ValidatedObject = {
  // //   { firstname: boolean; age: boolean }
  [Key in keyof Person]: boolean;
};

type PartialPerson = {
  // { readonly firstname?: boolean, readonly age?: boolean }
  readonly [Key in keyof Person]?: boolean;
};

type NullablePerson = {
  [Key in keyof Person]?: Person[Key] | null;
};
