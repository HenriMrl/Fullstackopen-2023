const Person = (props) => {
  return (
    <div>
      {props.person
        .filter(
          (person) =>
            !props.filter ||
            person.name.toLowerCase().includes(props.filter.toLowerCase())
        )
        .map((person, index) => (
          <p key={index}>
            {person.name} {person.number} <button onClick={() => props.deleteName(person.id, person.name)}>delete</button>
          </p>
        ))}
    </div>
  );
};

export default Person;
