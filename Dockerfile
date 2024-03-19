FROM node:18-alpine

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app 

COPY ./package.json .

RUN npm install

COPY . .

ARG TMDB_V3_API_KEY

ENV VITE_APP_TMDB_V3_API_KEY=${TMDB_V3_API_KEY}

ENV VITE_APP_API_ENDPOINT_URL="https://api.themoviedb.org/3"

RUN npm run build

EXPOSE 4173

CMD [ "npm", "run", "start" ]
