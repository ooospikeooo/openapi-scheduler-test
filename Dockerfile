FROM node:20.11.1-alpine

ARG WORKDIR
WORKDIR ${WORKDIR}
COPY . ./

RUN apk --no-cache add tzdata && \
	cp /usr/share/zoneinfo/Asia/Seoul /etc/localtime && \
	echo "Asia/Seoul" > /etc/timezone \
	apk del tzdata

RUN npm install

RUN npm i -g pm2

RUN npm run build 

# EXPOSE 4000

# CMD ["npx", "npx cross-env NODE_ENV=production node .\build\app.js"]
# CMD ["npm", "run prod"]