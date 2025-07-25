# Agentsify.AI Website.

A modern web application built with [Next.js](https://nextjs.org/) and [React](https://reactjs.org/).  
Easily scalable, SEO-optimized, and production-ready.


## 📦 Tech Stack

- **Framework:** Next.js (React + SSR)
- **Styling:** Tailwind CSS / CSS Modules
- **Icons:** Lucide React 
- **Deployment:** Netlify


## 📁 Project Structure

```bash
/project-root
├── components/ # All Homepage Components
├── netlify/functions/ # Netlify serverless function handlers (e.g., for email)
├── pages/ # All Tabs of Navbar such as Services, Contact, etc.
├── public/ # All Images used in the web application
├── styles/ # All CSS files
├── netlify.toml # Netlify build and redirect settings  
├── next.config.js # Next.js configuration file
├── package.json # Project metadata and dependencies
├── postcss.config.js # PostCSS config for Tailwind CSS
├── tailwind.config.js # Tailwind CSS configuration
├── variants.js # Animation/styling variants (e.g., for Framer Motion)
└── README.md # Project documentation
```

##  💻 Run your Project Locally

### 1. Clone the repo
```bash
git clone https://github.com/VaishnaviMantri09/Agentsify-DOT-AI-Website.git
cd Agentsify-DOT-AI-Website
```

### 2. Install Dependencies
```bash
npm install 
OR
npm i
```

### 3. Run the development Server Locally.
```bash
npm run dev
```

Visit http://localhost:3000 to view it in your browser.


##  🌐 Netlify Deployment

### 1️. Create a New GitHub Repository

- Push your local Next.js project to a new repository on [GitHub](https://github.com)
- Ensure your repo includes essential files like:
  - `package.json`
  - `next.config.js`
  -  `/__forms.html`
  - Your code and component structure


### 2.Connect Netlify to GitHub

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **“Add new site” → “Import an existing project”**
3. Choose **GitHub** as your Git provider
4. Select the repository you just created


### 3. Form Notifications in Netlify (Before First Deploy)

Before deploying, you need to add your required environment variables:

1. In your Netlify dashboard, go to:
   **Site Settings → Forms → Tab Forms Submission Notifications**
2. Click **“Add Notification”**
3. Add the following:

| Key                                   | Value                             |
| ------------------------------------- | --------------------------------- |
| `Form `                               | `Contact Us or News Letter Form`  |
| `Form `                               | `Contact Us or News Letter Form`  |
| `Subject line for News Subscription ` | `News Letter Subscription by User`|
| `Subject line for Contact Form      ` | `A New User has Contacted you`    |
| `Email `                              | `Respective Email Address`        |

> This step is **required** since my project uses services like Netlify Forms.

### 4. Deploy Your Site

- Netlify will now install dependencies, build your project, and deploy it live 🚀
- All future GitHub commits to the connected branch will trigger automatic redeploys

## Using the API

This project uses a Netlify Forms Function by default to send emails via the Resend API. You don’t need to configure anything else — just ensure the environment variable is set.
Below is the API Link, ([https://docs.netlify.com/manage/forms/setup/])(https://docs.netlify.com/manage/forms/setup/)

## 📄 License
© 2025 Agentsify AI. All rights reserved.
