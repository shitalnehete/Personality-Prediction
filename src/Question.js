import React, { useState } from 'react';

import Slider from '@material-ui/core/Slider';
import Paper from '@material-ui/core/Paper';

const Question = (props) => {

    const [answer, setAnswer] = useState(3);

    const handleSlider = (e, value) => {

        // inverse scores for opposite questions
        if (props.question in [
            "I don't talk a lot.",
            'I keep in the background.',
            'I have little to say.',
            "I don't like to draw attention to myself.",
            'I am quiet around strangers.',
            'I am relaxed most of the time.',
            'I seldom feel blue.',
            'I feel little concern for others.',
            'I insult people.',
            "I am not interested in other people's problems.",
            'I am not really interested in others.',
            'I leave my belongings around.',
            'I make a mess of things.',
            'I often forget to put things back in their proper place.',
            'I shirk my duties.',
            'I am exacting in my work.',
            'I have difficulty understanding abstract ideas.',
            'I am not interested in abstract ideas.',
            'I do not have a good imagination.',
         ]) {
             value = 6 - value
         }

        setAnswer(value)
        props.handleAnswer( props.question, value)
    }

    const item_style = {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        padding: 20
    }

     const answer_style = {
         marginLeft: 'auto',
         marginRight: 'auto'
         // position: 'center',
         // float: 'center'
     }

    const text_answers = [
        "Strongly Disagree",
        "Disagree",
        "Neutral",
        "Agree",
        "Strongly Agree"
    ]

    return (

        <div style={{marginTop: 20, width: '35%'}}>
            <Paper>
                <div style={item_style}>
                    <p>
                        {props.question_number}. &nbsp; {props.question}
                    </p>
                    <p style={answer_style}>
                        {text_answers[answer-1]}
                    </p>
                    <p style={answer_style}>
                        {answer}
                    </p>
                    <Slider 
                        value={answer} 
                        style={{height: '7%'}}
                        min={1} 
                        max={5} 
                        step={1}
                        onChange={handleSlider} />	
                </div>
			</Paper>
        </div>
    )
}

export default Question
