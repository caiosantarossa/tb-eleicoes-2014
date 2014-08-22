var token = {'App-Token': 'dOFk25WcmrwI'};

angular.module('tb-eleicoes-2014', ['ngRoute'])
    .config( ['$routeProvider', function($routeProvider) {
        $routeProvider
            .when('/home',                  {templateUrl: 'partials/home.html', controller: AppController})
            .when('/blank',                 {templateUrl: 'about:blank'})

            .otherwise({redirectTo: '/home'});
    }] )
    .filter('trim', function() {
        return function(s) {
        	if ( s == null ) return "";
        	if ( s.length < 100 ) return s;
        	var i = s.lastIndexOf( ' ', 90 )
            return s.substr( 0, i ) + " (...)";
        };
    });
    
    
function AppController($scope, $http, $location) {
	$scope.cargo = {};
	$scope.estado = {};
	$scope.partido = {};
	
	$scope.loadPage = function() {
	    $http.get( "http://api.transparencia.org.br/api/v1/estados", {headers: token} ).then( function(response) { $scope.estados = response.data } );
		$http.get( "http://api.transparencia.org.br/api/v1/cargos", {headers: token} ).then( function(response) { $scope.cargos = response.data } );
		$http.get( "http://api.transparencia.org.br/api/v1/partidos", {headers: token} ).then( function(response) { $scope.partidos = response.data } );
		
	}	
	$scope.loadPage();
	
	$scope.listCandidatos = function() {
		$scope.candidatos = [];
	    $http.get( "http://api.transparencia.org.br/api/v1/candidatos", {headers: token, params: {estado: $scope.estado.sigla, partido: $scope.partido.partidoId, cargo: $scope.cargo.cargoId } } ).then( function(response) { $scope.candidatos = response.data } );
	}
	
	$scope.listExcelencias = function() {
		$scope.excelencias = [];
	    $http.get( "http://api.transparencia.org.br/api/v1/excelencias", {headers: token, params: {estado: $scope.estado.sigla, partidoId: $scope.partido.partidoId, casa: $scope.casa } } ).then( function(response) { $scope.excelencias = response.data } );
	}
}
    