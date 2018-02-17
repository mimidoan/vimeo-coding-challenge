# vimeo-coding-challenge

1. Run `npm install` to ensure that all dependencies are installed.
2. Run `npm start` to run challenge program.
    * invalid.csv and valid.csv will be generated in the 'data' folder
    * the start script is written as `node index.js data/clips.csv` - to process a different CSV change `data/clips.csv` to new file path
3. Run tests with `npm test`




_Known Issues_
1. I wasn't unsure how to handle clips with invalid clip_ids so if this is ever the case, then they get written to the 'invalid' file anyway. This way we would still have a way to identify the invalid clips.
2. Duplicates aren't eliminated. If duplicates need to be eliminated, I think it would be more efficient to do it when the valid/invalid CSVs are processed rather than check every file that's parsed by this program.
3. My `Processing Data` test cases write to the invalid/valid files. I wasn't able to figure out a way to test these functions otherwise and `writeTo()` is nestled within my map functions.
