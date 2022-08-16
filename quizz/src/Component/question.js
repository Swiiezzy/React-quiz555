import React from "react"


export default function Question(props) {

    console.log(props)
    const { answers, category, difficulty, question } = props.question

    const rQuestion = answers.map(item => <p>{item.answer}</p>)






    return (
        <div>
            <h2>{question}</h2>
            <div>
            {rQuestion}
            </div>
        </div>
    )
}