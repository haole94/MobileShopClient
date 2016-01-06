// Lấy sản phẩm theo trang

var p = 1; // Default page 1
var brandId = -1; // Default brand

app.controller('getSomeProduct', function ($scope, $http, $window) {

    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'p') {
            p = sParameterName[1];
        }

        if (sParameterName[0] == 'brandId') {
            brandId = sParameterName[1];
        }
    }

    $scope.page = p;

    $scope.loadPage = function () {
        if (brandId == -1) {
            $http({
                method: 'GET',
                url: strLink + "api/product/getSomeProduct?p=" + p
            }).then(function successCallback(response) {
                $scope.products = response.data;
            }, function errorCallback(response) {
                $window.alert(response.status);
            });

            $http({
                method: 'GET',
                url: strLink + "api/product/getNumberOfPages"
            }).then(function successCallback(response) {
                $scope.pages = response.data;
            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
        else {
            $http({
                method: 'GET',
                url: strLink + "api/product/getSomeProductByBrand?p=" + p + "&brandId=" + brandId
            }).then(function successCallback(response) {
                $scope.products = response.data;
            }, function errorCallback(response) {
                $window.alert(response.status);
            });

            $http({
                method: 'GET',
                url: strLink + "api/product/getNumberOfPages2?brandId=" + brandId
            }).then(function successCallback(response) {
                $scope.pages = response.data;
            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
    }

    $scope.changePage = function (num) {

        p = num;
        $scope.loadPage();
    }

    $scope.loadPage();

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});

/*app.controller('getNumberOfPages', function ($scope, $http, $window) {

    $http({
        method: 'GET',
        url: strLink + "api/product/getNumberOfPages"
    }).then(function successCallback(response) {
        $scope.product = response.data;
    }, function errorCallback(response) {
        $window.alert(response.status);
    });
});*/