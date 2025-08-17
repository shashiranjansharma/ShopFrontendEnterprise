FROM --platform=linux/amd64 node:22-bookworm-slim
WORKDIR /store/fe
COPY ./ /store/fe
RUN ls
RUN npm install --legacy-peer-deps
RUN npm run build
CMD ["npm run dev"]