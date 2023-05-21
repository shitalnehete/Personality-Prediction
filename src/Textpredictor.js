import React from 'react'
import { useState } from 'react'

import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableHead from '@material-ui/core/TableHead';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';


function Textpredictor() {

    const [content, setcontent] = useState(" ");
    const [predictions, setpredictions] = useState(false);

    const handleChange = (e) => {
        const content1 = e.target.value;
		    setcontent(content1)
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!content) return;
        fetch('http://localhost:5000//predict', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json',
                                'Accept': 'application/json'
                              }, 
                    body: JSON.stringify(content)
                    })
                    .then(res => res.json())
                    // .then(data => {console.log(data)})
                    .then(data => { setpredictions(data) });
    }

    var predictions_table = null
    if (predictions !== false) {
      predictions_table = <Table>
        <TableHead>
          <TableRow>
            <TableCell>Prediction</TableCell>
            <TableCell>Openness</TableCell>
            <TableCell>Conscientiousness</TableCell>
            <TableCell>Extraversion</TableCell>
            <TableCell>Agreeableness</TableCell>
            <TableCell>Neuroticism</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell>Probability of Trait</TableCell>
            <TableCell>{parseFloat(predictions.pred_prob_cOPN).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_prob_cCON).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_prob_cEXT).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_prob_cAGR).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_prob_cNEU).toFixed(5)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Trait Category</TableCell>
            <TableCell>{predictions.pred_cOPN}</TableCell>
            <TableCell>{predictions.pred_cCON}</TableCell>
            <TableCell>{predictions.pred_cEXT}</TableCell>
            <TableCell>{predictions.pred_cAGR}</TableCell>
            <TableCell>{predictions.pred_cNEU}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell>Trait Score</TableCell>
            <TableCell>{parseFloat(predictions.pred_sOPN).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_sCON).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_sEXT).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_sAGR).toFixed(5)}</TableCell>
            <TableCell>{parseFloat(predictions.pred_sNEU).toFixed(5)}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    }

    return (
        <div>
            <h2>Text Predictor</h2>
            <p>
                Predict the personality of the author of a given piece of text.
            </p>
            <div>
                <TextField placeholder="Input Text"
                        multiline
                        onChange={handleChange}
                        value={content}/>
            </div>
            <Button variant="contained" type="button" onClick={handleSubmit}>Predict</Button>
            <div>
                {predictions_table}
            </div>
        </div>
    )
}

export default Textpredictor
