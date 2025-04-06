FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
