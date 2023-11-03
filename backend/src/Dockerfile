# Use a imagem base do Node.js
FROM node:21-alpine3.17

# Defina o diretório de trabalho dentro do contêiner
WORKDIR /app

# Copie os arquivos do seu aplicativo para o contêiner
COPY package*.json ./
RUN npm install

# Copie o restante dos arquivos do aplicativo
COPY . .


# Exponha a porta que seu aplicativo está escutando
EXPOSE 4040

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
