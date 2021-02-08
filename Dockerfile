FROM node:14

WORKDIR /app/infinity-records-website

COPY ./package.json ./package-lock.json /app/infinity-records-website/

RUN npm install

COPY . /app/infinity-records-website

RUN npm run build:ssr

EXPOSE 4000

ENV NODE_ENV production
CMD ["npm", "run", "serve:ssr"]