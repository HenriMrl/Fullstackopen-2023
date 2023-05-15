
const Header = (props) => { 
  return (
    <div>
      <p>
      the course is: {props.course}
      </p>
    </div>
  )
}

const Part = (props) => { 
  return (
    <div>
      <p>
      the name of the course: {props.part} 
      <br></br> 
      the number of excercises for the part: {props.exercise} exercises.
      </p>
    </div>
  )
}

const Content = (props) => { 
  return (
    <div>
      <Part part={props.parts[0]} exercise={props.exercises[0]}/>
      <Part part={props.parts[1]} exercise={props.exercises[1]}/>
      <Part part={props.parts[2]} exercise={props.exercises[2]}/>  
    </div>
  )
}


const Total = (props) => { 
  return (
    <div>
      <p>
      the total number of exercises is : {props.exercises[0] + props.exercises[1] + props.exercises[2]}
      </p>
    </div>
  )
}

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts.map(part => part.name)} exercises={course.parts.map(part => part.exercises)}/>
      <Total exercises={course.parts.map(part => part.exercises)}/>
    </div>
  ) 
}

export default App
