<p align="center">
  <img src="public/logo.png" width="100" alt="Project Logo" />
</p>

<h1 align="center">authentication-frontend</h1>

<p align="center">
  <img src="https://img.shields.io/github/languages/top/icarodrx/authentication-frontend?style=default&color=61DAFB" alt="Top Language Badge" />
  <img src="https://img.shields.io/github/languages/count/icarodrx/authentication-frontend?style=default&color=61DAFB" alt="Languages Count Badge" />
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=flat&logo=react&logoColor=61DAFB" alt="React Badge" />
  <img src="https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white" alt="Vite Badge" />
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=flat&logo=react-router&logoColor=white" alt="React Router Badge" />
  <img src="https://img.shields.io/badge/Toastify-000000?style=flat&logo=react&logoColor=white" alt="React Toastify Badge" />
  <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat&logo=javascript&logoColor=black" alt="JavaScript Badge" />
  <img src="https://img.shields.io/badge/AWS_S3-569A31?style=flat&logo=amazon-aws&logoColor=white" alt="AWS S3 Badge" />
</p>

## Table of Contents

1. [Table of Contents](#table-of-contents)
2. [Overview](#overview)
3. [Demo](#demo)
4. [Project Structure](#project-structure)
5. [Getting Started](#getting-started)
   - 5.1. [Prerequisites](#prerequisites)
   - 5.2. [Installation](#installation)
   - 5.3. [Usage](#usage)
   - 5.4. [Deployment to AWS S3](#deployment-to-aws-s3)
6. [Routing Configuration for S3](#routing-configuration-for-s3)

## Overview

This repository hosts **authentication-frontend**, a modern React Single Page Application (SPA) built with **Vite**, using **React Router v7** for navigation and **React Toastify** for elegant feedback to users. It's hosted on **AWS S3** and connects to the [`authentication-backend`](https://github.com/icarodrx/authentication-backend) API.

You can access the deployed application at:

http://authenticationsystem.s3-website-us-east-1.amazonaws.com/login

The project implements a complete authentication flow:

- **Login Page:** Log in with existing credentials.
- **Register Page:** Create a new user account.
- **Home Page:** View and update personal data, including password change.
- **Forgot Password:** Request a reset email.
- **Reset Password:** Set a new password using a secure token.

Client-side routing is managed entirely with **React Router**, allowing smooth navigation without full page reloads.

## Demo

[![Demo Video](https://img.youtube.com/vi/S3Psf9_8ppA/0.jpg)](https://www.youtube.com/watch?v=S3Psf9_8ppA)

## Project Structure

```sh
└── authentication-frontend/
    ├── public/
    ├── src/
    │   ├── assets/
    │   ├── components/
    │   ├── hooks/
    │   ├── pages/
    │   ├── services/
    │   ├── utils/
    │   ├── App.css
    │   ├── App.jsx
    │   ├── constants.js
    │   ├── index.css
    │   └── main.jsx
    ├── .env
    ├── index.html
    ├── package.json
    └── vite.config.ts
```

## Getting Started

### Prerequisites

- **Node.js:** v18 or later
- **npm** or **yarn**
- Access to the [`authentication-backend`](https://github.com/icarodrx/authentication-backend) running API

### Installation

1. **Clone the repository:**

```sh
git clone https://github.com/icarodrx/authentication-frontend
```

2. **Navigate into the project folder:**

```sh
cd authentication-frontend
```

3. **Install dependencies:**

```sh
npm install
# or
yarn install
```

4. **Environment Variables:**

This project uses a `.env` file already committed to the repository.  
If needed, update the API base URL inside `.env`:

```env
VITE_API_BASE_URL=https://your-backend-api.com
```

### Usage

To run locally in development mode:

```sh
npm run dev
# or
yarn dev
```

To build for production:

```sh
npm run build
# or
yarn build
```

To preview the production build locally:

```sh
npm run preview
```

### Deployment to AWS S3

After building the project, upload the contents of the `dist/` directory to your AWS S3 bucket configured for static website hosting:

```sh
aws s3 sync dist/ s3://your-s3-bucket-name --delete
```

## Routing Configuration for S3

Because this app uses **React Router**, you must configure your S3 bucket to redirect all routes to `index.html`. Otherwise, refreshing or deep-linking to a route like `/register` will result in a 404.

### ✅ Example S3 Static Website Hosting Settings:

- **Index document:** `index.html`
- **Error document:** `index.html`

This ensures React Router can handle client-side routing properly.

<p align="right">
  <a href="#top">
    <img src="https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square" alt="Back to Top" />
  </a>
</p>

[back-to-top]: https://img.shields.io/badge/-BACK_TO_TOP-151515?style=flat-square

---
