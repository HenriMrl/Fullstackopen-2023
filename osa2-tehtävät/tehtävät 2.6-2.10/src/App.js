import { useState } from "react";
import Person from "./Komponentit1/Persons";
import Filter from "./Komponentit1/Filter1";
import ShowPersons from "./Komponentit1/ShowPersons";

const App = () => {
  const [persons, setPersons] = useState([
    { name: "Arto Hellas", number: "+358777" },
  ]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");

  const addName = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (persons) => persons.name === newName || persons.number === newNumber
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };

  const handleNewName = (event) => {
    setNewName(event.target.value);
  };

  const handleNewNumber = (event) => {
    setNewNumber(event.target.value);
  };

  const handleNewFilter = (event) => {
    setfilter(event.target.value);
  };

  return (
    <div>
      <h1>Phonebook</h1>
      <Filter filter={filter} handleNewFilter={handleNewFilter} />
      <h2>add new</h2>
      <ShowPersons
        addName={addName}
        newName={newName}
        handleNewName={handleNewName}
        newNumber={newNumber}
        handleNewNumber={handleNewNumber}
      />
      <h2>Numbers</h2>
      <Person person={persons} filter={filter} />
    </div>
  );
};

export default App;
