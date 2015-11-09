angular.module('starter')
.factory('$camera', ['$q', function($q) {
 
  // var DEFAULT_OPTIONS = {quality : 50,
  //   destinationType : Camera.DestinationType.DATA_URL,
  //   sourceType : Camera.PictureSourceType.PHOTOLIBRARY,
  //   allowEdit : true,
  //   encodingType: Camera.EncodingType.JPEG,
  //   targetWidth: 100,
  //   targetHeight: 100,
  //   saveToPhotoAlbum: false};
  
  // Camera.PictureSourceType = {
  //     PHOTOLIBRARY : 0,
  //     CAMERA : 1,
  //     SAVEDPHOTOALBUM : 2
  // };

  // Camera.DestinationType = {
  //     DATA_URL : 0,      // Return image as base64-encoded string
  //     FILE_URI : 1,      // Return image file URI
  //     NATIVE_URI : 2     // Return image native URI (e.g., assets-library:// on iOS or content:// on Android)
  // };

  return {
    getPicture: function(options) {
      options = options || DEFAULT_OPTIONS;
      var q = $q.defer();
      navigator.camera.getPicture(function(result) {
        q.resolve(result);
      }, function(err) {
        q.reject(err);
      }, options);
      
      return q.promise;
    }
  }
}])