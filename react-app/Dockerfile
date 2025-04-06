FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
EXPOSE 3000
RUN apk update && apk add curl
CMD ["npm", "start"]
