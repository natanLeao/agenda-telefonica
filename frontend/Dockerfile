# Usar imagem oficial do NGINX
FROM nginx:alpine

# Copiar arquivo de configuração do NGINX
COPY ./default.conf /etc/nginx/conf.d/default.conf

# Copiar os arquivos estáticos (HTML, CSS, JS) para a pasta pública do NGINX
COPY . /usr/share/nginx/html

# Expor a porta padrão do NGINX
EXPOSE 80

# Comando padrão do container
CMD ["nginx", "-g", "daemon off;"]