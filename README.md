# Show Travis latest build status using Magic Bulb
[Pure360](http://www.pure360.com/) organized a hackday last Friday and [mpapousGit](https://github.com/mpapousGit), [jameshcooper](https://github.com/jameshcooper), and myself implemented integration between Travis API and Magic Bulb (gift from AngularConnect).  

The idea is very simple:
- connect to the bulb via Web Bluetooth 
- connect to the Travis API using your github account
- constantly check for status of selected build and update the bulb colour

## Installation
1. Run `npm install`.
2. Rename `config.js.template` to `config.js` and update settings.
3. Run `npm start`
4. Have fun!

## Special Thanks
- To [Uri Shaked](https://github.com/urish/web-lightbulb), his article https://medium.com/@urish/start-building-with-web-bluetooth-and-progressive-web-apps-6534835959a6#.tkbbzo831 really helped us.
- AngularConnect organisers for Magic Bulb http://angularconnect.com/2016/iot-gift/

## Please note this is hack quality code, there is a lot of room for improvements:)

![](https://media.giphy.com/media/3oz8xTZuyMsA9rna8g/giphy.gif)
