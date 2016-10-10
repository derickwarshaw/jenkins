#  Jenkins Mobile Client

React-Native Jenkins Client for iOS and Android

## Documentation
Check out the [documentation](https://derickwarshaw.github.io/jenkins/) for the project.

## Setup

### Step 1:
Clone the repo:
`git clone https://github.com/derickwarshaw/jenkins.git`

### Step 2:
Change directories into the repo:
`cd jenkins`

### Step 3:
Install the npm application:
`npm install`

### Step 4:
If you run into an issue building the project, [check out React's issues page.](https://github.com/facebook/react-native/issues/8584)
You may need to go into XCode and doubleclick on the RCTWebSocket project in your navigator and remove the flags under build settings > custom compiler flags.


## Run the App

### Step 1:
Make sure you're in the project folder. If not, change directories into the folder:
`cd jenkins`

### Step 2:
Run Build:
  See [Facebook's official instructions on getting started](https://facebook.github.io/react-native/docs/getting-started.html) for your mobile and development OS instructions

## Want to make a contribution?
[Check this out](https://github.com/derickwarshaw/jenkins/blob/master/CONTRIBUTING.md)

## Troubleshooting
1. ** BUILD FAILED **
    * CFBundleIdentifier
        * Typically the result of another process running on the same port. To resolve this find the PID for the process on port 8081
        * run lsof -n -i4TCP:8081 which should return any process running on 8081.
        * run kill -p PID - where PID is the PID of the process identified by the command above.
