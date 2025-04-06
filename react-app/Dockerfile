FROM node:20-alpine
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
RUN npm install react-scripts
RUN ls -l /app/node_modules
COPY . .
EXPOSE 3000
CMD ["npm", "start"]
