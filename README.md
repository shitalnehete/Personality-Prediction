# Personality-Prediction

## Overview
The objective of this project is to predict personality based on the 5 features (BIG5 – O.C.E.A.N.) which stand for Openness, Conscientiousness, Extroversion, Agreeableness, and Neuroticism in order to diagnose psychological problems as well as assessment of candidates. Specifically, the following were defined to achieve the general objective of the study:
1.	Develop an app to screen candidates for college, employment.
2.	To diagnose psychological problems.
3.	Focusing on strengths, weaknesses, temperament, and style of leadership.
4.	Predict personality at workplace as well as for personal inventories.

## About this project
1.	**Text Predictor:**
The Personality of a person can be predicted by inputting any text with the help of this tab. The user interface of the web app gives option to predict the personality based on the text. The text is converted into vectors using tf-idf vectorization then, five models for the Big-Five personality traits are trained using RandomForest Algorithm. The vectors are given input to the models and the score as well as the classification is obtained. 
2.	**Questionnaire:**
In this section, user undergoes 50 questions regarding the O.C.E.A.N model, 10 questions for each personality traits. The score is evaluated based on the answers to the questions and the radar graph for user’s personality is implemented. It can also be termed as Psychometric Assessment.
3.	**Facebook:**
For comparing the personality among the Facebook network or any other social media site network this tab is helpful. Comparison between user’s personality score evaluated from the Questionnaire section and the same models trained for text prediction are used here for evaluation of the scores of the Big-Five personality traits. The comparison is shown in the radar graph too on the user interface.


## Packages to be installed to run the project:
*	Selenium: `conda install -c conda-forge selenium`
*	Scikit-learn: `conda install -c anaconda scikit-learn`
*	Chrome driver: https://chromedriver.chromium.org/downloads (download driver compatible to your chrome and save it on the location of fb_webscrapper.ipynb)
*	MongoDb: https://www.mongodb.com/try/download/community (download 4.4.6 zip file, unzip it and install)
*	Node.js: https://nodejs.org/en/ (download 14.17.0 LTS and install)
*	Flask: `conda install -c anaconda flask`
*	Flask-cors: `conda install -c anaconda flask-cors`


## Steps:
1.	Execute **model.ipynb**
2.	Save the login credentials on the Facebook to access in the file **fb_login_creds.yaml**
3.	Execute **fb_webscrapper.ipynb**
4.	Execute **predict.ipynb**
5.	Execute **app.ipynb**
6.	Run command, `npx create-react-app “project-name”`, on command prompt.
7.	The folder name “project-name” will be created on Desktop. Copy the src folder into the latest created src folder.
8.	Now after copying, run the command, `npm start`, on command prompt.
9.	Now, the front-end will be visible on **localhost:3000**
10.	Save all the .py and .ipynb files in the “project-name” folder.



