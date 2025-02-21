# Usando Node.js como base
FROM node:18

# Criar diretorio da aplicacao
WORKDIR /app

# Copiar arquivos do projeto
COPY package.json package-lock.json ./

# Instalar dependencias
RUN npm install

# Copiar o restante dos arquivos
COPY . .

# Expor a porta da API
EXPOSE 3000

# Comando para iniciar o servidor
CMD ["npm", "start"]
