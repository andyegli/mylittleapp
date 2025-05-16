

FROM node:alpine

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Copy source code
COPY . .

# Install app dependencies
RUN apk add --update nodejs npm && npm install -g nodemon dotenv

# Expose application port
EXPOSE 3000
# Run the app starting start or dev
CMD ["npm", "start"]