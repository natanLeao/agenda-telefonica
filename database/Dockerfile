# Usando a imagem oficial do MySQL
FROM mysql:latest

# Definir variáveis de ambiente para o MySQL
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=agenda
ENV MYSQL_USER=root
ENV MYSQL_PASSWORD=root

# Copiar script de inicialização (se houver)
COPY ./init.sql /docker-entrypoint-initdb.d/

# Expor a porta do MySQL
EXPOSE 3306
