# Use a imagem base do Node.js
FROM node:latest

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /src/app

# Copie os arquivos do seu aplicativo para o contêiner
COPY package*.json ./

RUN npm install
# Copie o restante dos arquivos do aplicativo
COPY . .



# Exponha a porta que seu aplicativo está escutando
EXPOSE 4000

# Comando para iniciar o aplicativo
ENTRYPOINT ["npm", "run","dev"]


