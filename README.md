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
