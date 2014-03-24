var app = angular.module('app',[]);
 
app.controller('IndexCtrl', ['$scope', '$http', function($scope, $http) {

	// DEVICES
	$http.get('/device').success(function(data) {
		$scope.devices = data;
	});
	$scope.newDeviceId = undefined;

	$http.get('/connection').success(function(data) {
		$scope.connections = data;
	});
	$scope.newConn = {};

	$scope.createNewDevice = function() {
		// Push if device ID does not already exist
		if ( $scope.newDeviceId != null && $scope.devices.indexOf( $scope.newDeviceId ) == -1 ) {
			var newDevice = { deviceId: $scope.newDeviceId };
			
			$http.post(
				'/device/create',
				newDevice
			).success(function(data) {
				$scope.devices.push( data );
			});

			$scope.newDeviceId = undefined;
		}
	}


	// CONNECTIONS
	$scope.createNewConnection = function() {
		if ( $scope.newConn.input.device != null && $scope.newConn.input.value != null ) {
			var newConnection = { input : { device: $scope.newConn.input.device, value: $scope.newConn.input.value }, outputs: [] };

			$http.post(
				'/connection/create',
				newConnection
			).success(function(data) {
				$scope.connections.push( data );
			});

			$scope.newConn = {};
		}
	}

	$scope.createNewConnectionOutput = function(connection) {
		if ( connection !== undefined && connection.newOutput !== undefined && connection.newOutput.device != null & connection.newOutput.value != null ) {
			console.log(connection);

			var newOutput = { device : connection.newOutput.device, value : connection.newOutput.value };
			connection.outputs.push(newOutput);

			$http.put(
				'/connection/' + connection.id,
				{ outputs : connection.outputs }
			);

			connection.newOutput = {};
		}
	}


	  $scope.greeting = 'Hi!';
}]);