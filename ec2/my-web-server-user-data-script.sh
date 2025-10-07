#!/bin/bash -ex

# Install Node.js and NPM
sudo yum -y install nodejs npm

# Download Translation Game from an Amazon S3 bucket, then unzip it
sudo wget -P /home/ec2-user/ https://translation-game.s3.eu-north-1.amazonaws.com/translation-game.zip
sudo unzip -d /home/ec2-user/ /home/ec2-user/translation-game.zip

# Get encrypted host, port, user, password, and database parameters from AWS SSM Parameter Store,
# decrypt them, and save them in a file
aws ssm get-parameters --names DB_HOST DB_PORT DB_USER DB_PW DB_DB --with-decryption >> /home/ec2-user/params.json

# Install backend dependencies and start an HTTP server on port 8080 as a background process
cd /home/ec2-user/
sudo npm i
sudo node index.js &

# Install frontend dependencies and start an application server on port 3000 as a background process
cd /home/ec2-user/frontend/
sudo npm i
sudo npm start &
