
 String.prototype.lpad = function(padString, length) {
    var str = this;
    while (str.length < length)
        str = padString + str;
    return str;
};


 String.prototype.zeroPad = function(length) {
    return this.lpad('0', length);
};

var app = angular.module('myApp',['ngRoute'])
.directive('stopWatch', function () {
    var stopWatch = function(elem, options) {

        var timer       = createTimer(),
        startButton = createButton("start", start),
        stopButton  = createButton("stop", stop),
        resetButton = createButton("reset", reset),
        offset,
        clock,
        interval;


            options = options || {};
            options.delay = options.delay || 150;

        
            elem.appendChild(timer);
    

         
            reset();

     
            function createTimer() {
                return document.createElement("span");
            }

            function createButton(action, handler) {
                var a = document.createElement("a");
                a.href = "#" + action;
                a.innerHTML = action;
                a.addEventListener("click", function(event) {
                    handler();
                    event.preventDefault();
                });
                return a;
            }

            function start() {
                if (!interval) {
                    offset   = Date.now();
                    interval = setInterval(update, options.delay);
                }
            }

            function stop() {
                if (interval) {
                    clearInterval(interval);
                    interval = null;
                }
            }

            function reset() {
                clock = 0;
                render();
            }

            function update() {
                clock += delta();
                render();
            }

            function getClockInfo() {
                var hours = Math.floor( ((clock/1000) / 60) / 60 ),
                minutes = Math.floor( ((clock/1000) / 60) -  hours * 60 ),
                seconds = 
                Math.floor( 
                    (clock/1000) -  
                    (minutes * 60) - 
                    (hours * 60 * 60)
                    ),
                milliSeconds =
                Math.floor(
                    clock -
                    (seconds * 1000) -
                    (minutes * 60 * 1000) -
                    (hours * 60 * 60 * 1000)
                    );

                return {
                    'hours' : hours,
                    'minutes' : minutes,
                    'seconds' : seconds,
                    'milliSeconds' : milliSeconds
                };
            }

            function render() {
                var clockInfo = getClockInfo()

                timer.innerHTML =
                '<span class="hours">' + 
                clockInfo.hours.toString().zeroPad(2) + '</span> : ' +
                '<span class="minutes">' +
                clockInfo.minutes.toString().zeroPad(2) + '</span> : ' +
                '<span class="seconds">' +
                clockInfo.seconds.toString().zeroPad(2) + '</span>'
            }

            function delta() {
                var now = Date.now(),
                d   = now - offset;

                offset = now;
                return d;
            }

            // public API
            this.start  = start;
            this.stop   = stop;
            this.reset  = reset;
            this.info = getClockInfo;
        };

        return {
            restrict: 'E',
            transclude: true,
            scope: false,
            link: function (scope, element) {
                var sw = new stopWatch(element[0]);
                scope.resetClock = function(){
                    return sw.reset();
                }
                scope.stopClock = function(){
                    return sw.stop();
                }
                scope.initializeClock = function(){
                    return sw.start();
                }
                scope.infoClock = function(){
                    return sw.info();
                }
            }
        };
    });
app.directive('relogio', function($interval){
  return{
    restrict: 'AE',
    link: function(scope, element, attrs){

      var timer = $interval(function(){
        mudaTempo();
    },1000);

      function mudaTempo(){
       element.text((new Date()).toLocaleString());
   }
}
}
});

    // Definindo Rotas
    app.config(function($routeProvider){
      $routeProvider
      .when("/finalizar", {
          templateUrl:"/static/core/js/view/finalizar.html",
          controller: 'FinalizarCtrl'
      })
  });