app.controller('addingNewProductFunc', function ($scope, $http, $window, $cookies) {

    $scope.createBrand = function () {
        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            data: {
                Name: $scope.newBrand
            },
            url: strLink + "api/manufacturer/add"
        }).then(function successCallback(response) {
            $window.alert("Tạo thành công");
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }


    $http({
        method: 'GET',
        url: strLink + "api/manufacturer/getAll"
    }).then(function successCallback(response) {
        $scope.navBrand = response.data;

        $scope.changeBrand($scope.navBrand[0]);
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.changeBrand = function (brand) {
        $scope.Brand = brand;
    }

    $scope.addProduct = function () {

        var flag = 1;
        if ($scope.visible == 'Off')
            flag = 0;

        $http({
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            data: {
                Name: $scope.Name,
                ID_Manufacturer: $scope.Brand.ID,
                Price: $scope.Price,
                Screen: $scope.Screen,
                PrimaryCamera: $scope.PrimaryCamera,
                SecondaryCamera: $scope.SecondaryCamera,
                OS: $scope.OS,
                CPU: $scope.CPU,
                GraphicChip: $scope.GraphicChip,
                RAM: $scope.RAM,
                Storage: $scope.Storage,
                SD: $scope.SD,
                SIM: $scope.SIM,
                Battery: $scope.Battery,
                Comms: $scope.Comms,
                IsVisible: flag
            },
            url: strLink + "api/product/add"
        }).then(function successCallback(response) {
            $window.alert("Thêm sản phẩm thành công");

        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }
});