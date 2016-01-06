// Lấy danh sách các hãng di động cho thanh navbar
app.controller('getBrand', function ($scope, $http, $window) {
    $http({
        method: 'GET',
        url: strLink + "api/manufacturer/getAll"
    }).then(function successCallback(response) {
        $scope.navBrand = response.data;
    }, function errorCallback(response) {
        $window.alert(response.status);
    });
});

app.controller('logoutFunc', function ($scope, $http, $window, $cookies) {

    $scope.logout = function () {

        FB.logout(function (response) {
            // Person is now logged out
        });

        $http({
            method: 'DELETE',
            headers: {
                'Token': $cookies.get('Token')
            },
            url: strLink + "api/token/delete"
        }).then(function successCallback(response) {
            $cookies.remove('Token');
            $cookies.remove('Username');

            $window.location.href = '/Index.cshtml';
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }
});