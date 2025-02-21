# Usa a imagem do Node.js como base
FROM node:18-alpine

# Define o diretorio de trabalho
WORKDIR /app

# Copia os arquivos do projeto
COPY package.json package-lock.json ./

# Instala as dependencias
RUN npm install

# Copia o restante do projeto
COPY . .

# Expoe a porta correta
EXPOSE 5173

# Comando para rodar a aplicacao
CMD ["npm", "run", "dev", "--", "--host"]
