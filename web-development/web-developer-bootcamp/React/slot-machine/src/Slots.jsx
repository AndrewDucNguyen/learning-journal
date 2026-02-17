import React from 'react'

const Slots = ({val1, val2, val3}) => {
    console.log(val1)
    return (
        <div>
            {val1 === val2 && val1 == val3 ? <h1>You win</h1> : <h1>You lose</h1>}
        </div>
    )
}

export default Slots