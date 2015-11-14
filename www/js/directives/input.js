angular.module('starter').directive("next",function() {
    return {
        restrict:'A',
        link:function(scope,element,attrs) {
            element.bind('keydown', function(e){
                if(e.which == 13){
                    e.preventDefault();
                    scope.onNext ? scope.onNext() : void(0);
                    element.next()[0].focus();
                }
            });
        }
    }
});