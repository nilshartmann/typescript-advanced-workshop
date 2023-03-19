export default undefined;

// fikitve JAVASCRIPT Bibliothek

function validateObject(object) {
  function validateField(value) {
    // Validierungslogik...
    return true; // oder false
  }
  if (object == null || typeof object !== "object") {
    throw new Error("invalid type");
  }
  const result = {};
  Object.keys(object).forEach((k) => {
    result[k] = validateField(object[k]);
  });
  return result;
}

// --- Mapped Type allgemein:
type Person = { firstname: string; age: number };
type ValidatedObject = {
  // //   { firstname: boolean; age: boolean }
  [Key in keyof Person]: boolean;
};

type PartialPerson = {
  readonly // { readonly firstname?: boolean, readonly age?: boolean }
  [Key in keyof Person]?: boolean;
};

type NullablePerson = {
  [Key in keyof Person]?: Person[Key] | null;
};
