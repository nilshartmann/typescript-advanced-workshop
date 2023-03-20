export default undefined;

type Answer = "Yes" | "No" | "I_dont_care";

const a1: Answer = "Yes"; // OK
const a2: View = "Maybe"; // FEHLER


function fillIn(a: Answer) {
  if (a === "Yes") { ... } // ok
  if (a === "Maybe") { ... } // error: immer false
}

fillIn("I_dont_care"); //OK
fillIn("Maybe"); // ERROR

// NUMBER

type OneOrZero = 1 | 0;

declare function toggleBit(v: OneOrZero): void;

toggleBit(1); // OK
toggleBit(2); // ERR