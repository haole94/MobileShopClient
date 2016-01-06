app.controller('getProductDetail', function ($scope, $http, $window, $cookies) {
    var id = 1;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'id') {
            id = sParameterName[1];
        }
    }

    $http({
        method: 'GET',
        url: strLink + "api/product/get?id=" + id
    }).then(function successCallback(response) {
        $scope.product = response.data;
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.addItem = function () {

        $http({
            method: 'POST',
            headers: {
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            data: {
                ID_Product: id,
                Quantity: $scope.quantityProDetail
            },
            url: strLink + "api/item/add"
        }).then(function successCallback(response) {
            $window.alert("Thêm vào giỏ hàng thành công");
        }, function errorCallback(response) {
            $window.alert("Không thêm được hoặc sản phẩm này đã có trong giỏ hàng");
        });
    }

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});