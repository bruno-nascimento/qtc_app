angular.module('starter')
.controller('RegistroUsuarioCtrl', function($scope, $timeout, $stateParams, ionicMaterialInk, $ionicLoading, $state, $http, $localstorage, $ionicPopup, $loadingService, $cordovaFileTransfer, $ionicPlatform) {
    $scope.$parent.clearFabs();
    $scope.usuario = {};
    $timeout(function() {
        $scope.$parent.hideHeader();
    }, 0);
    ionicMaterialInk.displayEffect();

    $scope.sendData = function(){
        $loadingService.start();
            
            var req = {
                method: 'POST',
                url: 'http://server-qtcapp.rhcloud.com/register_user', //http://localhost:8080/register_user
                // headers: {
                //     'Content-Type': undefined
                // },
                data: $scope.usuario
            }

            $http(req).then(function(success){
                $loadingService.stop();
                $localstorage.setObject('usuario',success.data);
                $state.go('app.profile'); 
            }, function(error){
                $loadingService.stop();
                var alertPopup = $ionicPopup.alert({
                    title: 'Putz!',
                    template: 'Estamos muito constrangidos em dizer que ... nosso aplicativo não funciona como esperado e você não vai conseguir conversar com os seus amigos, infelizmente. Verifique a sua conexão com a internet e tente novamente, se achar que deva.'
                });
                console.log('erro ao registrar o usuario', JSON.stringify(error));
                $timeout(function() {
                    ionicMaterialInk.displayEffect();
                }, 0);
            });
    }
})