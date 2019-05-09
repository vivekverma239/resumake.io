FROM node:8
# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# Bundle app source
COPY . .
#COPY package*.json ./

RUN npm run build

# If you are building your code for production
# RUN npm ci --only=production


EXPOSE 3000

EXPOSE 3001

CMD [ "npm", "start" ]

