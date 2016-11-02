app.controller('FinalizarCtrl', function($scope, $http, $window, $filter){
	$scope.vm.finalizar = true;
	$window.scrollTo(0, 0);

	if(!$scope.vm.inicio){
		$window.location.href = '/';
	}

	$scope.enviarGols = function(){
		for(i = 0; i < $scope.melhoresmomentos.length; i++){
			if(angular.isDefined($scope.vm.descricao)){
				$scope.melhoresmomentos[i].descricao = $scope.vm.descricao[i];
			}
			
		}


		$http.defaults.headers.post['X-CSRFToken'] = window.token;

		$http.post('/receber/',{"dados": $scope.melhoresmomentos}).success(function(){
			$window.location.href = '/static/core/placar.txt';
		});
		
		
		
	}
});