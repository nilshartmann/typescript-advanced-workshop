export default undefined;

// JAVASCRIPT

const person = {
  firstname: "Klaus",
  address: { city: "Hamburg", street: "Reeperbahn" },
};

const address = person["address"];

// TYPESCRIPT (TYP-EBENE):

type Person = {
  firstname: string;
  address: { city: string };
};

type Address = Person["address"];
//     ^?

// Wie bekommen wir den Typen eines Kontaktes?
// (contacts ist hier eine LISTE mit dem gesuchten Typ)

type Friend = {
  contacts: [
    {
      email: string;
      phone: string;
    }
  ];
};

type Contacts = Friend["contacts"];
//     ^?
type Contact = Friend["contacts"][number];
//     ^?

declare function addContact(c: Contact): void; // 👍
