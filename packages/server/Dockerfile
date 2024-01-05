FROM node:21-alpine

# 创建并设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY ./ /app/

ARG DATABASE_URL

ENV DATABASE_URL=${DATABASE_URL}

CMD ["node", "main"]