angular.module('starter')
.factory('$loadingService', ['$ionicLoading', function($ionicLoading) {
  var loadingTemplate = '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>';
  return {
    start: function() {
      return $ionicLoading.show({template: loadingTemplate});
    },
    stop: function() {
      return $ionicLoading.hide();
    }
  }
}]);