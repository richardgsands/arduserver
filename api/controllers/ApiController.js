/**
 * ApiController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

module.exports = {
    
	sendMessage: function (req, res) {
        
		if ( req.query.deviceId == null || req.query.value == null ) {
			res.send(500, {error: "Must provide deviceId and value parameters"});
		}

		// Save message
		Message.create({deviceId: req.query.deviceId, value: req.query.value}).done(function(error, message) {
				console.log ("Message created", error, message);
                if (error) {
                    res.send(500, {error: "Error"});
                } else {
                    res.send("Successful");
                }
        });

    }, 


    deleteAllMessages: function(req, res) {

    	Message.destroy()
    			.done(function(error) {

					// Error handling
					if (error) {
						res.send(error);
					} else {
						res.send("All messages deleted");
					}
				});

    },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to ApiController)
   */
  _config: {}

  
};
