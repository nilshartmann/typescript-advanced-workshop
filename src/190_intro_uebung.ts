export default undefined;

// Uebung zum "warm werden":
// - Unten findest Du drei Variablen und eine Funktion
// - Die Funktion hat einen Parameter vom Typ "any"
// - Das wollen wir vermeiden!
// - Kannst Du den Typen für die Funktion so hinschreiben,
//   dass die Funktion nur die drei Variablen akzeptiert?
// - Verwende dazu Union Typen und den typeof-Operator
//   (Beispiele findest Du unten)

let age = 32;
let firstname = "Klaus";
let sayHello = function (firstname: string, lastname: string) {
  return `Hello ${firstname} ${lastname}`;
};

// Diese Funktion soll nur Typen der drei oben stehenden
//  Variablen entgegennehmen!
declare function handle(a: any): void;

// Diese Aurufe sollen erlaubt sein:
handle(age);
handle(33); // ok: number
handle(firstname);
handle("Susi"); // ok: string
handle(sayHello); // ok: Funktion
handle((a: string, b: string) => "Hallo"); // OK: Funktion
handle((a: string, b: string, c?: number) => "Hallo"); // OK: Funktion

// Diese Aufrufe dürfen nicht gehen,
// hier sollen TypeScript - Fehler kommen:
handle(null); // ERR
handle("Klaus", 32); // ERR
handle({ firstname: "Klaus" }); // ERR
handle(); // ERR
handle(() => 7); // ERR
handle((a: string, b: string, c: string) => `${a}{b}{c}`); // ERR
