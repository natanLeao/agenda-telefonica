# Usa a imagem oficial do Nginx
FROM nginx:latest

# Remove a configuração padrão do Nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copia a configuração personalizada para o Nginx
COPY nginx.conf /etc/nginx/conf.d/

# Copia os arquivos do frontend para a pasta padrão do Nginx
COPY . /usr/share/nginx/html

# Expõe a porta padrão do Nginx
EXPOSE 80

# Comando padrão para rodar o Nginx
CMD ["nginx", "-g", "daemon off;"]
