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
  - `netlify.toml` (optional, but recommended)
  - Your code and component structure


### 2.Connect Netlify to GitHub

1. Go to [https://app.netlify.com](https://app.netlify.com)
2. Click **“Add new site” → “Import an existing project”**
3. Choose **GitHub** as your Git provider
4. Select the repository you just created


### 3.Add Environment Variables (Before First Deploy)

Before deploying, you need to add your required environment variables:

1. In your Netlify dashboard, go to:
   **Site Settings → Environment Variables**
2. Click **“Add a variable”**
3. Add the following:

| Key              | Value                        |
| ---------------- | ---------------------------- |
| `RESEND_API_KEY` | `your_actual_resend_api_key` |

> This step is **required** if your project uses services like Resend for email or any serverless functions.


### 4. Deploy Your Site

- Netlify will now install dependencies, build your project, and deploy it live 🚀
- All future GitHub commits to the connected branch will trigger automatic redeploys


##  📤 Setting Up Resend Email Service

To enable email sending (e.g. from the contact form), this project uses [Resend](https://resend.com) — a developer-friendly email API.


## Steps to Create a Resend Account and Get Your API Key

1. **Sign Up for Resend**
   - Visit [https://resend.com](https://resend.com)
   - Create an account (free plan available)

2. **Verify Your Domain (Optional but Recommended)**
   - Go to the **"Domains"** section in Resend
   - Add your domain and follow the DNS instructions if you want to send emails from your own domain (e.g., `you@yourdomain.com`)
   - Or skip this to use Resend’s default domain for testing

3. **Get Your API Key**
   - Navigate to **API Keys** in the Resend dashboard
   - Click **"Create API Key"**
   - Give it a name like `"Netlify Contact Form"`
   - Copy the key (you won’t see it again!)


## 🔐 Add the API Key to Netlify

Before deploying your site:

1. Go to your project in Netlify
2. Navigate to **Site Settings → Environment Variables**
3. Add the following variable:

| Key              | Value               |
| ---------------- | ------------------- |
| `RESEND_API_KEY` | `your-api-key-here` |


## Using the API

This project uses a Netlify Function (`/netlify/functions/send-email`) to send emails via the Resend API. You don’t need to configure anything else — just ensure the environment variable is set.

 📌 You can find more on Resend’s docs here: [https://resend.com/docs](https://resend.com/docs)


## 📄 License

© 2025 Agentsify AI. All rights reserved.
