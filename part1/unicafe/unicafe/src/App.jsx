import { useState } from 'react'

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title name = "give feedback" />
      <Button onClick={() => setGood(good + 1)} text = "good" /> 
      <Button onClick={() => setNeutral(neutral + 1)} text = "neutral" /> 
      <Button onClick={() => setBad(bad + 1)} text = "bad" /> 
      <Title name = "Statistics" />
      <p></p>
      <Statistics good = {good} neutral = {neutral} bad = {bad} />
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}> {text}</button> 
  )
}

const Statistics = ({good, neutral, bad}) => {

  const total = good + neutral + bad

  if (total == 0) {
    return <p>No feedback given</p>
  }

  return (
    <div>
      <table>
        <tbody>
          <StatisticLine text = "good" number = {good}/>
          <StatisticLine text = "neutral" number = {neutral}/>
          <StatisticLine text = "bad" number = {bad}/>
          <StatisticLine text = "all" number = {total}/>
          <StatisticLine text = "average" number = {(good - bad)/ total} />
          <StatisticLine text = "positive" number = {(good/total) * 100}> %</StatisticLine>
        </tbody>
      </table>
    </div>
  )
}

const StatisticLine = ({text, number, children}) => {
  return (
        <tr>
          <td>{text}</td>
          <td>{number} {children}</td>
        </tr>
  )
}

const Title = ({name}) => {
  return (
    <>
      <h2>{name}</h2>
    </>
  )
}

export default App