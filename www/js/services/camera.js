angular.module('starter')
.factory('$camera', ['$q', '$cordovaCamera', function($q, $cordovaCamera) {
  
  try{ // PRODUÇÃO : no celular existe o obj camera
    var DEFAULT_OPTIONS = {
      quality: 50,
      destinationType: Camera.DestinationType.DATA_URL,
      sourceType: Camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: true,
      encodingType: Camera.EncodingType.JPEG,
      targetWidth: 100,
      targetHeight: 100,
      saveToPhotoAlbum: false,
      popoverOptions: CameraPopoverOptions,
      correctOrientation:true
    };
  
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
  }catch (err){ //DESENVOLVIMENTO : no browser não existe o obj Camera
    var DEFAULT_OPTIONS = {};
    var Camera  = {PictureSourceType : {}, DestinationType : {}};
  }
  
  return {
    getPicture: function(options) {
      options = options || DEFAULT_OPTIONS;
      return $cordovaCamera.getPicture(options);
    },
    getDefaultOptions : function(){
      return DEFAULT_OPTIONS;
    }
  }
}])