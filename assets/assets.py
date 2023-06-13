from __future__ import print_function
import csv
import os
import io
import pickle

from google.auth.transport.requests import Request
from google.oauth2.credentials import Credentials
from google_auth_oauthlib.flow import InstalledAppFlow
from googleapiclient.discovery import build
from googleapiclient.errors import HttpError
from googleapiclient.http import MediaIoBaseDownload

# If modifying these scopes, delete the file token.pickle.
# SCOPES = ['https://www.googleapis.com/auth/drive.metadata.readonly']
SCOPES = ['https://www.googleapis.com/auth/drive.readonly']

my_directory = os.path.realpath(os.path.dirname(__file__))


#google drive api login stuff
def api_login():
    creds = None
    # The file token.pickle stores the user's access and refresh tokens, and is
    # created automatically when the authorization flow completes for the first
    # time.
    if os.path.exists('token.pickle'):
        with open('token.pickle', 'rb') as token:
            creds = pickle.load(token)
    # If there are no (valid) credentials available, let the user log in.
    if not creds or not creds.valid:
        if creds and creds.expired and creds.refresh_token:
            creds.refresh(Request())
        else:
            flow = InstalledAppFlow.from_client_secrets_file(
                'credentials.json', SCOPES)
            creds = flow.run_local_server(port=0)
        # Save the credentials for the next run
        with open('token.pickle', 'wb') as token:
            pickle.dump(creds, token)
    return creds

def files_download(folder_id, dest_dir, creds):
    service = build('drive', 'v3', credentials=creds)

    page_token = None
    
    while True:
        # Call the Drive v3 API
        results = service.files().list(
                q=f"'{folder_id}' in parents",
                pageSize=10, fields="nextPageToken, files(id, name, mimeType)",
                pageToken=page_token).execute()
        items = results.get('files', [])
        
        #Check if there are files in folder
        if not items:
            print('No files found.')
        else:
            for item in items:
                #print(u'{0} ({1}) {2}'.format(item['name'], item['id'], item['mimeType']))
                mimetype = item['mimeType']

                #exclude google apps format and only grab images
                if "google-apps" not in mimetype and "image" in mimetype:
                    print(u'{0} ({1}) {2}'.format(item['name'], item['id'], item['mimeType']))
                    file_id = item['id']
                    request = service.files().get_media(fileId=file_id)

                    #download stuff to this directory with this file name
                    with open(dest_dir + '/' + item['name'], 'wb') as fh:
                        downloader = MediaIoBaseDownload(fh, request)
                        done = False
                        while done is False:
                            status, done = downloader.next_chunk()
                            print("Download %d%%." % int(status.progress() * 100))

        page_token = results.get('nextPageToken', None)
        if page_token is None:
            break


creds = api_login()

#read csv
with open('/data/bsr_06122023_limited.csv', encoding='utf-8-sig') as csvfile:
    reader = csv.DictReader(csvfile)
    #loop: read whether the row has an entry in column 'presentation_folder'
    for row in reader:
        presentation_folder = row['presentation_folder']
        #if blank, skip row
        if presentation_folder == "":
            continue
        #if yes, save the 'unique_identifier' value, mkdir with that value as name, and put the downloads there
        else:
            #grab the google folder id from the URL in the 'presentation_folder' column
            folder_id = str(presentation_folder).rsplit('/', 1)[1]
            folder_id = str(folder_id).split('?', 1)[0]
            id_to_dir = row['unique_identifier']
            dest_dir = my_directory + '/media/' + id_to_dir
            if not os.path.exists(dest_dir):
                os.mkdir(dest_dir)
            files_download(folder_id, dest_dir, creds)

