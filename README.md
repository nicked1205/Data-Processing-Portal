# Data Processing Portal

## Overview

The **Data Processing Portal** is a web application that allows users to provide product URLs from popular eCommerce websites (e.g., Coles, Woolworths, BWS, Kmart, Target) and receive a curated spreadsheet with selected product data. The user can specify which product details they want to extract, such as product name, description, price, and image URL.

This platform scrapes the URLs and then use AI to curate product data from the provided URLs and transform it into a spreadsheet format. The backend handles URL scraping, data processing, and AI integration, while the frontend provides an interface for user input and results.

---

## Features

- Users can provide one or multiple URLs at a time.
- Allows users to specify the data they want to extract from the URLs (e.g., product name, price, description).
- AI is used to transform the scraped data into a user-defined format (e.g., CSV).
- Supports popular eCommerce websites (Coles, Woolworths, BWS, Kmart, Target, etc.).

---

## Prerequisites

Before running the project locally, ensure that you have the following tools installed:

- [Node.js](https://nodejs.org/) (version 14 or later)
- [npm](https://www.npmjs.com/) (Node package manager)

---

## Setup Instructions

### 1. Clone the Repository

Clone the project to your local machine:

```git
git clone https://github.com/nicked1205/Data-Processing-Portal.git
cd data-processing-portal
```

### 2. Install Dependencies

The project has both frontend and backend dependencies. Navigate to the root directory and run the following command to install dependencies for both:

#### Install backend dependencies (Node.js)

```bash
cd ./backend
npm install
```

#### Install frontend dependencies (React)

```bash
cd ./frontend
npm install
```

### 3. Environment Variables

Ensure you have the following environment variables set for the backend:

OPENAI_API_KEY
PORT

Create a .env file in the backend directory and add the following:

```env
OPENAI_API_KEY=yourgptapikey
PORT=4000
```

### 4. Run the Project Locally

To start the backend and frontend servers:

#### Start the backend (Express server)

```bash
cd ./backend
npm start
```

#### Start the frontend (React app)

```bash
cd ./frontend
node server.js
```

Both servers should now be running locally. Open the frontend in your browser by navigating to [http://localhost:3000](http://localhost:3000).

## Running the working solution

Since backend hosting both cost a lot of money and a tonne of setup, these are the steps to run the backend on localhost:

- Follow the run the project locally (You don't need to start the frontend)
- After you have started the backend (Express server), the deployment will work just fine.

## Additional Info

You can read more about the project documentations and isntructions within the website.
