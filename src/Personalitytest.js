import React from 'react'

import Button from '@material-ui/core/Button'

import Question from './Question'

const Personalitytest = () => {
    const questions = {
        'I am the life of the party.': 3,				
        'I feel little concern for others.': 3,				
        'I am always prepared.': 3,			
        'I get stressed out easily.': 3,					
        'I have a rich vocabulary.': 3,					
        "I don't talk a lot.": 3,				
        'I am interested in people.': 3,			
        'I leave my belongings around.': 3,			
        'I am relaxed most of the time.': 3,				
        'I have difficulty understanding abstract ideas.': 3,					
        'I feel comfortable around people.': 3,				
        'I insult people.': 3,			
        'I pay attention to details.': 3,					
        'I worry about things.': 3,				
        'I have a vivid imagination.': 3,				
        'I keep in the background.': 3,				
        "I sympathize with others' feelings.": 3,				
        'I make a mess of things.': 3,			
        'I seldom feel blue.': 3,				
        'I am not interested in abstract ideas.': 3,			
        'I start conversations.': 3,		
        "I am not interested in other people's problems.": 3,				
        'I get chores done right away.': 3,				
        'I am easily disturbed.': 3,			
        'I have excellent ideas.': 3,					
        'I have little to say.': 3,				
        'I have a soft heart.': 3,				
        'I often forget to put things back in their proper place.': 3,					
        'I get upset easily.': 3,					
        'I do not have a good imagination.': 3,					
        'I talk to a lot of different people at parties.': 3,					
        'I am not really interested in others.': 3,					
        'I like order.': 3,					
        'I change my mood a lot.': 3,					
        'I am quick to understand things.': 3,					
        "I don't like to draw attention to myself.": 3,					
        'I take time out for others.': 3,					
        'I shirk my duties.': 3,					
        'I have frequent mood swings.': 3,					
        'I use difficult words.': 3,					
        "I don't mind being the center of attention.": 3,					
        "I feel others' emotions.": 3,					
        'I follow a schedule.': 3,					
        'I get irritated easily.': 3,					
        'I spend time reflecting on things.': 3,					
        'I am quiet around strangers.': 3,					
        'I make people feel at ease.': 3,					
        'I am exacting in my work.': 3,					
        'I often feel blue.': 3,				
        'I am full of ideas.': 3,
     }

    const handleAnswer = (question, answer) => {
		questions[question] = answer
	}

    const question_elements = []

    for (const i in Object.keys(questions)) {
        question_elements.push(
            <Question key={i}
                question={Object.keys(questions)[i]} 
                question_number={String(parseInt(i) + 1)}
                handleAnswer={handleAnswer}/>
            )
    }

    return (
        <div>
            <h2>Personality test</h2>
            <p style={{marginTop: 10, width: '50%'}}>
					This test consists of fifty items that you must rate on how true 
					they are about you on a five point scale where: <br/>
					1 = Strongly Disagree, 2 = Disagree, 3 = Neutral 4 = Agree, and 5 = Strongly Agree. 
			</p>
            {question_elements}
            <Button variant="contained" style={{marginTop: 20, marginBottom: 30}} onClick={() => {
                    fetch('http://localhost:5000//submit_personality_test', {
                    method: 'POST', 
                    headers:{ 'Content-Type': 'application/json',
                                'Accept': 'application/json'
                            }, 
                    body: JSON.stringify(questions)
                    })
                    .then(res => res.json())
                    .then(data => {console.log(data)})
                    }}>
            Submit</Button>
        </div>
    )
}

export default Personalitytest
