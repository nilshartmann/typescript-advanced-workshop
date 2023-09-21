type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type NotEquals<A, B> = Equals<A, B> extends true ? true : false;

// ALL CHECKS COMPILE-TIME/TYPECHECK-TYPE ONLY!
export declare function compareType<Actual, Expected>(): Equals<
  Actual,
  Expected
>;

compareType<string, string>() satisfies true;
compareType<string, string>() satisfies false; // ERR: soll compile Fehler geben
compareType<string, number>() satisfies false;
compareType<{ lastname: string }, string>() satisfies false;
compareType<{ lastname: string }, string>() satisfies true; // ERR
compareType<{ lastname: string }, { lastname: string }>() satisfies true;
compareType<{ lastname: string }, { firstname: string }>() satisfies false;

// or more verbose:
export declare function expect<A extends boolean>(a: A): ToBeOrNotToBe<A>;

expect(compareType<string, string>()).toBe(true);
expect(compareType<string, number>()).toBe(true); // ERR
expect(compareType<string, number>()).not.toBe(true);
expect(compareType<{ lastname: string }, { lastname: string }>()).toBe(true);
expect(compareType<{ lastname: string }, { firstname: string }>()).not.toBe(
  true
);

type ToBe<A extends boolean> = {
  toBe(a: A): void;
  not: ToBe<A extends true ? false : true>;
};

type ToBeOrNotToBe<A extends boolean> = A extends true
  ? ToBe<true>
  : ToBe<false>;
