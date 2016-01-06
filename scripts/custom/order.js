app.controller('orderFunc', function ($scope, $http, $window, $cookies) {

    //$scope.selectStatus(0);

    $scope.selectStatus = function (stat) {

        if (stat == 0)
        {
            $scope.status = 'Chưa duyệt';

            $http({
                method: 'GET',
                headers: {
                    'Token': $cookies.get('Token'),
                    'Username': $cookies.get('Username')
                },
                url: strLink + "api/cart/getAll0"
            }).then(function successCallback(response) {
                $scope.carts = response.data;

            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }

        if (stat == 1)
        {
            $scope.status = 'Đã duyệt';

            $http({
                method: 'GET',
                headers: {
                    'Token': $cookies.get('Token'),
                    'Username': $cookies.get('Username')
                },
                url: strLink + "api/cart/getAll1"
            }).then(function successCallback(response) {
                $scope.carts = response.data;

            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
    }

    $scope.selectStatus(0);
});

app.controller('detailOrderFunc', function ($scope, $http, $window, $cookies) {

    var id;
    var username;
    var date;
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == 'id') {
            id = sParameterName[1];
        }
        if (sParameterName[0] == 'username') {
            username = sParameterName[1];
        }
    }

    $http({
        method: 'GET',
        headers: {
            'Token': $cookies.get('Token'),
            'Username': $cookies.get('Username')
        },
        url: strLink + "api/cart/getCart?id=" + id
    }).then(function successCallback(response) {
        $scope.getItems(response.data);

    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.getItems = function (cart) {

        date = cart.PurchasedDate;
        $scope.receiverHistory = cart.Receiver;
        $scope.addressHistory = cart.Address;
        $scope.phoneHistory = cart.Phone;
        $scope.emailHistory = cart.Email;

        if (cart.ConfirmedByAdmin == 0)
            $scope.status = "Đơn hàng chưa xác nhận";
        else if (cart.ConfirmedByAdmin == 1)
            $scope.status = "Xác nhận đơn hàng";
        else if (cart.ConfirmedByAdmin == -1)
            $scope.status = "Hủy đơn hàng";

        $http({
            method: 'GET',
            headers: {
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            url: strLink + "api/cart/getHistoryItemAdmin?date=" + cart.PurchasedDate + "&user=" + username
        }).then(function successCallback(response) {
            $scope.itemHistory = response.data;
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }

    $scope.getSum = function () {
        var total = 0;
        var count = $scope.itemHistory.length;
        for (var i = 0; i < count; i++) {
            var item = $scope.itemHistory[i];
            total += item.Price * item.Quantity;
        }

        return total;
    }

    $scope.confirm = function (flag) {

        if (flag == -1)
            $scope.status = 'Hủy đơn hàng';
        if (flag == 1)
            $scope.status = 'Xác nhận đơn hàng';

        $http({
            method: 'PUT',
            headers: {
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            data: flag,
            url: strLink + "api/cart/updateStatus?date=" + date + "&user=" + username
        }).then(function successCallback(response) {
            $window.alert("Cập nhật thành công");
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});