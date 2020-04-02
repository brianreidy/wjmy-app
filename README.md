# wjmy
## Requirements 

Our current React-Native App was targeted for ios. Due to some issues getting android's deep-linking working which is explained later in the readme. So here is what you will need.

1. OS X - This repo only contains the iOS implementation right now, and Xcode only runs on Mac.
2. Dowwnload Xcode or if you have it already update it.  [Download it](https://developer.apple.com/xcode/downloads/) from the Mac App Store.
3. [Homebrew](http://brew.sh/) is the recommended way to install node, watchman, and flow.
4. [CocoaPods](https://cocoapods.org/) is an iOS dependency manager (Ruby will need to be installed to install CocoaPods)
5. New to node or npm? `brew install node`
6. We recommend installing [watchman](https://facebook.github.io/watchman/docs/install.html), otherwise you might hit a node file watching bug.  `brew install watchman`
7. [Clone](https://help.github.com/en/github/creating-cloning-and-archiving-repositories/cloning-a-repository) the repository
8.  *optional* [Android Studio](https://developer.android.com/studio) is useful for doing further native android development
9. *optional* [Configure Android's developer options to run on a physical device](https://developer.android.com/studio/debug/dev-options)

## Quick Start
Get started with our WJMY app:
1. Once you have the repo cloned and met all the non optional requirements above, Change directory to the cloned repository . In this case the cloned repository was in the Documents then slab folder.
```
 cd /Documents/slab/wjmy 
``` 

2. Then install all of the packages required to run the project and start the metro bundler. npm install also runs a post install script that will change directory into the ios folder and install the respective pods as well. However this post script command doesn't run if you are adding a new specific package to the code. For example if you wanted to add a swipeable component. You would install the library in the wjmy folder by writing npm install 'react-native-swipeable' and then have to cd ios/ and run pod install. However, since we just running a global npm install we do not have to cd ios/ and install pods as it will do that automaticall
```
npm install
npm start
``` 
3. We recommend that for the first time running the project you open the ios portion of it (i.e. /wjmy/ios) through xcode. In the top left icon there should be a simulator selected next to the project name. Then Click the play button. 
   1. After you run it from xcode you should be able to next time run the command below instead. If you ever run into the problem where you are only experiencing problems on android or ios specificially, we recommend running the code in the respective programs to receive more clear error messages
   ```
   npm run ios
   ```




