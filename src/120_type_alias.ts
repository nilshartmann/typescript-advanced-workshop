export default undefined;

declare function createPerson(
  firstname: string,
  address: { city: string }
): { firstname: string; address: { city: string } };

type Address = {
  city: string;
};
type Person = {
  firstname: string;
  address: { city: string };
};
declare function createPerson(firstname: string, address: Address): Person;

type PersonWithAddress = {
  firstname: string;
  address: Address;
};
declare function createPerson(
  firstname: string,
  address: Address
): PersonWithAddress;
