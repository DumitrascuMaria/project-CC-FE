import React from 'react'
import './index.scss'

export const Question = () => {
  return (
    <div className='question'> 
        <p>question-text</p>
        <div className='answers-container'>
            <div>Answer1</div>
            <div>Answer2</div>
        </div>
    </div>
  )
}
