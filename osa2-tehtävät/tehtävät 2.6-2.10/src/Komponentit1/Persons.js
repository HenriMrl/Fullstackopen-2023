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
            {person.name} {person.number}
          </p>
        ))}
    </div>
  );
};

export default Person;
