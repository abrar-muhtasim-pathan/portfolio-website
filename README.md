# Abrar Muhtasim Pathan — Portfolio

A static portfolio website for an Urban Planning, GIS, and Remote Sensing researcher. Pure HTML, CSS, and JavaScript, so it deploys anywhere with no build step.

## Add the profile photo (do this first)

The hero image is currently a placeholder. Replace it with the real photo:

1. Rename the formal photo to `abrar.jpg`.
2. Drop it into `images/profile/` and overwrite the placeholder.

That is the only manual step. Keep the filename `abrar.jpg` and everything else works.

## File structure

```
index.html              Main single-page portfolio
project-landslide.html  Landslide susceptibility (Q1 published)
project-flood.html      Flood susceptibility, Teesta basin (thesis)
project-cyclone.html    Cyclone vulnerability, Chittagong (MCDA/AHP)
project-water.html      Seasonal surface water extent
style.css               All styles
script.js               Nav, lightbox, footer year
vercel.json             Deploy config
assets/                 CV (PDF)
images/                 Profile + project maps
```

## Deploy on Vercel through GitHub

1. Create a new GitHub repository, for example `abrar-portfolio`.
2. Push everything in this folder to the repo:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/abrar-muhtasim-pathan/abrar-portfolio.git
   git push -u origin main
   ```

3. Go to [vercel.com](https://vercel.com), sign in with GitHub, and click **Add New → Project**.
4. Import the repository. Vercel detects it as a static site, so leave the build settings empty and click **Deploy**.
5. The site goes live at `https://your-project.vercel.app`. Every push to `main` redeploys automatically.

## Editing content

- Text, links, and section content live in the HTML files.
- Contact email, LinkedIn, Scholar, ORCID, and GitHub links sit in `index.html` (hero and contact sections).
- To add or swap project images, drop files into the matching `images/projects/pX/` folder and update the gallery list in that project's HTML page.

## Chatbot

A floating "Ask about Abrar" assistant (`chatbot.js`, `chatbot.css`, `api/chat.js`) powered by Ollama Cloud.

**What it knows:** the CV (`assets/Abrar_Muhtasim_Pathan_CV.pdf`) and `assets/Extra_Info.docx`, both read automatically on the server.

**To teach it something new:** open `assets/Extra_Info.docx`, type the information, save, then `git add . && git commit -m "Update extra info" && git push`. Vercel redeploys and the bot knows it. If you update the CV PDF, push it the same way. Do not type private information there; visitors can ask the bot anything it knows.

**Setup:** in Vercel -> Project -> Settings -> Environment Variables add `OLLAMA_API_KEY` (from ollama.com/settings/keys), then redeploy. Optional: `OLLAMA_MODEL` (default `gemma4:31b`).

It only works on the deployed site (or `vercel dev`), not when opening index.html from disk.

**Check what the bot can read:** open `https://YOUR-SITE.vercel.app/api/chat?debug=1`. It shows whether the CV and Extra_Info were read and how many characters each has (for example `"extra":"ok via disk, 75 chars"`). The bot picks up changes within about 2 minutes of a new deploy.
