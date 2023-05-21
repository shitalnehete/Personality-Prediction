import React from 'react';
import { useState, useEffect } from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tab from '@material-ui/core/Tab';
import TabContext from '@material-ui/lab/TabContext';
import TabList from '@material-ui/lab/TabList';
import TabPanel from '@material-ui/lab/TabPanel';

import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Textpredictor from './Textpredictor';
import Mypersonality from './Mypersonality';
import Mynetwork from './Mynetwork';


// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//     backgroundColor: theme.palette.background.paper,
//   },
// }));

export default function App() {
  // const classes = useStyles();
  const [value, setValue] = useState('2');
  const [my_network, setmy_network] = useState([]);
  const my_personality_data = {"actual_personality_scores": {"percentiles": {"O_perc": 19.952837364977942, "C_perc": 33.756782798316344, "E_perc": 89.43151275419646, "A_perc": 26.814240073026017, "N_perc": 44.814645773112225}, "scores": {"O_score": 3.0, "C_score": 3.0, "E_score": 3.5, "A_score": 3.0, "N_score": 3.0}}, "radar_plot_url": "graph/My_Personality.png"};
  // const my_personality_data = {"actual_personality_scores": {"percentiles": {"O_perc": 19.952837364977942, "C_perc": 33.756782798316344, "E_perc": 41.460013185252805, "A_perc": 26.814240073026017, "N_perc": 44.814645773112225}, "scores": {"O_score": 3.0, "C_score": 3.0, "E_score": 3.0, "A_score": 3.0, "N_score": 3.0}}, "radar_plot_url": "graph/My_Personality.png"};
  // const [my_personality_data, setmy_personality_data] = useState([]);

  // function loadMyPersonality(){
  //   fetch('http://localhost:5000//my_personality', {
  //     method: 'GET', 
  //     headers: { 'Content-Type': 'application/json',
  //                'Accept': 'application/json'
  //              }
  //   })
  //   .then(res => res.json())
  //   // .then(data => {console.log(data)})
  //   .then(data => { setmy_personality_data(data) }); 
  // }

  function loadMyNetwork(){
    fetch('http://localhost:5000//my_network', {
      method: 'GET', 
      headers: { 'Content-Type': 'application/json',
                 'Accept': 'application/json'
               }
    })
    .then(res => res.json())
    // .then(data => {console.log(data)})
    .then(data => { setmy_network(data) }); 
  }

  useEffect(() => {
    loadMyNetwork();
    // loadMyPersonality();
  }, [])

  // function requestCompare (person) {
  //   fetch('http://localhost:5000//compare', {
  //     method: 'POST', 
  //     headers: { 'Content-Type': 'application/json',
  //                 'Accept': 'application/json'
  //               }, 
  //     body: JSON.stringify(person)
  //   })
  //   .then(res => res.json())
  //   // .then(data => {console.log(data)})
  //   // .then(data => { setmy_network(data) }); 
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <h2>Personality Analyser</h2>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell><b>Traits</b></TableCell>
            <TableCell><b>less than 50</b></TableCell>
            <TableCell><b>greater than 50</b></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
              <TableCell>Openness</TableCell>
              <TableCell>pragmatic/data-driven</TableCell>
              <TableCell>creative/curious</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Conscientiousness</TableCell>
              <TableCell>easy-going/flexible</TableCell>
              <TableCell>stubborn/obession</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Extraversion</TableCell>
              <TableCell>reserved/introvert</TableCell>
              <TableCell>energetic/extrovert</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Agreeableness</TableCell>
              <TableCell>competitive/challenging</TableCell>
              <TableCell>friendly/coorperative</TableCell>
          </TableRow>
          <TableRow>
              <TableCell>Neuroticism</TableCell>
              <TableCell>reactive/excitable</TableCell>
              <TableCell>uninspiring/unconcerned</TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <TabContext value={value}>
        <AppBar position="static">
          <TabList onChange={handleChange}>
            <Tab label="My Network" value="1" />
            <Tab label="My Personality" value="2" />
            <Tab label="Text Predictor" value="3" />
          </TabList>
        </AppBar>
        <TabPanel value="1"><Mynetwork my_network={my_network} my_personality_data={my_personality_data}/></TabPanel>
        {/* {my_personality_data.map((person) => {
          if(person.actual_personality_scores.percentiles.O_perc !== 0.0){
            return <TabPanel value="2"><Mypersonality my_personality_data={my_personality_data} /></TabPanel>
            // return person.actual_personality_scores.percentiles.O_perc;
          }
          })} */}
        <TabPanel value="2"><Mypersonality my_personality_data={my_personality_data} /></TabPanel>
        <TabPanel value="3"><Textpredictor /></TabPanel>
       </TabContext>

    </div>
  );
}