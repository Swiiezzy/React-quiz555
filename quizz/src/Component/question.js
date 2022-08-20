import React from "react"


export default function Question(props) {
    const { click, id, end } = props
    const { answers, category, difficulty, question } = props.question



    const rQuestion = answers.map(item => {
        if (end) {
            if (item.correct) { var color = "green" }
            else if (item.correct === false && item.click === true) { var color = "red" }
            return (<p
                key={item.answer}
                className="question"
                style={{
                    backgroundColor: color
                }}
            >{item.answer}</p>)
        } else {
            return (<p
                key={item.answer}
                onClick={() => click(question, item.answer)}
                className="question"
                style={{
                    backgroundColor: item.click ? "#34568B" : ""
                }}
            >{item.answer}</p>)
        }
    })





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