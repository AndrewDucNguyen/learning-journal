import React, { useState } from 'react'

const ColorBox = ({colors}) => {
    const randomNum = () => Math.floor(Math.random() * colors.length);
    const [color, setColor] = useState(colors[randomNum()])

    const changeColor = () => {
        setColor(colors[randomNum()])
    }
    return (
        <div className='box' onClick={changeColor} style={{backgroundColor: color}} />
    )
}

export default ColorBox