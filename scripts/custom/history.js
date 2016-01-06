app.controller('cartHistoryFunc', function ($scope, $http, $window, $cookies) {

    $http({
        method: 'GET',
        headers: {
            'Token': $cookies.get('Token'),
            'Username': $cookies.get('Username')
        },
        url: strLink + "api/cart/getHistoryCart"
    }).then(function successCallback(response) {
        $scope.cartHistory = response.data;
        $scope.getItems($scope.cartHistory[0]);
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.getItems = function (cart) {

        $scope.dateHistory = cart.PurchasedDate;
        $scope.receiverHistory = cart.Receiver;
        $scope.addressHistory = cart.Address;
        $scope.phoneHistory = cart.Phone;
        $scope.emailHistory = cart.Email;

        if (cart.ConfirmedByAdmin == 0)
            $scope.confirmed = "Đơn hàng chưa xác nhận";
        else if (cart.ConfirmedByAdmin == 1)
            $scope.confirmed = "Đơn hàng đã được duyệt";
        else if (cart.ConfirmedByAdmin == -1)
            $scope.confirmed = "Đơn hàng đã bị hủy";

        $http({
            method: 'GET',
            headers: {
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            url: strLink + "api/cart/getHistoryItem?date=" + cart.PurchasedDate
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

    $scope.format = function (n) {
        return n.toFixed(1).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
    }
});