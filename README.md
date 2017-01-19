# oTool Crawler

Crawls the dependency graph for a CLI tool and loads every dependency required
into the `./deps` folder so that you can safely move that CLI tool around - great
for Electron application that call system CLIs!

1. Clone this Repo
2. Switch to Node `6.4` or better
3. Update the `ENTRY` variable in the `index.js` to the CLI you'd like to crawl
4. Call `node index.js`
5. You've now got all the deps to `ENTRY` in `./deps`!

Now you can do:
```
DYLD_LIBRARY_PATH=/path/to/copied/deps /path/to/ENTRY-CLI
```
