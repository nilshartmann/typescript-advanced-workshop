export default undefined;

type ValidatedObject<OBJECT extends object> = {
  [Key in keyof OBJECT]: OBJECT[Key] | null;
};

declare function validate<O extends object>(o: O): ValidatedObject<O>;

const person = { firstname: "Klaus", age: 123 };
const result = validate(person);
// ^? { firstname: string | null, age: number | null }

result.lastname; // ERR: Property 'lastname' does not exist on type 'ValidatedObject'
result.age?.toUpperCase(); // ERR Property 'toUpperCase' does not exist on type 'number'
