/**
 * Created by Alex on 10/1/2016.
 */

function RoomCtrl($scope, appService){
    $scope.roomname = appService.roomname;
    $scope.username = appService.username;
}