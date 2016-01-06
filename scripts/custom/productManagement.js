app.controller('productManagementFunc', function ($scope, $http, $window, $cookies) {

    var brandEntity = "";
    var productId = "";

    $http({
        method: 'GET',
        url: strLink + "api/manufacturer/getAll"
    }).then(function successCallback(response) {
        $scope.navBrand = response.data;

        $scope.selectBrand($scope.navBrand[0]);
    }, function errorCallback(response) {
        $window.alert(response.status);
    });

    $scope.selectBrand = function (brand) {

        $scope.sideBarBrand = brand.Name;
        brandEntity = brand;

        $http({
            method: 'GET',
            headers: {
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            url: strLink + "api/product/getProductByBrand?id=" + brand.ID
        }).then(function successCallback(response) {
            $scope.navProduct = response.data;

            $scope.selectProduct($scope.navProduct[0]);
        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }

    $scope.selectProduct = function (product) {

        productId = product.ID;
        $scope.sideBarProduct = product.Name;

        if (product.IsVisible == 1)
            $scope.visible = 'On';
        else
            $scope.visible = 'Off';

        $scope.Name = product.Name;
        $scope.Brand = brandEntity;
        $scope.Price = product.Price;
        $scope.Screen = product.Screen;
        $scope.PrimaryCamera = product.PrimaryCamera;
        $scope.SecondaryCamera = product.SecondaryCamera;
        $scope.OS = product.OS;
        $scope.CPU = product.CPU;
        $scope.GraphicChip = product.GraphicChip;
        $scope.RAM = product.RAM;
        $scope.Storage = product.Storage;
        $scope.SD = product.SD;
        $scope.SIM = product.SIM;
        $scope.Battery = product.Battery;
        $scope.Comms = product.Comms;
        $scope.displayImage = product.Image;
    }

    $scope.changeBrand = function (brand) {
        $scope.Brand = brand;
    }

    $scope.updateProduct = function () {

        var flag = 1;
        if ($scope.visible == 'Off')
            flag = 0;

        $http({
            method: 'PUT',
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
            url: strLink + "api/product/update?id=" + productId
        }).then(function successCallback(response) {
            $window.alert("Cập nhật thành công");

        }, function errorCallback(response) {
            $window.alert(response.status);
        });
    }

    $scope.UploadImage = function () {

        var f = document.getElementById('Image').files[0];
        var r = new FileReader();

        r.onloadend = function (e) {
            var bidata = e.target.result;

            var str = bidata.split(",");

            $http({
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Token': $cookies.get('Token'),
                    'Username': $cookies.get('Username')
                },
                data: {
                    Context: str[1]
                },
                url: strLink + "api/product/uploadImage?id=" + productId
            }).then(function successCallback(response) {
                $window.alert("Cập nhật hình ảnh thành công");

            }, function errorCallback(response) {
                $window.alert(response.status);
            });
        }

        r.readAsDataURL(f);

        /*var fd = new FormData();
        //Take the first selected file
        fd.append("file", $scope.Image);

        $http.put(strLink + "api/product/uploadImage?id=" + productId, fd, {
            withCredentials: true,
            headers: {
                'Content-Type': undefined,
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            transformRequest: angular.identity
        }).success($window.alert("Cập nhật hình ảnh thành công")).error($window.alert(response.status));

        var pic = document.getElementById("Image").value;
        $scope.Name = pic;
        var canvas = document.createElement("canvas");
        canvas.width = pic.clientWidth;
        canvas.height = pic.clientHeight;

        $scope.Screen = canvas.width;
        $scope.PrimaryCamera = canvas.height;
        var ctx = canvas.getContext("2d");
        ctx.drawImage(pic, 0, 0);
        var dataURL = canvas.toDataURL("image/png");
        var bidata = dataURL.replace(/^data:image\/(png|jpg);base64,/, "");

        $http({
            method: 'PUT',
            withCredentials: true,
            headers: {
                'Content-Type': undefined,
                'Token': $cookies.get('Token'),
                'Username': $cookies.get('Username')
            },
            transformRequest: angular.identity,
            data: $scope.Image,
            url: strLink + "api/product/uploadImage?id=" + productId
        }).then(function successCallback(response) {
            $window.alert("Cập nhật hình ảnh thành công");

        }, function errorCallback(response) {
            $window.alert(response.status);
        });*/
    }
});