#  Jenkins Mobile Client


* Standard compliant React Native App

## How to Setup

**Step 1:** git clone this repo:

**Step 2:** cd to the cloned repo:

**Step 3:** Install the Application with `npm install`

**Step 4:** If you run into an issue building the project - check out [https://github.com/facebook/react-native/issues/8584]. You may need to go into XCode and doubleclick on the RCTWebSocket project in your navigator and remove the flags under build settings > custom compiler flags.


## How to Run App

1. cd to the repo
2. Run Build for either OS
  * for iOS
    * run `react-native run-ios`
  * for Android
    * Run Genymotion
    * run `react-native run-android`

## Want to make a contribution?

Check out **https://github.com/derickwarshaw/jenkins/blob/master/CONTRIBUTING.md**

## Troubleshooting
1. ** BUILD FAILED ** 
    * CFBundleIdentifier
        * Typically the result of another process running on the same port. To resolve this find the PID for the process on port 8081
        * run lsof -n -i4TCP:8081 which should return any process running on 8081.
        * run kill -p PID - where PID is the PID of the process identified by the command above.
