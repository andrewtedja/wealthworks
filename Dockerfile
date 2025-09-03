# Each instruction runs in a new layer, so if layer is changed its not rebuilt and cached

# Use node 22 as base version of the image
FROM node:22

# Goes to the app directory (think of it like a cd command)
WORKDIR /app

# Copy the package.json and package-lock.json (if exists)
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the rest of the app into the container
COPY . .

# Set port environment variable
ENV PORT=3000

# Expose the port (so our computer can access it)
EXPOSE 3000

# Run the app
CMD [ "npm", "run", "dev" ]