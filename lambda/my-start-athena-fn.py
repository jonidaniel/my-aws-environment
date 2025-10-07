import boto3

# Initiate Boto3 Athena client
athena = boto3.client('athena')

# Starts an Athena query on access_logs_db.jonimakinen_com_logs
# s3://jonimakinen.com/server-access-logs/ acts as the source for access_logs_db
# Is invoked by an EventBridge schedule every day at midnight
def lambda_handler(event, context):
    # Query string to execute
    query = 'SELECT COUNT(*) AS request_count FROM access_logs_db.jonimakinen_com_logs'
    # Database to execute the query against
    DATABASE = 'access_logs_db'
    # Output location for query results
    output = 's3://jonimakinen.com-athena-results/'

    try:
        # Start the query execution
        response = athena.start_query_execution(
            QueryString=query,
            QueryExecutionContext={
                'Database': DATABASE
            },
            ResultConfiguration={
                'OutputLocation': output
            }
        )
        print('MY RESPONSE', response)
    except Exception as e:
        print(e)
        print('Error starting query execution.')
        raise e
