# Nuances of Iframe: Lessons from Contentstack Live Preview

This project is a companion to the talk presented at React India 2024 - Remote Edition. The talk was about the journey of building a live preview feature for a headless CMS and what we learned along the way.

# Project Stucture

The project is divided into two parts:
- Primary application: The main application that hosts the iframes. The application represents the headless CMS. It also contains some pages that represents the user's website to explain the problem one may face while building a live preview feature.
- Secondary application: The application that is hosted inside the iframe. This application represents the user's website hosted on a different domain.
- Socket server: A simple socket server that is used to establish a connection between the primary and secondary application.

# How to run the project

Install the dependencies

```bash
npm install
```

Create the environment files

```bash
npm run setup-env
```

Run the applications

```bash
npm run dev
```

Go to `http://localhost:5173` to view the primary application.

> The primary application runs on port `5173`, the secondary application runs on port `5174` and the socket server runs on port `8000` by default.
