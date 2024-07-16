FROM --platform=linux/amd64 node:20-bookworm-slim
WORKDIR /store/fe
COPY ./ /store/fe
RUN ls
RUN npm install
RUN npm run build
CMD ["npm run dev"]