import './App.css';
import React from "react"
import Question from "./Component/question"










function App() {

  const [start, setStart] = React.useState(false)
  const [render, setRender] = React.useState([])
  const [questions, setQuestions] = React.useState([])

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
              answers: shuffle(item.answers)
            }
          })
        })
      .then(data => setQuestions(data))

  }
    , [render])





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

 
  const rQuestion = questions.map(item =>{return (
     <Question question={item} key={item.question} /> 
  )}
 
  )


function Start(){
setStart(item=>!item)
}




  return (



    <div>
        { start ? <div>{rQuestion}</div>: <button onClick={Start}>START</button>}
    </div>

   
  )
}

export default App;
