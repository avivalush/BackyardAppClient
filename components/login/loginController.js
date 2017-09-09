
app.controller('loginController',['userService','$cookies','$localStorage','$http','$window','$location',function(userService,$cookies,$localStorage,$http,$window,$location){

  var ctrl = this;
  ctrl.userService=userService;

//------------------------------------------------------------------------------

//------------------------------------------------------------------------------


ctrl.searchItemByName = function(){
  var itemSearch = ctrl.user.search;
}
//------------------------------------------------------------------------------
    ctrl.checkans = function(valid){
        if(valid){
            var uname = ctrl.login.User_name;
            var ans1 = ctrl.login.qres1;
            var ans2 = ctrl.login.qres2;
            var Url="http://localhost:3000/users/PasswordRec";
            var jsonReg= {
                "User_name":uname,
                "User_reqans1":ans1,
                "User_reqans2":ans2};
            $http.post(Url, jsonReg)
                .then(function (response) {
                        var ans = response.data;
                        ctrl.response= ans;
                        $window.alert("your password is:" +ctrl.response);
                        ctrl.restore=false;
                    }, function (reason) {
                        ctrl.response = "error is " + reason.message;
                        $window.alert("register: Something went wrong2");
                    }
                )
        }
    };
//------------------------------------------------------------------------------
}]);
