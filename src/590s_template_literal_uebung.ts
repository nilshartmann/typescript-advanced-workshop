import { compareType, expect } from "./999_test";

export default undefined;

// Schreibe einen CSSExpression-Typen, der die vollständige
//  Angabe einer CSS-Eigenschaft erlaubt
//   (Natürlich nur margin/padding und Direction 😊)

type Spacing = "margin" | "padding";
type Direction = "top" | "right" | "bottom" | "left";
type CSSClassNames = `${Spacing}-${Direction}`;
type Size = `${number}${"em" | "rem" | "px"}`;

// Diesen Typen bitte korrekt beschreiben!
type CSSExpression = `${CSSClassNames}:${Size}`;

declare function setSpacing(C: CSSExpression): void;

setSpacing("margin-right: 2rem"); // OK
setSpacing("padding-bottom: 3px"); // OK
setSpacing("margin-middle: 2rem"); // ERR: "middle"
setSpacing("padding-top: 24pt"); // ERR: "pt"

// ZWEITE ÜBNUNG:

// Die unten stehende Funktion nimmt Spacing und Direction
// entgegen und liefert die beiden Werte in EINEM String
//  in PascalCase-Schreibweise zurück.
//   (PascalCase: alle Anfangsbuchstaben groß)
//  Beispiele:
//   toPascalCase("margin", "bottom") => "MarginBottom"
//   toPascalCase("padding", "top") => "PaddingTop"

type ToPascalCase<
  S extends Spacing,
  D extends Direction
> = `${Capitalize<S>}${Capitalize<D>}`;

declare function toPascalCase<S extends Spacing, D extends Direction>(
  s: S,
  d: D
): ToPascalCase<S, D>;

// "satisfies" ist ein TypeScript-Operator,
//  denn wir hier (missbräuchlich) verwenden,
//  um zu prüfen, ob der Rückgabetyp korrekt ist
toPascalCase("margin", "bottom") satisfies "MarginBottom"; // OK
toPascalCase("margin", "top") satisfies "MarginTop"; // OK
toPascalCase("margin", "top") satisfies "Margintop"; // ERR
toPascalCase("margin", "top") satisfies "marginTop"; // ERR
