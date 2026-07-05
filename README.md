Now, if you wanted to set up these to get yourself a YBMP presence, how'd you do so?
Well, clone this repo:
- `git clone https://github.com/PreMiD/Activities.git`
- Head to the folder created... whereever it did create
-   Quick note, this is the PreMiD activities repo with all the default activities you might consider bloat. If you don't need them, might as well delete them.
- Now, download metadata.json, presence.ts and tsconfig.json outta this repo, and place 'em in a folder named *YBMP*.
- After that, go to {**Activities folder**}/websites/Y and place that folder there
- Now, in a terminal, go to the, now placed in the Activities folder, YBMP folder and run the following commands
- `# THIS ONLY NEEDS TO BE RUN ONCE (you should install npm/nodejs before running this and the other command)!
npm clean-install`
- `npm run dev "YBMP"`
- * *BE SURE THAT "Activity Developer" IS ENABLED IN THE PreMiD SETTINGS, YOU'LL NEED TO TOGGLE THIS EVERYTIME YOU OPEN YOUR BROWSER!*
