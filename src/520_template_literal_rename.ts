function listenerName() {
  type ListenerName<E extends string> = `add${E}Listener`;

  type ChangeListenerName = ListenerName<"change">;
  // ^?  addchangeListener
  const changeListenerName: ChangeListenerName = "addChangeListener";
  // ERROR: Type '"addChangeListener"' is not assignable to type '"addchangeListener"'
}

function stringManipulation() {
  // Mit String Manipulation:

  type ListenerName<E extends string> = `add${Capitalize<E>}Listener`;

  type ChangeListenerName = ListenerName<"change">;
  // ^?  addChangeListener 😊

  const changeListenerName2: ChangeListenerName = "addChangeListener";
}

function renameKeys() {
  type SetterObject<O extends object> = {
    [Key in keyof O & string as `set${Capitalize<Key>}`]: (
      newValue: O[Key]
    ) => void;
  };

  function createSetter<O extends object>(o: O): SetterObject<O> {
    // Implementierung egal
    return null as any;
  }

  const setters = createSetter({ firstname: "klaus", age: 32 });
  // Ändern des Vornamens:
  setters.setFirstname("Moni"); // OK
  setters.setAge(33); // OK
  setters.firstname("Moni"); // ERR
}
