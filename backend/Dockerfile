# Usar imagem do Node
FROM node:18

# Definir diretório de trabalho
WORKDIR /app

# Copiar os arquivos do backend
COPY package*.json ./
COPY . .

# Instalar dependências
RUN npm install

# Expor porta
EXPOSE 3000

# Comando para iniciar a API
CMD ["npm", "start"]
