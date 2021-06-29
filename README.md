# Drinks app challenge
## How to run
* Considering that react-native and git are already installed follow these steps.
* Run the following command to download de project: `git clone https://github.com/higorbelem/FoxboxProject.git`.
* Navigate into the folder of the project.
* Run `yarn install` to download all the dependencies needed.
* Run `react-native start` to start the Metro server.
* Run `react-native run-android` or `react-native run-ios` to install the app on the desired device.
* Or get the apk file on https://drive.google.com/file/d/17-yEXT7j3Wsf0S-yDB5dqoAR8pAJh9nY/view?usp=sharing for android.
## Libraries used
* `react-native-linear-gradient` was used to achieve the gradient effect on the background.
* `react-native-reanimated` was used to animate the movement of the components.
* `redux` was used to manage states and actions of the application.
## Possible libraries
Libraries that probably would have been used on a more complete application.
* `redux-saga` 
* `axios`
## Improvements on the list
On the Flatlist component (that was used in this project) many props let you adjust the rendering and loading of items, such as maxToRenderPerBatch, updateCellsBatchingPeriod, etc. And of course, limiting the amount of items in the response of the API would improve not only the rendering but also the response time.
