export default undefined;

// Konkrete Strings können in TS ein eigener Typ sein:
type Direction = "top" | "right" | "bottom" | "left";

declare function setMargin(d: Direction, size: string): void;

setMargin("top", "2rem"); // ok
setMargin("middle", "2rem"); // ERR: Argument of type '"middle"' is not
//      assignable to parameter of type 'Direction'

// Template Literal: -----------------------
type Size = `${number}${string}`;

declare function setMargin1(d: Direction, size: Size): void;

setMargin1("top", "2rem"); // OK
setMargin1("top", "XL"); // ERR
setMargin1("top", "A4"); // ERR
setMargin1("top", "2"); // OK (Leerstring...)

// ---------------------------------------

type Size2 = `${number}em` | `${number}rem` | `${number}px`;

declare function setMargin2(d: Direction, size: Size2): void;

setMargin2("top", "2em"); // OK
setMargin2("top", "1.5rem"); // OK
setMargin2("top", "24pt"); // ERR
setMargin2("top", "2"); // ERR

// ---- Mit Union Types:

type Unit = "em" | "rem" | "px";
type Size3 = `${number}${Unit}`;
// oder:
// type Size = `${number}${"em" | "rem" | "px"}`

declare function setMargin3(d: Direction, size: Size3): void;

setMargin3("top", "2em"); // OK
setMargin3("top", "1.5rem"); // OK
setMargin3("top", "24pt"); // ERR
setMargin3("top", "2"); // ERR

// --------- Beispiel: CSS Eigenschaften
type Spacing = "margin" | "padding";
type Direction4 = "top" | "right" | "bottom" | "left";
type CSSClassNames = `${Spacing}-${Direction4}`;

type Size4 = `${number}${"em" | "rem" | "px"}`;

declare function setSpacing(c: CSSClassNames, size: Size4): void;

setSpacing("margin-right", "2rem"); // OK
setSpacing("padding-center", "2rem"); // ERROR

// ------------ Beispiel: String Manipulation
type ListenerName<E extends string> = `add${Capitalize<E>}Listener`;

type ChangeListenerName = ListenerName<"change">;
// ^?  addChangeListener 😊

const changeListenerName: ChangeListenerName = "addChangeListener";
