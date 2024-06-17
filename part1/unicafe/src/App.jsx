import { useState } from 'react'

const Button = ({ handler, text }) => {
  return (
    <>
    <button onClick={handler}>{text}</button>
    </>
  )
}

const StatisticLine = (props) => {
  return (
    <>
    <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
    </tr>
    </>
  )
}

const Statistics = ({ good, neutral, bad, total }) => {
  let all = (good + neutral + bad);

  if (total == 0) return (
  <>
  No feedback given
  </> 
  )
  else return (
    <>
    <table>
      <tbody>
        <StatisticLine text='Good' value={good} />
        <StatisticLine text='Neutral' value={neutral} />
        <StatisticLine text='Bad' value={bad} />
        <StatisticLine text='All' value={all} />
        <StatisticLine text='Average' value={(total / all)} />
        <StatisticLine text='Positive' value={(good / all) * 100} />
      </tbody>
    </table>
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  const [total, setTotal] = useState(0);

  const forGood = () => {
    setGood(good + 1);
    setTotal(total + 1);
  }

  const forBad = () => {
    setBad(bad + 1);
    setTotal(total - 1);
  }

  const forNeutral = () => {
    setNeutral(neutral + 1);
  }

  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handler={forGood} text='Good' />
      <Button handler={forNeutral} text='Neutral' />
      <Button handler={forBad} text='Bad' />

      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
    </div>
  )
}

export default App