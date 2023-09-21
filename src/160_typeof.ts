export default undefined;

// JAVASCRIPT

const languages = {
  de: "DE",
  en: "EN",
};

// TYPESCRIPT
type TLanguages = typeof languages; // TLanguages ist TYPE, languages ist WERT
// { de: string; en: string; }

export declare function translateMessage(
  msg: string,
  lang: keyof TLanguages
): string;

translateMessage("Hallo", "en"); // OK
translateMessage("Hallo", "fr"); // ERR

// oder:
type TLanguageKeys = keyof typeof languages;
export declare function translateMessage(
  msg: string,
  lang: TLanguageKeys
): string;

// Funktionen
declare function stringConverter(name: string): string | null;

type Fn = typeof stringConverter;
// (name: string) => string | null

declare function sayHello(name: string, converter: Fn): void;
sayHello("Klaus", (s) => s.toUpperCase()); // OK
sayHello("Klaus", (s) => null); // OK
sayHello("Klaus", (s) => true); // ERR Type 'boolean' is not assignable to type 'string'

declare function numberConverter(n: number): string;
sayHello("Klaus", numberConverter); // ERR
