(function(){
	"use strict";

	angular.module('gulm.battle.controllers',["gulm.services"])
	.controller("battleController", ["$scope", "$stateParams", "github", "$state", battleControllerFn]);

	function battleControllerFn($scope, $stateParams, github, $state){
		$scope.users = [
			{
				"username": $stateParams.username1,
				"repos": [],
				"lines": 0,
				"mastering": {},
				"languages": 0
			},
			{
				"username": $stateParams.username2,
				"repos": [],
				"lines": 0,
				"mastering": {},
				"languages": 0
			}
		];

		$scope.getLanguages = function (user,repo) {
			github($scope.users[user].username).languageData(repo.name).then(function(response){
				if(response.status === 200){
					repo.languages = "";
					for(var i in response.data){
						if($scope.users[user].mastering[i] === undefined){
							$scope.users[user].mastering[i] = 0;
							$scope.users[user].languages += 1;
						}
						$scope.users[user].mastering[i] += response.data[i];
						$scope.users[user].lines += response.data[i];
						repo.languages += i + ", ";
					}
					drawChart(user);
				}
			});
		}

		$scope.users.forEach(function(user, index){
			github(user.username).repos.then(function(response){
					if(response.status === 200){
						$scope.users[index].repos = response.data;
					}
				}, function(){
					$state.go("home");
				});
		});

		function convertToRows(user){
			var data = [];
			for(var i in $scope.users[user].mastering){
				data.push([i, $scope.users[user].mastering[i]]);
			}

			return data;
		}

		function drawChart(user) {

        // Create the data table.
        var data = new google.visualization.DataTable();
        data.addColumn('string', 'Language');
        data.addColumn('number', 'Lines');
        data.addRows(convertToRows(user));

        // Set chart options
        var options = {'title':'Language Mastering of ' + $scope.users[user].username,
											"pieHole": 0.4,
                       'height':400};

        // Instantiate and draw our chart, passing in some options.
        var chart = new google.visualization.PieChart(document.getElementById('chart_div'+user));
        chart.draw(data, options);
      }

	}
}())
