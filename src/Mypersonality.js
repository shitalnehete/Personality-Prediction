import React from 'react'
import { useState } from 'react';
import Button from '@material-ui/core/Button';

import Personcard from './Personcard';
import Personalitytest from './Personalitytest';

const Mypersonality = (props) => {

    const [take_test, settake_test] = useState(false);

    return (
        <div style={{marginLeft: 30, marginRight: 30}}>
            <h2 style={{marginTop: 10}}> My Personality </h2>
            {/* <p>(O) Openness          (inventive/curious vs. consistent/cautious)  <br/>
            (C) Conscientiousness    (efficient/organized vs. easy-going/careless)  <br/>
            (E) Extroversion         (outgoing/energetic vs. solitary/reserved)  <br/>
            (A) Agreeableness        (friendly/compassionate vs. challenging/detached)  <br/>
            (N) Neuroticism          (sensitive/nervous vs. secure/confident)  <br/>
            </p> */}
            {props.my_personality_data === null ? ' ' : <Personcard person={props.my_personality_data} my_personality={true}/>}
            {take_test  ? <Personalitytest/> : <Button variant="contained" style={{marginTop: 30}} onClick={() => settake_test(true)}>Take Personality Test</Button> }
		</div>
    )
}

export default Mypersonality
