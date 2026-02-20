import React from 'react'
import ColorBox from './ColorBox'

const ColorBoxContainer = ({colors}) => {
  return (
    <div className='container'>
        <ColorBox colors={colors}/>
        <ColorBox colors={colors}/>
        <ColorBox colors={colors}/>
    </div>
  )
}

export default ColorBoxContainer