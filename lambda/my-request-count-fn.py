import boto3
import urllib.parse
import re

# Initiate Boto3 S3 client
s3 = boto3.client('s3')

# Modifies HTML files (webpages) in s3://jonimakinen.com/ and its subfolders
# to show an updated request count of the website (jonimakinen.com)
# Is invoked every time a file is uploaded to s3://jonimakinen.com/athena-results/
def lambda_handler(event, context):
    # The event file path
    eventBucket = event['Records'][0]['s3']['bucket']['name']
    eventKey = urllib.parse.unquote_plus(event['Records'][0]['s3']['object']['key'], 
                                         encoding='utf-8')

    # Files with three different kinds of extensions are uploaded to
    # s3://jonimakinen.com/athena-results/: .txt, .csv.metadata, and .csv files
    # We want to handle only the CSV files (they contain the new request count)
    # Check if the uploaded file is a CSV file
    if eventKey.split('.').pop() == 'csv':
        # Get the CSV file as a string
        csvFile = getObject(eventBucket, eventKey)
        # Extract the new request count from the file
        # The string file's first number occurrence is saved into newRequestCount
        newRequestCount = re.findall(r'\d+', csvFile)[0]

        # Get all pages as strings
        indexPageEN = getObject('jonimakinen.com', 'index.html')
        indexPageFI = getObject('jonimakinen.com', 'fi.html')
        aboutPageEN = getObject('jonimakinen.com', 'about/en.html')
        aboutPageFI = getObject('jonimakinen.com', 'about/fi.html')
        myResumePageEN = getObject('jonimakinen.com', 'myresume/en.html')
        myResumePageFI = getObject('jonimakinen.com', 'myresume/fi.html')
        myWorkPageEN = getObject('jonimakinen.com', 'mywork/en.html')
        myWorkPageFI = getObject('jonimakinen.com', 'mywork/fi.html')
        contactPageEN = getObject('jonimakinen.com', 'contact/en.html')
        contactPageFI = getObject('jonimakinen.com', 'contact/fi.html')

        # Replace every pages' third number occurrence with the new request count
        modifiedIndexPageEN = indexPageEN.replace(re.findall(r'\d+', indexPageEN)[2], newRequestCount, 1)
        modifiedIndexPageFI = indexPageFI.replace(re.findall(r'\d+', indexPageFI)[2], newRequestCount, 1)
        modifiedAboutPageEN = aboutPageEN.replace(re.findall(r'\d+', aboutPageEN)[2], newRequestCount, 1)
        modifiedAboutPageFI = aboutPageFI.replace(re.findall(r'\d+', aboutPageFI)[2], newRequestCount, 1)
        modifiedMyResumePageEN = myResumePageEN.replace(re.findall(r'\d+', myResumePageEN)[2], newRequestCount, 1)
        modifiedMyResumePageFI = myResumePageFI.replace(re.findall(r'\d+', myResumePageFI)[2], newRequestCount, 1)
        modifiedMyWorkPageEN = myWorkPageEN.replace(re.findall(r'\d+', myWorkPageEN)[2], newRequestCount, 1)
        modifiedMyWorkPageFI = myWorkPageFI.replace(re.findall(r'\d+', myWorkPageFI)[2], newRequestCount, 1)
        modifiedContactPageEN = contactPageEN.replace(re.findall(r'\d+', contactPageEN)[2], newRequestCount, 1)
        modifiedContactPageFI = contactPageFI.replace(re.findall(r'\d+', contactPageFI)[2], newRequestCount, 1)

        # Encode the string pages back into bytes
        readyIndexPageEN = modifiedIndexPageEN.encode("utf-8")
        readyIndexPageFI = modifiedIndexPageFI.encode("utf-8")
        readyAboutPageEN = modifiedAboutPageEN.encode("utf-8")
        readyAboutPageFI = modifiedAboutPageFI.encode("utf-8")
        readyMyResumePageEN = modifiedMyResumePageEN.encode("utf-8")
        readyMyResumePageFI = modifiedMyResumePageFI.encode("utf-8")
        readyMyWorkPageEN = modifiedMyWorkPageEN.encode("utf-8")
        readyMyWorkPageFI = modifiedMyWorkPageFI.encode("utf-8")
        readyContactPageEN = modifiedContactPageEN.encode("utf-8")
        readyContactPageFI = modifiedContactPageFI.encode("utf-8")

        # Send the modified pages back to the S3 bucket
        putObject(readyIndexPageEN, 'jonimakinen.com', 'index.html')
        putObject(readyIndexPageFI, 'jonimakinen.com', 'fi.html')
        putObject(readyAboutPageEN, 'jonimakinen.com', 'about/en.html')
        putObject(readyAboutPageFI, 'jonimakinen.com', 'about/fi.html')
        putObject(readyMyResumePageEN, 'jonimakinen.com', 'myresume/en.html')
        putObject(readyMyResumePageFI, 'jonimakinen.com', 'myresume/fi.html')
        putObject(readyMyWorkPageEN, 'jonimakinen.com', 'mywork/en.html')
        putObject(readyMyWorkPageFI, 'jonimakinen.com', 'mywork/fi.html')
        putObject(readyContactPageEN, 'jonimakinen.com', 'contact/en.html')
        putObject(readyContactPageFI, 'jonimakinen.com', 'contact/fi.html')

# Gets an object, then transforms its body into a string and returns it
def getObject(bucket, key):
    try:
        obj = s3.get_object(
            Bucket=bucket,
            Key=key
        )
        bytesObj = obj["Body"].read()
        strObj = bytesObj.decode("utf-8")
        return strObj
    except Exception as e:
        print(e)
        print('Error getting object {} from bucket {}. Make sure it exists and your bucket is in the same region as this function.'.format(key, bucket))
        raise e

# Puts the modified object (page) back into the S3 bucket
def putObject(body, bucket, key):
    try:
        response = s3.put_object(
            Bucket=bucket,
            Key=key,
            Body=body,
            ContentType='text/html'
        )
        print('MY RESPONSE', response)
    except Exception as e:
        print(e)
        print('Error putting object {} into bucket {}. Make sure it exists and your bucket is in the same region as this function.'.format(key, bucket))
        raise e
