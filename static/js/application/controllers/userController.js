(function(){
	"use strict";

	angular.module('gulm.controllers',["gulm.services"])
	.controller("userController", ["$scope", "$stateParams", "github", "$state", userControllerFn]);

	function userControllerFn($scope, $stateParams, github, $state){
		$scope.username = $stateParams.username;

		$scope.mastering = {};


		$scope.getLanguages = function (repo) {
			github($stateParams.username).languageData(repo.name).then(function(response){
				if(response.status === 200){
					repo.languages = "";
					for(var i in response.data){
						if($scope.mastering[i] === undefined){
							$scope.mastering[i] = 0;
						}
						$scope.mastering[i] += response.data[i];
						repo.languages += i + ", ";
					}
					drawChart();
				}
			});
		}

		github($stateParams.username).repos.then(function(response){
			if(response.status === 200){
				$scope.repos = response.data;
			}
		}, function(){
			$state.go("home");
		});

		function convertToRows(){
			var data = [];
			for(var i in $scope.mastering){
				data.push([i, $scope.mastering[i]]);
			}

			return data;
		}

		function drawChart() {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Language');
        data.addColumn('number', 'Lines');
        data.addRows(convertToRows());

        // Set chart options
        var options = {'title':'Language Mastering of ' + $stateParams.username,
											"pieHole": 0.4,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'));
        chart.draw(data, options);
      }

	}
}())
