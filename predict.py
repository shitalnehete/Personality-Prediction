import pymongo
import pandas as pd
import pickle
from data_prep import DataPrep
from model import Model
from sklearn.preprocessing import MinMaxScaler
from bs4 import BeautifulSoup
from open_psychometrics import Big5
import scipy.stats as stats
from math import pi
import matplotlib
matplotlib.use('agg')
import matplotlib.pyplot as plt
import datetime


class Predictor():
    def __init__(self):
        self.mc = pymongo.MongoClient()
        self.db = self.mc['pprediction']
        self.fb_statuses = self.db['statuses']

        self.traits = ['OPN', 'CON', 'EXT', 'AGR', 'NEU']
        self.models = {}
        self.load_models()
        
        
        
    def load_df(self):
        entries = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {
            'statuses':1,
            'name':1,
            'status_predictions': 1,
            '_id':0}))

        df_dict = {'NAME': [],
                   'pred_sOPN': [], 'pred_sCON': [], 'pred_sEXT': [], 'pred_sAGR': [], 'pred_sNEU': [],
                   'pred_prob_cOPN': [], 'pred_prob_cCON': [], 'pred_prob_cEXT': [], 'pred_prob_cAGR': [], 'pred_prob_cNEU': [],
                   'pred_cOPN': [], 'pred_cCON': [], 'pred_cEXT': [], 'pred_cAGR': [], 'pred_cNEU': [],
                   'STATUS': []}

        for entry in entries:
            # name = self.anonymize_name(name)
            name = entry['name']
            statuses = entry['statuses']
            predictions = entry['status_predictions']

            #for date, status in statuses.items():
            df_dict['NAME'].append(name)
            #df_dict['DATE'].append(date)
            df_dict['STATUS'].append(statuses)

            status_predictions = predictions
            for key, value in status_predictions.items():
                df_dict[key].append(value)

        df = pd.DataFrame(df_dict)
        #df['STATUS_COUNT'] = df.groupby("NAME")["STATUS"].transform('count')
        #print(df)
        return df
        
    def load_models(self):
        M = Model()
        for trait in self.traits:
            with open('C:/Users/home/Desktop/trial/static/' + trait + '_model.pkl', 'rb') as f:
                self.models[trait] = pickle.load(f)

    def predict(self, X, traits='All', predictions='All'):
        predictions = {}
        if traits == 'All':
            for trait in self.traits:
                pkl_model = self.models[trait]

                
                trait_scores = pkl_model.predict(X, regression=True).reshape(1, -1)
                # scaler = MinMaxScaler(feature_range=(0, 50))
                # print(scaler.fit_transform(trait_scores))
                # scaled_trait_scores = scaler.fit_transform(trait_scores)
                predictions['pred_s'+trait] = trait_scores.flatten()[0]
                # predictions['pred_s'+trait] = scaled_trait_scores.flatten()

                trait_categories = pkl_model.predict(X, regression=False)
                predictions['pred_c'+trait] = str(trait_categories[0])
                # predictions['pred_c'+trait] = trait_categories

                trait_categories_probs = pkl_model.predict_proba(X)
                predictions['pred_prob_c'+trait] = trait_categories_probs[:, 1][0]
                # predictions['pred_prob_c'+trait] = trait_categories_probs[:, 1]
        

        return predictions
    
    def predict_fb_statuses(self):
        statuses = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {'statuses':1, '_id':1, 'name': 1}))

        for entry in statuses:
            entry_id = entry['_id']
            entry_statuses = entry['statuses']
            entry_name = entry['name']

            print('Making predictions for ' + entry_name + "'s statuses...")
            print(entry_statuses)

            predictions_dict = {}
            print('Predicting personality for status "' + entry_statuses + '"')
            predictions_dict = self.predict([entry_statuses])
            
            #print(predictions_dict)

            self.fb_statuses.update_one(
                        {'_id': entry_id},
                        {'$set': {
                            'status_predictions': predictions_dict,
                            }
                        },
                    upsert=True
                    )
    
    def add_percentiles(self):
        df = self.load_df()
        #B = Big5()

        entries = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {
            'status_predictions': 1,
            'name': 1,
            '_id': 0}))

        #avg_scores_labels = ['avg_pred_sOPN', 'avg_pred_sCON', 'avg_pred_sEXT', 'avg_pred_sAGR', 'avg_pred_sNEU']
        scores_labels = ['pred_sOPN', 'pred_sCON', 'pred_sEXT', 'pred_sAGR', 'pred_sNEU']
        #big5_labels = ['O_score', 'C_score', 'E_score', 'A_score', 'N_score']
        percs_labels = ['pred_perc_sOPN', 'pred_perc_sCON', 'pred_perc_sEXT', 'pred_perc_sAGR', 'pred_perc_sNEU']

        for entry in entries:
            name = entry['name']
            #url = entry['url']
            print('Calculating percentiles for ' + name + '...')
            perc_dict = {}
            #try:
            preds = entry['status_predictions']

            for idx, trait_label in enumerate(scores_labels):
                score = preds[trait_label]
                # perc = stats.percentileofscore(B.df[big5_labels[idx]], score)
                perc = stats.percentileofscore(df[scores_labels[idx]], score)
                perc_dict[percs_labels[idx]] = perc
            #print(perc_dict)

            self.fb_statuses.update_one(
                            {'name': name},
                            {'$set': {
                                'pred_percentiles': perc_dict,
                                }
                            },
                        upsert=True
                        )
            #except:
                #print('Error')
     
    
    def create_plot(self, values, name, compare=False):
        
        plt.cla()
        plt.clf()
        traits = [
            'Openness',
            'Conscientiousness',
            'Extraversion',
            'Agreeableness',
            'Neuroticism'
        ]

        N = len(traits)

        # We are going to plot the first line of the data frame.
        # But we need to repeat the first value to close the circular graph:
        # values=person[self.traits].values.flatten().tolist()
        values += values[:1]
        values

        # What will be the angle of each axis in the plot? (we divide the plot / number of variable)
        angles = [n / float(N) * 2 * pi for n in range(N)]
        angles += angles[:1]

        # Initialise the spider plot
        if compare:
            my_personality_data = self.fb_statuses.find_one({'my_personality': {'$exists': True}}, {
                'actual_personality_scores': 1,
                'radar_plot_url': 1,
                '_id': 0})

            ax = self.create_plot(list(my_personality_data['actual_personality_scores']['percentiles'].values()), 'My_Personality')
            filename = 'C:/Users/home/Desktop/trial/public/graph/' + name + '_Compare.png'
        else:
            ax = plt.subplot(111, polar=True)
            filename = 'C:/Users/home/Desktop/trial/public/graph/' + name + '.png'

        # Draw one axe per variable + add labels labels yet
        plt.xticks(angles[:-1], traits, color='grey', size=11)

        # Draw ylabels
        ax.set_rlabel_position(0)
        plt.yticks([10,20,30,40,50,60,70,80,90], ["10","20","30",'40','50','60','70','80','90'], color="grey", size=8)
        plt.ylim(0,100)

        # Plot data
        ax.plot(angles, values, linewidth=1, linestyle='solid')

        # Fill area
        ax.fill(angles, values, 'b', alpha=0.1)
        #print(filename)
        #matplotlib.use('TkAgg')
        #plt.show()
        plt.savefig(filename)

        return ax

        

    def create_radar_plots(self):
        entries = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {
            'name': 1,
            'pred_percentiles': 1,
            '_id': 0}))

        for entry in entries:
            name = entry['name']
            try:
                pred_dict = entry['pred_percentiles']
                self.create_plot(list(pred_dict.values()), name)
                radar_plot_url = 'graph/' + name + '.png'
                compare_radar_plot_url = 'graph/' + name + '_Compare.png'
                
                self.fb_statuses.update_one(
                            {'name': name},
                            {'$set': {
                                'radar_plot_url': radar_plot_url,
                                'compare_radar_plot_url': compare_radar_plot_url,
                                }
                            },
                        upsert=True
                        )
                print('Creating radar plot for ' + name + '...')
            except:
                print('Error!')

    def submit_personality_test(self, answers):
        B = Big5()
        scores = B.handle_personality_test(answers)
        
        self.create_plot(list(scores['percentiles'].values()), 'My_Personality')
        radar_plot_url = 'graph/My_Personality.png'
            
        self.fb_statuses.update_one(
                        {'my_personality': {'$exists': True}},
                        {'$set': {
                            'my_personality': True,
                            'actual_personality_scores': scores,
                            'radar_plot_url': radar_plot_url,
                            }
                        },
                    upsert=True
                    )
        
        entries = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {
            'name': 1,
            'pred_percentiles': 1,
            '_id': 0}))
        
        for entry in entries:
            name = entry['name']
            pred_dict = entry['pred_percentiles']
            self.create_plot(list(pred_dict.values()), name, compare=True)
            
        #print(scores)
        return {
                'actual_personality_scores': scores,
                'radar_plot_url': radar_plot_url,
                }
    
    def my_personality_json(self):
        #entry1 = {"actual_personality_scores": {"percentiles": {"O_perc": 0.0, "C_perc": 0.0, "E_perc": 0.0, "A_perc": 0.0, "N_perc": 0.0}, "scores": {"O_score": 0.0, "C_score": 0.0, "E_score": 0.0, "A_score": 0.0, "N_score": 0.0}}, "radar_plot_url": " "}
        #lst=[]
        entry2 = self.fb_statuses.find_one({'my_personality': {'$exists': True}}, {
            'actual_personality_scores': 1,
            'radar_plot_url': 1,
            '_id': 0})
        
        #return [entry1, entry2]
        #lst.append(entry2)
        #return lst
        #return [entry2.actual_personality_scores.percentiles.O_perc, entry2.actual_personality_scores.percentiles.C_perc]
        return entry2
    
    def my_network_json(self):
        entries = list(self.fb_statuses.find({'my_personality': {'$exists': False}}, {
            'name': 1,
            'status_predictions': 1,
            'profile_pic_url': 1,
            'pred_percentiles': 1,
            'radar_plot_url': 1,
            'compare_radar_plot_url': 1,
            '_id': 0}))
        return entries
    
    def compare_json(self, person):
        pred_dict = person['pred_percentiles']
        name = person['name']
        self.create_plot(list(pred_dict.values()), name, compare=True)
        compare_radar_plot_url = 'graph/' + name + '_Compare.png'
        self.fb_statuses.update_one(
                        {'name': name},
                        {'$set': {
                            'compare_radar_plot_url': compare_radar_plot_url,
                            }
                        },
                    upsert=True
                    )
        return self.my_network_json()



if __name__ == '__main__':
    P = Predictor()
    P.predict_fb_statuses()
    P.add_percentiles()
    P.create_radar_plots()
