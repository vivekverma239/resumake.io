FROM node:8
# Create app directory
WORKDIR /usr/src/app

RUN apt-get update
RUN apt-get install -y texlive-full


# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source


# If you are building your code for production
# RUN npm ci --only=production



EXPOSE 3001
EXPOSE 3000

CMD [ "npm", "start" ]
