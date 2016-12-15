// main js file 
// defining the main app
var app = angular.module('MyApp',['ngMaterial', 'ngMessages','ngTable','ngResource']);


// creating controller
app.controller('BookingsController',['$scope', '$mdDialog','$mdSidenav','$http','$resource','$filter','NgTableParams', function($scope,$mdDialog,$mdSidenav,$http,$resource,$filter,NgTableParams){

	$scope.menuList = [
    { name: 'Home', icon: 'fa fa-home fa-2x', newMessage: true },
    { name: 'DashBoard', icon: 'fa fa-tachometer fa-2x', newMessage: false },
    { name: 'Bookings', icon: 'fa fa-list fa-2x', newMessage: false },
    { name: 'Menu Item 1', icon: 'fa fa-asterisk fa-2x', newMessage: true },
    { name: 'Menu Item 2', icon: 'fa fa-asterisk fa-2x', newMessage: false },
    { name: 'Menu Item 3', icon: 'fa fa-asterisk fa-2x', newMessage: false }

  ];

    $scope.toggleLeft = buildToggler('left');
    $scope.toggleRight = buildToggler('right');

    function buildToggler(componentId) {
      return function() {
        $mdSidenav(componentId).toggle(); 
      }
    };


    $scope.loadTable = function(){
        var self = this;
        var Api = $resource("../data/data.json");

        $scope.tableParams = new NgTableParams({
            page: 1, // show first page
            count: 5 // count per page
            }, {
                 counts: [5, 10, 20,25,30,35,40,50,100], 
             getData: function(params) {
                return Api.get(params.url()).$promise.then(function(data) {

                var count = params.url().count;
                var page  = params.url().page;
                if(page == 1){
                     $scope.resultData = data.appointments.slice(0,count);
                }else{
                    var lastIndex = parseInt(count) * parseInt(page);
                    var firstIndex = lastIndex - count;
                    $scope.resultData = data.appointments.slice(firstIndex,lastIndex);
                }

                    // geting the data for city and status
                    var arr = $scope.resultData;
                    $scope.cityArr = ['Mumbai','Pune'];
                    $scope.StatusArr = ['ARTIST_REJECTED','PENDING','CONSUMER_CANCELLED','UNASSIGNED','COMPLETED','PG_CANCELLED'];
                  
                    // for(var ele in arr){
                    //     $scope.cityArr.push(arr[ele].appointment.city.name);
                    //     $scope.StatusArr.push(arr[ele].appointment.status);
                    // }
                  
                  params.total(data.count); 
                 return $scope.resultData;
              });
            }
        });
    };
  
    $scope.showMenuData = function(menuName){
         (menuName == 'Bookings') ? console.log(menuName) : alert("Not Implemented");
    };

    $scope.clearAllSelecction = function(){
            $scope.searchData = {};
    };

    $scope.loadTable();

}]);


