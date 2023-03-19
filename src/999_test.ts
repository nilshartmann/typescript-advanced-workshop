compareType<ExcludeVoidFunction<string>, string>() satisfies true; // Soll: OK
compareType<ExcludeVoidFunction<typeof setValue>, never>() satisfies true; // Soll: OK
compareType<ExcludeVoidFunction<typeof setValue>, string>() satisfies false; // Soll: OK
compareType<ExcludeVoidFunction<typeof getValue>, boolean>() satisfies false; // Soll: OK

type Equals<A, B> = [A] extends [B] ? ([B] extends [A] ? true : false) : false;

type NotEquals<A, B> = Equals<A, B> extends true ? true : false;

// ALL CHECKS COMPILE-TIME/TYPECHECK-TYPE ONLY!
export declare function compareType<Actual, Expected>(): Equals<
  Actual,
  Expected
>;

// compareType<string, string>() satisfies true;
// compareType<string, string>() satisfies false; // ERR
// compareType<string, number>() satisfies false;
// compareType<{ lastname: string }, string>() satisfies false;
// compareType<{ lastname: string }, string>() satisfies true; // ERR
// compareType<{ lastname: string }, { lastname: string }>() satisfies true;
// compareType<{ lastname: string }, { firstname: string }>() satisfies false;

// or more verbose:
export declare function expect<A extends boolean>(a: A): ToBeOrNotToBe<A>;

// expect(compareType<string, string>()).toBe(true);
// expect(compareType<string, number>()).toBe(true); // ERR
// expect(compareType<string, number>()).not.toBe(true);
// expect(compareType<{ lastname: string }, { lastname: string }>()).toBe(true);
// expect(compareType<{ lastname: string }, { firstname: string }>())
//   .not.toBe(true);
// expect(compareType<ExcludeVoidFunction<() => void>, never>()).toBe(true);

type ToBe<A extends boolean> = {
  toBe(a: A): void;
  not: ToBe<A extends true ? false : true>;
};

type ToBeOrNotToBe<A extends boolean> = A extends true
  ? ToBe<true>
  : ToBe<false>;
