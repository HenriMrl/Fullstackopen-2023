import { useState, useEffect } from "react";
import Person from "./Komponentit1/Persons";
import Filter from "./Komponentit1/Filter1";
import ShowPersons from "./Komponentit1/ShowPersons";
import personService from "./services/persons";
import Notification from "./Komponentit1/Notification";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setfilter] = useState("");
  const [Message, setMessage] = useState(
    "you can add and delete persons. Also change their numbers"
  );

  useEffect(() => {
    personService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const addName = (event) => {
    event.preventDefault();
    if (
      persons.some(
        (persons) => persons.name === newName && persons.number === newNumber
      )
    ) {
      alert(`${newName} is already added to phonebook`);
    } else if (
      persons.some(
        (persons) => persons.name === newName && persons.number !== newNumber
      )
    ) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, would you like to change number?`
        )
      ) {
        const findPerson = persons.find((person) => person.name === newName);
        const updatedPerson = { ...findPerson, number: newNumber };
        personService
          .update(updatedPerson.id, updatedPerson)
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                returnedPerson.id !== person.id ? person : returnedPerson
              )
            );
            setMessage(`${newName} number was changed`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
            setNewName("");
            setNewNumber("");
          })
          .catch((error) => {
            setMessage(`Information of ${newName} could not be updated`);
            setTimeout(() => {
              setMessage(null);
            }, 3000);
          });
      }
    } else {
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      personService
        .create(nameObject)
        .then((returnedPerson) => {
          setPersons(persons.concat(returnedPerson));
          setMessage(`${newName} was added`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
          setNewName("");
          setNewNumber("");
        })
        .catch((error) => {
          setMessage(`Information of ${newName} could not be updated`);
          setTimeout(() => {
            setMessage(null);
          }, 3000);
        });
    }
  };

  const deleteName = (id, name) => {
    if (window.confirm("delete " + name + "?")) {
      personService.remove(id).then(() => {
        setPersons(persons.filter((person) => person.id !== id));
        setMessage(`${name} was deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      })
      .catch((error) => {
        setMessage(`Information of ${name} has already been deleted`);
        setTimeout(() => {
          setMessage(null);
        }, 3000);
      });
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
      <div className="app-container">
        <h1>Phonebook</h1>
        <Notification message={Message} />
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
        <Person person={persons} filter={filter} deleteName={deleteName} />
      </div>
    </div>
  );
};

export default App;
