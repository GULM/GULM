(function(){
	"use strict";

	angular.module('gulm.services',[])
	.factory('github', ["$http", githubFn]);

	function githubFn($http) {
		return function(username){

			return {
				"repos": getReposFn(),
				"languageData": getLanguageData,
			}

			function getReposFn(){
				return $http.get("https://api.github.com/users/" + username + "/repos");
			}

			function getLanguageData(repo){
				return $http.get("https://api.github.com/repos/" + username +  "/" + repo +  "/languages");
			}

		}
	}

}())
