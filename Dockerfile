FROM node:18-bookworm-slim
WORKDIR /store/fe
COPY ./ /store/fe
RUN ls
RUN npm install
RUN npm run build
CMD ["npm run dev"]