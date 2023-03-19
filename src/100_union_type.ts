type Person = { name: string };
type Movie = { title: string };

type PersonOrMovie = Person | Movie;

function printNameOrTitle(obj: PersonOrMovie) {
  console.log(obj.title); // ERR: Property 'title' does not
  // exist on type 'Person | Movie'

  if ("title" in obj) {
    // Abfrage ist ein "Type Guard"
    // obj ist Movie hier, title ist definiert
    console.log(obj.title);
  } else {
    // obj ist Person hier: name ist definiert
    console.log(obj.name);
  }
}

printNameOrTitle({ name: "Klaus" }); // OK

printNameOrTitle({ title: "TypeScript Deep Dive" }); // OK

printNameOrTitle({ label: "Save" }); // ERR
