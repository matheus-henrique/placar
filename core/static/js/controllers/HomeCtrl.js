app.controller('HomeCtrl', function($scope,$window, $filter){
	$scope.finalizarJogo = function(){
		$scope.melhoresmomentos.final = new Date();

	}

	$scope.melhoresmomentos = [];
	$scope.vm = [];

	$scope.timeX = 'Defina o nome do time [1]';
	$scope.timeY = 'Defina o nome do time [2]';

	$scope.vm.timeYdefinido = false;
	$scope.vm.timeXdefinido = false;

	$scope.vm.mostrarAlerta = false;

	$scope.placarTimeX = 0;
	$scope.placarTimeY = 0;


	$scope.definirTime = function(time, nometime){
		if(time == "X"){
			$scope.timeX = nometime;
			$scope.vm.timeXdefinido = true;
		}else{
			$scope.timeY = nometime;
			$scope.vm.timeYdefinido = true;
		}
		if($scope.vm.timeXdefinido && $scope.vm.timeYdefinido){
			$scope.vm.mostrarAlerta = false;
		}
	}

	$scope.pausarJogo = function(){
		$scope.vm.pausado = true;
		$scope.stopClock();
	}
	$scope.resetarJogo = function(){
		$scope.resetClock();
	}
	$scope.iniciarJogo = function(){
		if($scope.vm.timeYdefinido && $scope.vm.timeYdefinido){
			$scope.vm.jogoiniciado = true;
			$scope.initializeClock();
			$scope.vm.inicio = new Date();
		}else{
			$scope.vm.mostrarAlerta = true;
		}	
	}

	$scope.continuarJogo = function(){
		$scope.initializeClock();
		$scope.vm.pausado = false;
	}


	$scope.marcarGol = function(time){
		$scope.data = new Date();
		$scope.melhoresmomentos.inicio = $filter('date')($scope.vm.inicio, "yyyy-MM-ddTHH:mm:ss");
		$scope.melhoresmomentos.final = $filter('date')($scope.melhoresmomentos.final, "yyyy-MM-ddTHH:mm:ss");
		var gol = {data: $filter('date')($scope.data, "yyyy-MM-dd"),hora: $filter('date')($scope.data, "HH:mm:ss"),cronometro: $scope.infoClock().hours.toString().zeroPad(2)+':'+
		$scope.infoClock().minutes.toString().zeroPad(2)+':'+$scope.infoClock().seconds.toString().zeroPad(2), descricao:'', datainicio: $filter('date')($scope.melhoresmomentos.inicio, "yyyy-MM-dd"),
		hora_inicio: $scope.melhoresmomentos.inicio, hora_final: $scope.melhoresmomentos.final};

		if(time === null){
			gol.time = 'Vale Replay';
			$scope.melhoresmomentos.push(gol);
		}

		if(time == 'X'){
			$scope.placarTimeX++;
			gol.time = $scope.timeX;
			$scope.melhoresmomentos.push(gol);
		}else if(time == 'Y'){
			gol.time = $scope.timeY;
			$scope.melhoresmomentos.push(gol);
			$scope.placarTimeY++;
		}
	}


	$scope.apagar = function(melhores){
		if(melhores.time == $scope.timeX){$scope.placarTimeX--;}
		else if(melhores.time == $scope.timeY){$scope.placarTimeY--;}

		$scope.melhoresmomentos = $scope.melhoresmomentos.filter(function(melhor){
			if(melhor != melhores)
				return melhor
		});
	}
});
