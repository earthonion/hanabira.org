# https://www.locofy.ai/blog/create-a-docker-image-of-your-nextjs-app

FROM node:18-alpine
RUN mkdir -p /app
WORKDIR /app
COPY . .
RUN npm install sharp
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
#CMD ["/bin/sh", "-c", "sleep 120 && npm start"]
