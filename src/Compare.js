import React from 'react'
import { useState } from 'react'
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

function Compare(props) {

    
    const [value, setValue] = useState('1');

    const handleChange = (event, newValue) => {
		setValue(newValue);
	};

    const items_style = {
        display: 'flex',
        justifyContent: 'space-around'
    }

    const plot_img_style = {
        position: 'relative',
        height: '75%',
        width: '75%'
    }

    const element_style = {
        display: 'inline-flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginLeft: 'auto'
    }

    const row_style = {
        fontSize: 15,
    }

    const table_style = {
        width: '60%',
        position: 'relative',
        marginLeft: 'auto',
        // float: 'right',
    }
    
    const round_scores = (number) => {
		return Math.round(number * 100)/100
	}

	const round_percs = (number) => {
		return Math.round(number)
	}
    var elements =null

    if (props.personA == null || props.personB == null) {
        elements = null
    }
    else {

        const opn_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>O</span>) Openness</TableCell>
        const con_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>C</span>) Conscientiousness</TableCell>
        const ext_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>E</span>) Extraversion</TableCell>
        const agr_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>A</span>) Agreeableness</TableCell>
        const neu_row = <TableCell style={row_style}>(<span style={{fontWeight: 'bold'}}>N</span>) Neuroticism</TableCell>

        const percentiles = []
        const scores = []

        for (const trait in props.personA.actual_personality_scores['percentiles']) {
            const val = props.personA.actual_personality_scores['percentiles'][trait]
            if (trait === 'O_perc') {
                percentiles.push(
                            <TableRow>
                                {opn_row}
                                <TableCell style={row_style}>{round_percs(val)}</TableCell>
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sOPN)}</TableCell>
                                
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sOPN) - round_percs(val)}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'C_perc') {
                percentiles.push(
                            <TableRow>
                                {con_row}
                                <TableCell style={row_style}>{round_percs(val)}</TableCell>
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sCON)}</TableCell>
                                
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sCON) - round_percs(val)}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'E_perc') {
                percentiles.push(
                            <TableRow>
                                {ext_row}
                                <TableCell style={row_style}>{round_percs(val)}</TableCell>
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sEXT)}</TableCell>
                                
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sEXT) - round_percs(val)}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'A_perc') {
                percentiles.push(
                            <TableRow>
                                {agr_row}
                                <TableCell style={row_style}>{round_percs(val)}</TableCell>
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sAGR)}</TableCell>
                                
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sAGR) - round_percs(val)}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'N_perc') {
                percentiles.push(
                            <TableRow>
                                {neu_row}
                                <TableCell style={row_style}>{round_percs(val)}</TableCell>
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sNEU)}</TableCell>
                                
                                <TableCell style={row_style}>{round_percs(props.personB.pred_percentiles.pred_perc_sNEU) - round_percs(val)}</TableCell>
                            </TableRow>
                        )
            }
        }

        for (const trait in props.personA.actual_personality_scores['scores']) {
            const val = props.personA.actual_personality_scores['scores'][trait]
            if (trait === 'O_score') {
                scores.push(
                            <TableRow>
                                {opn_row}
                                <TableCell style={row_style}>{round_scores(val)}</TableCell>
                                <TableCell style={row_style}>{round_scores(props.personB.status_predictions.pred_sOPN)}</TableCell>
                                <TableCell style={row_style}>{round_scores(round_scores(props.personB.status_predictions.pred_sOPN) - round_scores(val))}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'C_score') {
                scores.push(
                            <TableRow>
                                {con_row}
                                <TableCell style={row_style}>{round_scores(val)}</TableCell>
                                <TableCell style={row_style}>{round_scores(props.personB.status_predictions.pred_sCON)}</TableCell>
                                <TableCell style={row_style}>{round_scores(round_scores(props.personB.status_predictions.pred_sCON) - round_scores(val))}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'E_score') {
                scores.push(
                            <TableRow>
                                {ext_row}
                                <TableCell style={row_style}>{round_scores(val)}</TableCell>
                                <TableCell style={row_style}>{round_scores(props.personB.status_predictions.pred_sEXT)}</TableCell>
                                <TableCell style={row_style}>{round_scores(round_scores(props.personB.status_predictions.pred_sEXT) - round_scores(val))}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'A_score') {
                scores.push(
                            <TableRow>
                                {agr_row}
                                <TableCell style={row_style}>{round_scores(val)}</TableCell>
                                <TableCell style={row_style}>{round_scores(props.personB.status_predictions.pred_sAGR)}</TableCell>
                                <TableCell style={row_style}>{round_scores(round_scores(props.personB.status_predictions.pred_sAGR) - round_scores(val))}</TableCell>
                            </TableRow>
                        )
            }
            if (trait === 'N_score') {
                scores.push(
                            <TableRow>
                                {neu_row}
                                <TableCell style={row_style}>{round_scores(val)}</TableCell>
                                <TableCell style={row_style}>{round_scores(props.personB.status_predictions.pred_sNEU)}</TableCell>
                                <TableCell style={row_style}>{round_scores(round_scores(props.personB.status_predictions.pred_sNEU) - round_scores(val))}</TableCell>
                            </TableRow>
                        )
            }
        }

        const table_header = <TableHead adjustForCheckbox={false} displaySelectAll={false}>
                      <TableRow>
                        <TableCell style={{fontSize: 17}}>Traits</TableCell>
                        <TableCell style={{fontSize: 17}}>Me</TableCell>
                        <TableCell style={{fontSize: 17}}>{props.personB.name}</TableCell>
                        
                        <TableCell style={{fontSize: 17}}>Difference</TableCell>
                      </TableRow>
                    </TableHead>

        elements =<div style={items_style}>
                <div style={element_style}>
                    <img src={props.personB.compare_radar_plot_url} style={plot_img_style} alt="Compare graph" />
                    <h5>Me vs. {props.personB.name}</h5>
                </div>
                <div style={table_style}>
                    <TabContext value={value}>
                        <AppBar position="static">
                        <TabList onChange={handleChange}>
                            <Tab label="Percentiles" value="1" />
                            <Tab label="Scores" value="2" />
                        </TabList>
                        </AppBar>
                        <TabPanel value="1">
                            <Table>
                                {table_header}
                                <TableBody>
                                    {percentiles}
                                </TableBody>
                            </Table>
                        </TabPanel>
                        <TabPanel value="2">
                            <Table>
                                {table_header}
                                <TableBody>
                                    {scores}
                                </TableBody>
                            </Table>
                        </TabPanel>
                    </TabContext>
                </div>
            </div>
    }

    return (
        <div>
        <Paper>
            {elements}
        </Paper>
		</div>
    )
}

export default Compare
