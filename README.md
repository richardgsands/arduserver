# arduserver
============

A web-based hub to connect devices together

### Getting Started
* Goto 192.xxx.xxx.x and create the devices you want to connect
* Create connections for these devices

### Connections
Can be either:
* If 'MoistureSensor' sends value 5, send 1 to 'Sprinkler'
* If 'MoistureSensor' sends a message, run function(input)
```javascript
function(input) {
	if input < 6 {
		return { device: 'Sprinkler', value: 1 };		// Send 1 to Sprinkler
	} else {
		return null;									// Do nothing
	}
}
```

### Create your own hub
Install sails, clone repository, run npm install and bower install, then lift sails!
```
npm install -g sails
git clone ...
npm install
bower install
sails lift
```