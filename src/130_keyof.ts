export default undefined;
type Person = {
  firstname: string;
  lastname: string;
};
type PersonKeys = keyof Person;
declare function logPropertyOfPerson(propName: keyof Person): void;

logPropertyOfPerson("firstname"); // OK
logPropertyOfPerson("age"); // ERR: Argument of type '"age"' is not
// assignable to parameter of type 'keyof Person'
