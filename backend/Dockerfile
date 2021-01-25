FROM node:14.15.3 AS node
WORKDIR /app
COPY ./package*.json ./
COPY ./knexProvider.ts ./
COPY ./tsconfig.json ./
RUN npm install pm2 -g 
RUN npm ci 
COPY ./src ./src/
COPY ./app.ts ./
EXPOSE 80
CMD ["npm", "start"]
