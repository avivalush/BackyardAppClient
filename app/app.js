"use strict";
var app = angular.module('app',['ngRoute','ui.bootstrap','ngDialog','ngStorage','ngCookies']);


app.config(['$routeProvider','$qProvider','$httpProvider', function($routeProvider,$qProvider,$httpProvider){
  $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.defaults.useXDomain = true;
    $httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
    $httpProvider.defaults.headers.common = 'Content-Type: application/json';
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  $routeProvider
    .when('/login', {
      templateUrl: 'components/login/loginView.html',
      controller: 'loginController'
    })
    .when('/about', {
     templateUrl: 'components/about/about.html'
    })
    .when('/home', {
      templateUrl: 'components/home/homeView.html',
      controller: 'homeController'
    })
    .otherwise({
      redirectTo: '/home'
    });

}]);


app.controller('mainController', ['userService','$cookies','$http','$location','$localStorage','$window', function(userService,$cookies,$http,$location,$localStorage,$window){
    var vm = this;
  //  vm.username = userService.userName;
    vm.userService = userService;



}]);


app.factory('userService', ['$http', function ($http) {
    var service = {};
//------------------------------------------------------------------------------
    service.login = function (user) {
        return $http.post('http://localhost:3000/users/Login', user)
            .then(function (res) {
                var token = res.data;

                service.lastLogin = "Last Entry: "+token[0].lastDate;
                service.isLoggedIn = true;
                service.userName = user.User_name;
                return Promise.resolve(res);
            })
            .catch(function (e) {
                return Promise.reject(e);
            });
    };
//------------------------------------------------------------------------------
    return service;
}]);
