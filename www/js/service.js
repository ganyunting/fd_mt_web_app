angular.module('cameraservice', [])



/**
 * 拍照功能
 */
.factory('Camera', function($q) {
	return {
		getPicture: function(options) {
			var q = $q.defer();
			navigator.camera.getPicture(function(result) {
				// Do any magic you need
				q.resolve(result);
			}, function(err) {
				q.reject(err);
			}, options);

			return q.promise;
		}
	}
})

