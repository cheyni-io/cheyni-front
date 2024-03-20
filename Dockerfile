# Crie o Dockerfile para uma aplicação VITE + REACT
FROM node:18-alpine

# Instalação do Vite
RUN npm install -g vite

WORKDIR /usr/app

COPY package.json ./

RUN npm install && npm cache clean --force

COPY . .

RUN npm run build

ARG TMDB_V3_API_KEY
ENV VITE_APP_TMDB_V3_API_KEY=${TMDB_V3_API_KEY}
ENV VITE_APP_API_ENDPOINT_URL="https://api.themoviedb.org/3"

EXPOSE 8080

USER node

# Comando para iniciar o servidor Vite
CMD ["npm", "run", "preview"]