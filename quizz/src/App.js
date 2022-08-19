import './App.css';
import React from "react"
import Question from "./Component/question"
import NavBar from './Component/navbar';

function App() {
  const [start, setStart] = React.useState(false)
  const [render, setRender] = React.useState([])
  const [questions, setQuestions] = React.useState([])
  const [end, setEnd] = React.useState(false)

  React.useEffect(function () {
    fetch('https://opentdb.com/api.php?amount=5&type=multiple')
      .then(res => res.json())
      .then(data => data.results.map(item => {
        return {
          // change of signs to legal
          ...item,
          correct_answer: item.correct_answer.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
          question: item.question.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'"),
          incorrect_answers: item.incorrect_answers.map(item => item.replace(/&amp;/g, "&").replace(/&quot;/g, '"').replace(/&#039;/g, "'")),
          // Add true to correct answer and falsce to uncrrenct answer
          // add Click state and true/false answer
          incorrect_answers: item.incorrect_answers.map(item => { return { answer: item, correct: false, click: false } }),
          correct_answer: [{ answer: item.correct_answer, correct: true, click: false }],
        }
      })
      ).then(data =>
        data.map(item => {
          // Creat answers arr
          return {
            ...item,
            answers: item.correct_answer.concat(item.incorrect_answers)
          }
        }
        )).then(data => {
          return data.map(item => {
            return {
              //Creat obj with usefull data Finish
              category: item.category,
              difficulty: item.difficulty,
              question: item.question,
              answers: shuffle(item.answers) // Random roll arr
            }
          })
        })
      .then(data => setQuestions(data))

  }
    , [render])




  // Random roll arr
  function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
    return array;
  }

  // Render Question 
  const rQuestion = questions.map(item => {
    return (
      <Question
        question={item}
        key={item.question}
        id={item.question}
        click={click}
        end={end} />
    )
  }
  )


  function click(id, idanswer) {
    let clickTrue = questions.map(item => {
      if (id === item.question) {
        return {
          ...item,
          answers: item.answers.map(item => {
            if (idanswer === item.answer) { return { ...item, click: true } }
            else { return { ...item, click: false } }
          })
        }
      }
      else { return { ...item } }
    })
    setQuestions(clickTrue)

  }

  function Start() {
    setStart(true)
    setRender(render + 1)
    setEnd(false)
  }
  function Reset() {
    setStart(false)
    setEnd(false)
  }
  function newQuestion() {
    setRender(render + 1)
    setEnd(false)
  }
  function check() {
    setEnd(true)
  }

  var points = 0
  var howManyQuestion = questions.length
  var checkPoints=questions.map(item=>{
  item.answers.map(item=>{
    if(item.correct && item.click){points++}
  })
  })




  return (
    <div className='main '>
      {start ?
        <div>{rQuestion}<NavBar end={end} points={points} howManyQuestion={howManyQuestion} reset={Reset} new={newQuestion} check={check} /></div>
        :
        <div className="center"> <button className="button-85" role="button" onClick={Start}>START</button></div>}
    </div>
  )
}

export default App;
