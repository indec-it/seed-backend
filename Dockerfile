FROM node:22

WORKDIR /srv/app/

COPY package.json ./

COPY . /srv/app/.

RUN npm install --omit=dev --ignore-scripts

EXPOSE 8001

CMD ["node", "index.js"]
