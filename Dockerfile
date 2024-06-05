FROM node:20.9.0-alpine
WORKDIR /app
COPY ./package.json ./
COPY ./package-lock.json ./
RUN npm ci
COPY . .
RUN npm run build
CMD ["npm", "run", "preview"]