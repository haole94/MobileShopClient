// Lấy ngẫu nhiên 9 sản phẩm
app.controller('get9RandomProducts', function ($scope, $http, $window) {
    $http({
        method: 'GET',
        url: strLink + "api/product/get9Random"
    }).then(function successCallback(response) {
        $scope.products = response.data;
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});