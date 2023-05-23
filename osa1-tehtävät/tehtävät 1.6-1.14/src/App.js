import { useState } from 'react'

const Statistics = (props) => {
  if (props.allClicks === 0 || props.allClicks === null) {
    return (
      <div>
        no feedback given
      </div>
    )
  }

  return (
    <div>
      <StatisticLine text="good" value ={props.good} />
      <StatisticLine text="neutral" value ={props.neutral} />
      <StatisticLine text="bad" value ={props.bad} />
      <StatisticLine text="All clicks" value ={props.allClicks} />
      <StatisticLine text="Positive" value ={`${props.positiveClicks} %`} />
      <StatisticLine text="average" value ={props.averageClicks} />
    </div>
  )
}

const StatisticLine = (props) => {
    return(
    <table>
      <tbody> 
        <tr>
          <td>{props.text}: {props.value}</td>
        </tr>
      </tbody>
    </table>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={() => handleClick(text)}>
    {text}
  </button>
)

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  
  const handleClick = (text) => {
    if (text === 'good') {
      setGood(good + 1);
    }

    if (text === 'neutral') {
      setNeutral(neutral + 1);
    }

    if (text === 'bad') {
      setBad(bad + 1);
    }  
  }

  return (
    <div>
      <h1>Give feedback</h1>
      <Button handleClick={handleClick} text='good' />
      <Button handleClick={handleClick} text='neutral' />
      <Button handleClick={handleClick} text='bad' />
      <h2>Statistics:</h2>
      <Statistics good={good} neutral={neutral} bad={bad} allClicks={good + neutral + bad} positiveClicks={(good / (good + neutral + bad)) * 100} averageClicks={(good - bad) / (good + neutral + bad)}/>
    </div>
  )
}

export default App
