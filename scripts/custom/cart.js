app.controller('cartDetail', function ($scope, $http, $window, $cookies) {

    $http({
        method: 'GET',
        headers: {
            'Token': $cookies.get('Token'),
            'Username': $cookies.get('Username')
        },
        url: strLink + "api/cart/getNewestCart"
    }).then(function successCallback(response) {
        $scope.items = response.data;
    }, function errorCallback(response) {
        $window.alert("Không có sản phẩm nào trong giỏ hàng");

        $window.location.href = "/Index.cshtml";
    });

    $scope.getSum = function () {
        var total = 0;
        var count = $scope.items.length;
        for (var i = 0; i < count; i++) {
            var item = $scope.items[i];
            total += item.Price * item.Quantity;
        }

        return total;
    }

    $scope.removeItem = function (idProduct, idCart) {

        $http({
            method: 'DELETE',
            headers: {
                'Token': $cookies.get('Token'),
            },
            url: strLink + "api/item/delete?idProduct=" + idProduct + "&idCart=" + idCart
        }).then(function successCallback(response) {
            if (response.data == 1)
            {
                //$window.alert("Không còn sản phẩm nào trong giỏ hàng");

                $window.location.href = "/Index.cshtml";
            }
            else
            {
                $http({
                    method: 'GET',
                    headers: {
                        'Token': $cookies.get('Token'),
                        'Username': $cookies.get('Username')
                    },
                    url: strLink + "api/cart/getNewestCart"
                }).then(function successCallback(response) {
                    $scope.items = response.data;
                }, function errorCallback(response) {
                    $window.alert("Không có sản phẩm nào trong giỏ hàng");
                });
            }
        }, function errorCallback(response) {
            $window.alert("Không có sản phẩm nào trong giỏ hàng");
        });
    }

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});

app.controller('checkoutFunc', function ($scope, $http, $window, $filter, $cookies) {

    $scope.checkout = function () {

        var phon = document.getElementById("phoneCart").value;
        var numchar = /^[0-9]+$/;

        if (!phon.match(numchar))
            $scope.warning4 = "Điện thoại chỉ có số";
        else
            $scope.warning4 = "";

        if (phon.match(numchar)) {

            var strDate = $filter('date')(new Date(), 'dd/MM/yyyy hh:mm:ss a');

            $http({
                method: 'POST',
                headers: {
                    'Token': $cookies.get('Token'),
                    'Username': $cookies.get('Username')
                },
                data: {
                    PurchasedDate: strDate,
                    Receiver: $scope.receiverCart,
                    Address: $scope.addressCart,
                    Phone: phon,
                    Email: $scope.emailCart
                },
                url: strLink + "api/cart/checkout"
            }).then(function successCallback(response) {
                //$scope.navBrand = response.data;

                $window.alert("Đặt hàng thành công");

                $window.location.href = "/Index.cshtml";
            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
    }
});