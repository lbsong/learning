This readme is to record my learning path to build chrome/edge extensions with Vue, Typescript and VITE. 

The goal is to build a chrome extension to help learn English. When I read news or any posts online and encounter some vocabulary, I would like to add them into some collection and later I should be reminded to review and practice the usage of the vocabulary. I would like to leverage OpenAI to generate practicing problems. 

## Updates
- **day n + 3** - **[2023-09-02]**: 
  - Figured out how to update vue from chrome onMessage listener funciton: use vue reactive
  - How to render an array in Vue to show the meanings of the vocabulary
  - How to define class with TypeScript and Vue
- **day n + 2** - **[2023-08-27]**: 
  - How to communicate between service worker and side panel, because the function of adding vocabulary is in service worker, and the added vocabulary should be displayed on side panel.
    - might use other technique, as long as side panel displays the added vocabulary
    - sample: https://github.com/GoogleChrome/chrome-extensions-samples/blob/main/functional-samples/sample.sidepanel-dictionary/sidepanel.js
  - How to interact with Vue page
- **day n + 1** - **[2023-08-26]**: 
  - Came up with the idea that the learning path should be recorded. 
  - Trying to figure out where to store the vocabulary: 
    - IndexedDB
      - looks like it's more complex than storage API. 
    - Storage API
      - local: quota limitation is 10MB by default. I will use local storage for now. probably move to other storage in future so that the vocabulary can be synced across devices. 
      - sync: quota limitation is 100KB, 8KB per item
- **day n**: the initial version is done. It can be installed in Chrome, and side panel can be opened.
- ...
- **day 1**: did not remember, did not record