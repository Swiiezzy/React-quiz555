import React from "react"


export default function Question(props) {
    const {click , id} = props
    const { answers, category, difficulty, question} = props.question



    const rQuestion = answers.map(item => <p  key={item.answer} onClick={()=>click(question,item.answer)} className="question">{item.answer}</p>)






    return (
        <div className="question--folder--main button-85">
            <h2>{question}</h2>
            <div className="question--folder ">
            {rQuestion}
            </div>
            <div className="info">
            <p>Category :{category}</p>
            <p>Difficulty :{difficulty}</p>
            </div>
        </div>
    )
}