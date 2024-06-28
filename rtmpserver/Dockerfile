FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN apk add --no-cache ffmpeg

RUN cp /usr/bin/ffmpeg ./

COPY . .

EXPOSE 8000
EXPOSE 1935

# Running the app
CMD ["npm", "run", "dev"]
