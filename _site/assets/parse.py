#documentation: last edited YYYY-MM-DD
#dependencies, versions, etc.

import json
import os
import re
import glob
import pandas as pd
from datetime import datetime


# list csvs in folder, find most recent csv by date in filename
list_of_csvs = sorted( filter( os.path.isfile, 
                               glob.glob('data/[0-9]*.csv') ), reverse=True )
# define most recent csv data upload
most_recent_data = list_of_csvs[0]
# define previous version of the data to diff
secondmost_recent_data = list_of_csvs[1]

# grab the date of the most recent csv from its filename
most_recent_data_date = most_recent_data.rsplit('/')[1].split('_')[0]

# set up a blank json file to write to later
json_file_name = most_recent_data_date+"_bsr_processed_data.json"
with open('data/'+ json_file_name,'w') as processed_data:
    print("Created JSON file named: " + json_file_name +".")

# pull in saved Google Sheet csv and render relevant columns in a dataframe w utf-8 encoding
raw_data = pd.read_csv (most_recent_data, encoding= 'utf8', index_col='unique_identifier', dtype={'century':'Int64'}, usecols=['unique_identifier','century','year_to_display','place','revolt_name','description','citations', 'video_link', 'resource_links','latitude','longitude','lat-long_precision','presentation_folder','graphic_artists'])
print(raw_data)



#iterate through cells

#function to go through cells in column 'unique_id' (required)

    #determine if the cell has a unique alphanumeric value

        #if there is no value, generate one and record it in a log

        #if it does, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'century' (required)

    #determine that cell has an integer value in format YYYY

#result_century = raw_data['century'].str.contains(r'^\d{4}$')
#print(result_century)

        #if there is no value, return an error in a log

        #if the value is in the incorrect format, return an error in a log

        #if it does, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'year_to_display' (required)

    #determine that cell has a value in format YYYY or YYYY-YYYY

        #if there is no value, return an error in a log

        #if the value is in the incorrect format, return an error in a log

        #if it does, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'place' (required)

    #determine that cell has a value

        #if it does not, return an error in a log

        #if it does, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'revolt_name' (optional)

    #if the cell has a value, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'description' (required)

    #determine that the cell has a value

        #if it does not, return an error in a log

        #if it does, trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'citations' (required)

    #determine that the cell has a value

        #if it does not, return an error in a log

        #if it does, split on separator into an array and replace separator with /n

            #trim whitespace and other weird stuff

    #save cell value

#function to go through cells in column 'video_link' (optional)

    #if the cell has a value, make sure that it begins with https://

        #if there is no value, return an error in a log

        #if the value is in the incorrect format, return an error in a log

        #if it does, trim whitespace

    #save cell value

#function to go through cells in column 'latitude' (required)

    #determine that the cell has a value and that it is a float

        #if there is no value, return an error in a log

        #if the value is in the incorrect format, return an error in a log

    #save cell value

#function to go through cells in column 'longitude' (required)

    #determine that the cell has a value and that it is a float

        #if there is no value, return an error in a log

        #if the value is in the incorrect format, return an error in a log

    #save cell value

#function to go through cells in column 'lat-long_precision' (optional)

    #if the cell has a value, trim whitespace and convert to lowercase

    #save cell value

#function to go through cells in column '

#function to go through cells in column








#if any errors have been returned and logged, skip export of row and record in log

#export rows that have no errors into JSON file