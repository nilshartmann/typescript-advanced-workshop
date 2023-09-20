export default undefined;

type Flatten<O, T extends keyof O = keyof O> = {
  [P in T]: O[P];
};

interface A {
  firstname: string;
}

type B = A & {
  // ^?
  lastname: string;
};

type FlattenB = Flatten<B>;
//    ^?
