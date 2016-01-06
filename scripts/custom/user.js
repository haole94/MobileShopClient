app.controller('changeInfo', function ($scope, $http, $window, $cookies) {

    var id;
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
        headers: {
            'Token': $cookies.get('Token')
        },
        url: strLink + "api/account/get?username=" + id
    }).then(function successCallback(response) {
        $scope.nameUpdate = response.data.Name;
        $scope.addressUpdate = response.data.Address;
        document.getElementById("birthdayUpdate").value = response.data.Birthday;
        document.getElementById("phoneUpdate").value = response.data.Phone;
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.submitUpdate = function () {

        var str = document.getElementById("birthdayUpdate").value;
        var phon = document.getElementById("phoneUpdate").value;
        var numchar = /^[0-9]+$/;

        if (!phon.match(numchar))
            $scope.warning3 = "Điện thoại chỉ có số";
        else
            $scope.warning3 = "";

        if (phon.match(numchar)) {
            $http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': $cookies.get('Token')
                },
                data: {
                    Password: $scope.passwordUpdate,
                    Name: $scope.nameUpdate,
                    Birthday: str,
                    Address: $scope.addressUpdate,
                    Phone: phon
                },
                url: strLink + "api/account/update?username=" + id
            }).then(function successCallback(response) {
                $window.alert("Cập nhật thông tin thành công");

                $window.location.href = '/User.cshtml?id=' + id;
            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }
    };

});