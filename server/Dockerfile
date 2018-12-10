FROM node:alpine
LABEL maintainer="steffen@klotz.tech"

WORKDIR /app

COPY package*.json ./

RUN npm install pm2@latest -g
RUN npm install --only=production

ARG GIT_HASH
ARG GIT_STATUS
ENV GIT_HASH=$GIT_HASH
ENV GIT_STATUS=$GIT_STATUS

# COPY . .
COPY . .
EXPOSE 80/tcp

ENV PORT=80
ENV NODE_ENV=production

CMD ["npm", "start"]