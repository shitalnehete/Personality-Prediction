import React from 'react'
import Personcard from './Personcard';

const Mynetwork = (props) => {

    const my_network_rows = []
    props.my_network.map((person) => {
        if (person === undefined || person.status_predictions === undefined || person.pred_percentiles === undefined) {
          console.log('UNDEFINED PERSON')
        }
        else {
            my_network_rows.push(<Personcard 
                person={person} 
                requestCompare={props.requestCompare}
                my_personality={false} 
                my_personality_data={props.my_personality_data}/>)
        }
        return 1;
      }
    )

    return (
        <div>
            {my_network_rows}
        </div>
    )
}

export default Mynetwork
