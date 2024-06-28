FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache ffmpeg


COPY . .

EXPOSE 9000

# Running the app
CMD ["npm", "run", "dev"]
