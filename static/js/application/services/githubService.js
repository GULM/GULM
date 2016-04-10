(function(){
	"use strict";
	var clientId = "2430f6b849b9be6535e8";
	var clientSecret = "b04f589142c9eac14a060e7d48392a7481a2334e";

	var urlAuth = "?client_id=" + clientId + "&client_secret=" + clientSecret;

	angular.module('gulm.services',[])
	.factory('github', ["$http", githubFn]);

	function githubFn($http) {
		return function(username){

			return {
				"repos": getReposFn(),
				"languageData": getLanguageData,
			}

			function getReposFn(){
				return $http.get("https://api.github.com/users/" + username + "/repos"+ urlAuth);
			}

			function getLanguageData(repo){
				return $http.get("https://api.github.com/repos/" + username +  "/" + repo +  "/languages"+ urlAuth);
			}

		}
	}

}())
