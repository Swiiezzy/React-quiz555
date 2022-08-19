import React from "react"

export default function NavBar(props) {

    return (
        <div className="navbar">
       {props.end ?      <p>Correct Answers :{props.points}/{props.howManyQuestion}</p> :  ""}
            <div>
            <button onClick={()=>props.check()}>check</button>
            <button onClick={()=>props.new()}>New questions</button>
            <button onClick={()=>props.reset()}>Reset Game</button>
            </div>
        </div>
    )
}