# Crie o Dockerfile para uma aplicação VITE + REACT
FROM node:18-alpine

# Instalação do Vite
RUN npm install vite

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

ARG TMDB_V3_API_KEY
ENV VITE_APP_TMDB_V3_API_KEY=${TMDB_V3_API_KEY}
ENV VITE_APP_API_ENDPOINT_URL="https://api.themoviedb.org/3"

EXPOSE 8080

# Comando para iniciar o servidor Vite
CMD ["npx", "vite"]
