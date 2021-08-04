# Setup
1. Copy *.env* file as *.env.local*
2. Replace REACT_APP_API_ENDPOINT with the correct URL (in *.env.local*)
# How to run (development mode)
```bash
npm i
npm start
```
The browser should launch automatically but here is a link just in case [http://localhost:3000](http://localhost:3000)
## How to recompile SASS to CSS
```bash
npm run sass
```
# How to build it and run in production mode
```bash
npm run build
serve -s build
```
# Used npm and node versions
```bash
node -v
v15.4.0
```
```bash
npm -v
7.20.1
```
# Notes
- *redux-form* doesn't work with React v17 so I decided to use *final-form*
- It took me ~3 hours to do this app (excluding `npm install`ation and deployment)
- Live demo: [dishes-demo.hubertpawlak.dev](https://dishes-demo.hubertpawlak.dev) (deployed on Vercel)