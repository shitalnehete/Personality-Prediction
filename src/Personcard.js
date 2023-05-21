import React from 'react'
import { useState } from 'react'
import Avatar from '@material-ui/core/Avatar';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import Compare from './Compare';


function Personcard(props) {

    const [compare, setCompare] = useState(false);
	const [value, setValue] = useState('1');

	const handleChange = (event, newValue) => {
		setValue(newValue);
	};

	const handleCompare =(e) => {
		// if (!compare) {
		// 	e.preventDefault()
		// 	fetch('http://localhost:5000//compare', {
		// 	method: 'POST', 
		// 	headers: { 'Content-Type': 'application/json',
		// 				'Accept': 'application/json'
		// 				}, 
		// 	body: JSON.stringify(props.person)
		// 	})
		// 	.then(res => res.json())
		// 	// .then(data => {console.log(data)})
		// 	// .then(data => { setmy_network(data) });
		// }
		setCompare(!compare);
	}

    // const annonymizeNames = (string) => {
	//     const names = string.split(' ')
	//     initials = names[0].substring(0, 1).toUpperCase().concat('.');
	    
	//     if (names.length > 1) {
	//         initials += names[names.length - 1].substring(0, 1).toUpperCase().concat('.');
	//     }
	//     return initials;
    // }

    const round_probs = (number) => {
		return Math.round(number * 10000)/100
	}

	const round_scores = (number) => {
		return Math.round(number * 100)/100
	}

	const round_percs = (number) => {
		return Math.round(number)
	}
	
	const row_style = {
		fontSize: 15,
	}

	const item_style = {
		paddingTop: 30,
	}

	const card_style = {
		height: '50%',
		display: 'flex',
		justifyContent: 'space-around'
	}

	const preds_style = {
		width: '35%',
		position: 'relative',
		marginLeft: 'auto',
		// float: 'right',
	}

	const avatar_style = {
		margin: 20,
	}

	const profile_style = {
		margin: 'auto',
		display: 'inline-flex',
		flexDirection: 'column',
		alignItems: 'center',
	}

	const plot_style = {
		position: 'relative', 
		margin: 'auto',
	}

	const plot_img_style = {
		position: 'relative',
		height: '65%',
		width: '65%',
	}

    const opn_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>O</span>) Openness</TableCell>
    const con_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>C</span>) Conscientiousness</TableCell>
    const ext_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>E</span>) Extraversion</TableCell>
    const agr_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>A</span>) Agreeableness</TableCell>
    const neu_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>N</span>) Neuroticism</TableCell>

	var compare_element = null
	var compare_card = null
	var card_elements = null

    if (compare) {
        compare_element = <Button variant="contained" style={{margin: 10}} onClick={handleCompare}>Cancel</Button>
        compare_card = <Compare personA={props.my_personality_data} personB={props.person} />
    }
    else {
        compare_element = <Button variant="contained" style={{margin: 10}} onClick={handleCompare}>Compare</Button>
        compare_card = null
    }

	var trait = null
	var val = null
	var pred_type = null
	var pred = null

    if(props.my_personality){
        var actual_percentiles = []
	    var actual_scores = []
	    	for (trait in props.person.actual_personality_scores.percentiles) {
		    	val = props.person.actual_personality_scores['percentiles'][trait]
		    	if (trait === 'O_perc') {
			    	actual_percentiles.push(
			    				<TableRow>
				    				{opn_row}
						    		<TableCell style={row_style}>{round_percs(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'C_perc') {
			    	actual_percentiles.push(
			    				<TableRow>
				    				{con_row}
						    		<TableCell style={row_style}>{round_percs(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'E_perc') {
			    	actual_percentiles.push(
			    				<TableRow>
				    				{ext_row}
						    		<TableCell style={row_style}>{round_percs(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'A_perc') {
			    	actual_percentiles.push(
			    				<TableRow>
				    				{agr_row}
						    		<TableCell style={row_style}>{round_percs(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'N_perc') {
			    	actual_percentiles.push(
			    				<TableRow>
				    				{neu_row}
						    		<TableCell style={row_style}>{round_percs(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
		    }

		    for (trait in props.person.actual_personality_scores['scores']) {
		    	 val = props.person.actual_personality_scores['scores'][trait]
		    	if (trait === 'O_score') {
			    	actual_scores.push(
			    				<TableRow>
				    				{opn_row}
						    		<TableCell style={row_style}>{round_scores(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'C_score') {
			    	actual_scores.push(
			    				<TableRow>
				    				{con_row}
						    		<TableCell style={row_style}>{round_scores(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'E_score') {
			    	actual_scores.push(
			    				<TableRow>
				    				{ext_row}
						    		<TableCell style={row_style}>{round_scores(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'A_score') {
			    	actual_scores.push(
			    				<TableRow>
				    				{agr_row}
						    		<TableCell style={row_style}>{round_scores(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (trait === 'N_score') {
			    	actual_scores.push(
			    				<TableRow>
				    				{neu_row}
						    		<TableCell style={row_style}>{round_scores(val)}</TableCell>
						    	</TableRow>
				    		)
			    }
		    }

		card_elements = <div style={card_style}>
						<div style={plot_style}>
							<img src={props.person.radar_plot_url} alt="Radar Graph" style={plot_img_style}></img>
						</div>
						<div style={preds_style}>
							<TabContext value={value}>
								<AppBar position="static">
								<TabList onChange={handleChange}>
									<Tab label="Percentiles" value="1" />
									<Tab label="Scores" value="2" />
								</TabList>
								</AppBar>
								<TabPanel value="1">
									<Table>
										<TableBody>
											{actual_percentiles}
										</TableBody>
									</Table>
									</TabPanel>
								<TabPanel value="2">
									<Table>
										<TableBody>
											{actual_scores}
										</TableBody>
									</Table>
								</TabPanel>
							</TabContext>
						</div>
					</div>
    }

	else{
		var score_predictions = []
		var prob_predictions = []
		var percentile_predictions = []

		    for (pred_type in props.person.pred_percentiles) {
		    	 pred = props.person.pred_percentiles[pred_type]
		    	if (pred_type === 'pred_perc_sOPN') {
			    	percentile_predictions.push(
			    				<TableRow>
				    				{opn_row}
						    		<TableCell style={row_style}>{round_percs(pred)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (pred_type === 'pred_perc_sCON') {
			    	percentile_predictions.push(
			    				<TableRow>
				    				{con_row}
						    		<TableCell style={row_style}>{round_percs(pred)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (pred_type === 'pred_perc_sEXT') {
			    	percentile_predictions.push(
			    				<TableRow>
				    				{ext_row}
						    		<TableCell style={row_style}>{round_percs(pred)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (pred_type === 'pred_perc_sAGR') {
			    	percentile_predictions.push(
			    				<TableRow>
				    				{agr_row}
						    		<TableCell style={row_style}>{round_percs(pred)}</TableCell>
						    	</TableRow>
				    		)
			    }
			    if (pred_type === 'pred_perc_sNEU') {
			    	percentile_predictions.push(
			    				<TableRow>
				    				{neu_row}
						    		<TableCell style={row_style}>{round_percs(pred)}</TableCell>
						    	</TableRow>
				    		)
			    }
		    }

		    for (pred_type in props.person.status_predictions) {
		    	 pred = props.person.status_predictions[pred_type]

		    	if (pred_type !== 'DATE' && pred_type !== 'NAME') {
		    		// Scores
		    		if (pred_type === 'pred_sOPN') {
		    			score_predictions.push(
		    				<TableRow>
			    				{opn_row}
					    		<TableCell style={row_style}>{round_scores(pred)}</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_sCON') {
		    			score_predictions.push(
		    				<TableRow>
			    				{con_row}
					    		<TableCell style={row_style}>{round_scores(pred)}</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_sEXT') {
		    			score_predictions.push(
		    				<TableRow>
			    				{ext_row}
					    		<TableCell style={row_style}>{round_scores(pred)}</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_sAGR') {
		    			score_predictions.push(
		    				<TableRow>
			    				{agr_row}
					    		<TableCell style={row_style}>{round_scores(pred)}</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_sNEU') {
		    			score_predictions.push(
		    				<TableRow>
			    				{neu_row}
					    		<TableCell style={row_style}>{round_scores(pred)}</TableCell>
					    	</TableRow>
			    		)
		    		}

		    		// Probabilites
		    		if (pred_type === 'pred_prob_cOPN') {
		    			prob_predictions.push(
		    				<TableRow>
			    				{opn_row}
					    		<TableCell style={row_style}>{round_probs(pred)}%</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_prob_cCON') {
		    			prob_predictions.push(
		    				<TableRow>
			    				{con_row}
					    		<TableCell style={row_style}>{round_probs(pred)}%</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_prob_cEXT') {
		    			prob_predictions.push(
		    				<TableRow>
			    				{ext_row}
					    		<TableCell style={row_style}>{round_probs(pred)}%</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_prob_cAGR') {
		    			prob_predictions.push(
		    				<TableRow>
			    				{agr_row}
					    		<TableCell style={row_style}>{round_probs(pred)}%</TableCell>
					    	</TableRow>
			    		)
		    		}
		    		if (pred_type === 'pred_prob_cNEU') {
		    			prob_predictions.push(
		    				<TableRow>
			    				{neu_row}
					    		<TableCell style={row_style}>{round_probs(pred)}%</TableCell>
					    	</TableRow>
			    		)
		    		}
		    	}	    	
		    }

	    	card_elements = <div style={card_style}>
					    	<div style={profile_style}>
				    			<a href={props.person.url} target="_blank" rel="noopener noreferrer">
									<Avatar style={avatar_style} src={props.person.profile_pic_url}/>
				    			</a>
				    			<a href={props.person.url} target="_blank" rel="noopener noreferrer">
				    				<span>{props.person.name}</span>
				    			</a>
				    			{compare_element}
				    		</div>
				    		<div  style={plot_style}>
				    			<img src={props.person.radar_plot_url} alt="Radar Graph" style={plot_img_style}>
				    			</img>
				    		</div>
			    			<div style={preds_style}>
							<TabContext value={value}>
								<AppBar position="static">
								<TabList onChange={handleChange}>
									<Tab label="Percentiles" value="1" />
									<Tab label="Scores" value="2" />
									<Tab label="Probabilites" value="3" />
								</TabList>
								</AppBar>
								<TabPanel value="1">
									<Table>
										<TableBody>
											{percentile_predictions}
										</TableBody>
									</Table>
									</TabPanel>
								<TabPanel value="2">
									<Table>
										<TableBody>
											{score_predictions}
										</TableBody>
									</Table>
								</TabPanel>
								<TabPanel value="3">
									<Table>
										<TableBody>
											{prob_predictions}
										</TableBody>
									</Table>
								</TabPanel>
							</TabContext>
			    			</div>
			    		</div>
	}

    return (
        <div style={item_style}>
			<Paper>
				<div>
					{card_elements}
				</div>
			</Paper>
			{compare_card}
	    </div>
    )
}


export default Personcard
