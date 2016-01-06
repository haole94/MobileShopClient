app.controller('addAccount', function ($scope, $http, $window) {


    $scope.submit = function () {

        var str = document.getElementById("birthday").value;
        var usr = document.getElementById("username").value;
        var phon = document.getElementById("phone").value;
        var numchar = /^[0-9]+$/;

        if (!usr.match(/^[A-Za-z]+$/))
            $scope.warning = "Username không được phép có các ký tự đặc biệt";
        else
            $scope.warning = "";

        if (!phon.match(numchar))
            $scope.warning2 = "Điện thoại chỉ có số";
        else
            $scope.warning2 = "";

        if (usr.match(/^[A-Za-z]+$/) && phon.match(numchar)) {
            $http({
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                data: {
                    Username: usr,
                    Password: $scope.acc.Password,
                    Name: $scope.acc.Name,
                    Birthday: str,
                    Address: $scope.acc.Address,
                    Phone: phon
                },
                url: strLink + "api/account/add"
            }).then(function successCallback(response) {
                $window.alert("Đăng ký thành công");

                $window.location.href = '/Index.cshtml';
            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
    };

});

app.controller('loginFunc', function ($scope, $http, $window, $cookies) {

    $scope.login = function () {

        $http({
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            data: {
                username: $scope.usernameLogin,
                password: $scope.passwordLogin
            },
            url: strLink + "api/token/get"
        }).then(function successCallback(response) {
            $cookies.put('Token', response.data);
            $cookies.put('Username', $scope.usernameLogin);

            $window.location.href = '/Index.cshtml';
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }
});