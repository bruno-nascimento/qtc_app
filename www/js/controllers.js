/* global angular, document, window */
'use strict';

angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $ionicPopover, $timeout) {
    // Form data for the login modal
    $scope.loginData = {};
    $scope.isExpanded = false;
    $scope.hasHeaderFabLeft = false;
    $scope.hasHeaderFabRight = false;

    var navIcons = document.getElementsByClassName('ion-navicon');
    for (var i = 0; i < navIcons.length; i++) {
        navIcons.addEventListener('click', function() {
            this.classList.toggle('active');
        });
    }

    ////////////////////////////////////////
    // Layout Methods
    ////////////////////////////////////////

    $scope.hideNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'none';
    };

    $scope.showNavBar = function() {
        document.getElementsByTagName('ion-nav-bar')[0].style.display = 'block';
    };

    $scope.noHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }
    };

    $scope.setExpanded = function(bool) {
        $scope.isExpanded = bool;
    };

    $scope.setHeaderFab = function(location) {
        var hasHeaderFabLeft = false;
        var hasHeaderFabRight = false;

        switch (location) {
            case 'left':
                hasHeaderFabLeft = true;
                break;
            case 'right':
                hasHeaderFabRight = true;
                break;
        }

        $scope.hasHeaderFabLeft = hasHeaderFabLeft;
        $scope.hasHeaderFabRight = hasHeaderFabRight;
    };

    $scope.hasHeader = function() {
        var content = document.getElementsByTagName('ion-content');
        for (var i = 0; i < content.length; i++) {
            if (!content[i].classList.contains('has-header')) {
                content[i].classList.toggle('has-header');
            }
        }

    };

    $scope.hideHeader = function() {
        $scope.hideNavBar();
        $scope.noHeader();
    };

    $scope.showHeader = function() {
        $scope.showNavBar();
        $scope.hasHeader();
    };

    $scope.clearFabs = function() {
        var fabs = document.getElementsByClassName('button-fab');
        if (fabs.length && fabs.length > 1) {
            fabs[0].remove();
        }
    };
})

.controller('FriendsCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.$parent.setHeaderFab('left');

    // Delay expansion
    $timeout(function() {
        $scope.isExpanded = true;
        $scope.$parent.setExpanded(true);
    }, 300);

    // Set Motion
    ionicMaterialMotion.fadeSlideInRight();

    // Set Ink
    ionicMaterialInk.displayEffect();
})

.controller('NovoChatCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $ionicPopup, $loadingService, $camera, $http, $state, $q, $cordovaFile) {
    $scope.$parent.clearFabs();
    $scope.sala = {};
    $scope.img_sala_base64 = "";
    ionicMaterialInk.displayEffect();

    $scope.imgOptions = angular.copy($camera.getDefaultOptions());

    $scope.carregarImagemGaleria = function(){
        //Camera.PictureSourceType.PHOTOLIBRARY
        $scope.imgOptions.sourceType = 0;
        $camera.getPicture($scope.imgOptions).then(function(res){
            if (res.startsWith("content://")) {
                window.FilePath.resolveNativePath(res, function(localFileUri) {
                    window.resolveLocalFileSystemURL("file://" + localFileUri, function(fileEntry) {
                        var path = fileEntry.nativeURL.substr(0, fileEntry.nativeURL.lastIndexOf('/') + 1);
                        var file = fileEntry.nativeURL.substr(fileEntry.nativeURL.lastIndexOf('/') + 1);
                        $cordovaFile.readAsDataURL(path, file).then(function(base64String){
                            $scope.img_sala_base64 = base64String;
                        }, function(error){
                            $ionicPopup.alert({
                                title: 'Putz!',
                                template: 'Estamos muito constrangidos em dizer que ... ocorreu um erro ao processar a imagem que você escolheu ... por favor selecione outra ...  ou melhorainda! nenhuma talvez =]'
                            });
                        });
                    });
                });
            }
            $scope.sala.imagem = res;
        });
    }

    $scope.tirarFoto = function(){
        //Camera.PictureSourceType.CAMERA
        $scope.imgOptions.sourceType = 1;
        $camera.getPicture($scope.imgOptions).then(function(res){
            var path = res.substr(0, res.lastIndexOf('/') + 1);
            var file = res.substr(res.lastIndexOf('/') + 1);
            $cordovaFile.readAsDataURL(path, file).then(function(base64String){
                $scope.img_sala_base64 = base64String;
            }, function(error){
                $ionicPopup.alert({
                    title: 'Putz!',
                    template: 'Estamos muito constrangidos em dizer que ... ocorreu um erro ao processar a imagem que você escolheu ... por favor selecione outra ...  ou melhorainda! nenhuma talvez =]'
                });
            });
            $scope.sala.imagem = res;
        });
    }

    $scope.cadastrarSala = function(){
        var bkp_img = angular.copy($scope.sala.imagem);
        $scope.sala.imagem = $scope.img_sala_base64;
        var req = {
            method: 'POST',
            url: 'http://server-qtcapp.rhcloud.com/room', //http://localhost:8080/rooms
            data: $scope.sala
        }

        $http(req).then(function(success){
            $scope.sala.imagem = bkp_img;
            $loadingService.stop();
            $state.go('app.profile');
        }, function(error){
            console.log(error);
            $loadingService.stop();
            var alertPopup = $ionicPopup.alert({
                title: 'Putz!',
                template: 'Estamos muito constrangidos em dizer que ... nosso aplicativo não funciona como esperado e você não vai conseguir conversar com os seus amigos, infelizmente. Verifique a sua conexão com a internet e tente novamente, se achar que deva.'
            });
            console.log('erro ao gravar a sala de bate papo : ', JSON.stringify(error));
            $timeout(function() {
                ionicMaterialInk.displayEffect();
            }, 0);
        });
    }
})

.controller('ProfileCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk, $camera, $loadingService, $http, $state, $ionicPopup) {
    // Set Header
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = false;
    $scope.$parent.setExpanded(false);
    $scope.$parent.setHeaderFab(false);

    $scope.animar = function(){
        $timeout(function() {
            ionicMaterialMotion.slideUp({
                selector: '.slide-up'
            });
        }, 300);

        $timeout(function() {
            ionicMaterialMotion.fadeSlideInRight({
                startVelocity: 3000
            });        
        }, 700);

        // Set Ink
        ionicMaterialInk.displayEffect();    
    }// Set Motion
    

    document.getElementById('fab-profile').onclick = function(){
        $state.go('app.chat-novo');
    }

    $scope.animar();

    $scope.salas = [];

    $scope.carregarSalas = function(){
        $loadingService.start();
        
        var req = {
            method: 'GET',
            url: 'http://server-qtcapp.rhcloud.com/rooms' //http://localhost:8080/rooms
        }

        $http(req).then(function(success){
            angular.forEach(success.data, function(sala){
                if(sala.imagem && sala.imagem.data){
                    sala.imagem.src = "data:image/"+sala.imagem.contentType+";base64,"+sala.imagem.data;
                }
            });

            $scope.salas = success.data;
            $loadingService.stop();
            $scope.animar();
        }, function(error){
            console.log(error);
            $loadingService.stop();
            var alertPopup = $ionicPopup.alert({
                title: 'Putz!',
                template: 'Estamos muito constrangidos em dizer que ... nosso aplicativo não funciona como esperado e você não vai conseguir conversar com os seus amigos, infelizmente. Verifique a sua conexão com a internet e tente novamente, se achar que deva.'
            });
            console.log('erro ao carregar as salas de bate papo : ', JSON.stringify(error));
            $timeout(function() {
                ionicMaterialInk.displayEffect();
            }, 0);
        });
    }
    $scope.carregarSalas();
})

.controller('ActivityCtrl', function($scope, $stateParams, $timeout, ionicMaterialMotion, ionicMaterialInk) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab('right');

    $timeout(function() {
        ionicMaterialMotion.fadeSlideIn({
            selector: '.animate-fade-slide-in .item'
        });
    }, 200);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();
})

.controller('GalleryCtrl', function($scope, $stateParams, $timeout, ionicMaterialInk, ionicMaterialMotion) {
    $scope.$parent.showHeader();
    $scope.$parent.clearFabs();
    $scope.isExpanded = true;
    $scope.$parent.setExpanded(true);
    $scope.$parent.setHeaderFab(false);

    // Activate ink for controller
    ionicMaterialInk.displayEffect();

    ionicMaterialMotion.pushDown({
        selector: '.push-down'
    });
    ionicMaterialMotion.fadeSlideInRight({
        selector: '.animate-fade-slide-in .item'
    });

})

;
