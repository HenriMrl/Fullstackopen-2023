const Course = (props) => {
  return (
    <div>
      <h1>Web development curriculum</h1>
      <ul>
        {props.course.map((course) => (
          <li key={course.id}>
            {" "}
            <h2>{course.name}</h2>
            <ul>
              {course.parts.map((part) => (
                <li key={part.id}>
                  {" "}
                  {part.name} {part.exercises}
                </li>
              ))}
            </ul>
            <p>
              total amount of exercises:{" "}
              {course.parts.reduce((sum, part) => sum + part.exercises, 0)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Course;
