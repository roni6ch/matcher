$cashDB = [];
$myProfileImgs = [];
$myProfileDetails = [ {} ];
$academies = [];
$educations = [];

$profileSelected = 0;
var myProfileImgsArr = [];
$myLikes = [];
var interval_id;
// download all data to cashDB

$.post("db.php", {
	'dbToCash' : "dbToCash"
}, function(data) {
	data = $.parseJSON(data);
	$.each(data, function(key, value) {
		delete value.password;
		value.link = value.link.replace(/\s+/g, '');
		$cashDB.push(value);
	});
	if (JSON.parse(localStorage.getItem("cashDB")) != null) {
		$cashDB = JSON.parse(localStorage.getItem("cashDB"));
	} else {
		localStorage.setItem("cashDB", JSON.stringify($cashDB));
	}
}).fail(function() {
	alert("error bringing DB to cash");
});

// download all the academies
$.post("db.php", {
	'academies' : "academies"
}, function(data) {
	data = $.parseJSON(data);
	$.each(data, function(key, value) {
		$academies.push(value);
	});
}).fail(function() {
	alert("error bringing academies");
});

// download all the education
$.post("db.php", {
	'educations' : "educations"
}, function(data) {
	data = $.parseJSON(data);
	$.each(data, function(key, value) {
		$educations.push(value);
	});
}).fail(function() {
	alert("error bringing educations");
});

/** **********************************ANGULAR*************************************** */

var app = angular.module('matcherApp', [ "ngRoute", "ngStorage" ]);

app.config(function($routeProvider) {
	$routeProvider.when('/', {
		templateUrl : 'home.php',
		controller : 'mainController'
	}).when('/front-page', {
		templateUrl : 'front-page.php',
		controller : 'frontPageController'
	}).when('/signUp', {
		templateUrl : 'profileSignUp.php',
		controller : 'signUpController'
	}).when('/profileFilterSignUp', {
		templateUrl : 'profileFilterSignUp.php',
		controller : 'profileFilterSignUpController'
	}).when('/Profile', {
		templateUrl : 'menu/profile.php',
		controller : 'profileController'
	}).when('/Filter', {
		templateUrl : 'menu/filter.php',
		controller : 'filterController'
	}).when('/Messages', {
		templateUrl : 'menu/messages.php',
		controller : 'messagesController'
	}).when('/Likes', {
		templateUrl : 'menu/likes.php',
		controller : 'frontPageController'
	}).when('/Exit', {
		templateUrl : 'menu/exit.php',
		controller : 'exitController'
	}).when('/personProfile', {
		templateUrl : 'personProfile.php',
		controller : 'personProfileController'
	})
});

// background: url("../img/ProfileImg.png") no-repeat;
app.directive('backImg', function() {
	return function(scope, element, attrs) {
		attrs.$observe('backImg', function(value) {
			element.css({
				'background-image' : 'url(uploads/' + $.trim(value) + ')',
				'background-size' : 'cover'
			});
		});
	};
});
/*
 * ********************* main controller ****************
 */

app.controller('mainController', function($scope, $localStorage) {

	closeMenu();
	$("input").keypress(function(e) {
		if (e.which == 13 && $(this).hasClass('input') ) {
			$scope.loginSystem();
			return false;
		}
	});

	$(".frontPageHeader").addClass("hidden");
	// login animation
	$(".logoImg").fadeOut(1000, function() {
		$(".loginSystem").fadeIn(1000);
		$(".signUp").fadeTo("slow", 0.5);
		$(".Login").animate({
			"margin-top" : "0px"
		});
	});

	// login button
	$scope.loginSystem = function() {

		$name = $("input[name=name]").val().toLowerCase();
		$pass = $("input[name=pass]").val().toLowerCase();

		$.post(
				"db.php",
				{
					'loginUser' : "loginUser",
					nameLogin : $name,
					passwordLogin : $pass
				},
				function(data) {
					if (data == "") {
						alert("error with username or password!");
						return;
					}
					data = $.parseJSON(data);
					// update my profile details
					$myProfileDetails[0].id = data.id;
					$myProfileDetails[0].Name = data.Name;
					$myProfileDetails[0].gender = data.gender;
					$myProfileDetails[0].Age = data.Age;
					$myProfileDetails[0].academy = data.academy;
					$myProfileDetails[0].education = data.education;
					$myProfileDetails[0].year = data.year;
					$myProfileDetails[0].filterFromAge = data.filterFromAge;
					$myProfileDetails[0].filterToAge = data.filterToAge;
					$myProfileDetails[0].filterAcademy = data.filterAcademy;
					$myProfileDetails[0].filterYear = data.filterYear;
					$myProfileDetails[0].filterGender = data.filterGender;

					if (data.id_liked.length == 0) {
						$myProfileDetails[0].likes = [];
					} else {
						$myProfileDetails[0].likes = data.id_liked;
					}

					localStorage.setItem("myProfileDetails", JSON
							.stringify($myProfileDetails[0]));
					// download my profile Imgs
					$.post(
							"db.php",
							{
								'myProfileImgs' : "myProfileImgs",
								loginId : $myProfileDetails[0].id
							},
							function(data) {
								data = $.parseJSON(data);
								$.each(data, function(key, value) {
									$myProfileImgs.push(value);
									localStorage.setItem("myProfileImgs", JSON
											.stringify($myProfileImgs));

									$scope.img = JSON.parse(localStorage
											.getItem("myProfileImgs"))[0];
								});
							}).fail(function() {
						alert("error with myProfileImgs");
					});

					window.location.href = "#/front-page";
				}).fail(function() {
			alert("error with username or password!");
		});
	}
});
/*
 * **************** frontPage controller **********************
 */

app
		.controller(
				'frontPageController',
				function($scope, $localStorage) {

					$(".frontPageHeader").css("display","block");
					checkAmountOfUsers();
					if ($countUsersFiltered == 0)
						$(".frontPageWrapper").append("<h2>Please edit Filter Page </h2>")
					$cashDB = JSON.parse(localStorage.getItem("cashDB"));
					$myProfileDetails = JSON.parse(localStorage
							.getItem("myProfileDetails"));
					$myProfileImgs = JSON.parse(localStorage
							.getItem("myProfileImgs"));

					var usersLiked = JSON.parse(localStorage
							.getItem("myProfileDetails")).likes;

					// refresh myLikes local storage
					if (localStorage.getItem("myLikes"))
						usersLiked = JSON
								.parse(localStorage.getItem("myLikes"));
					else
						localStorage.setItem('myLikes', JSON
								.stringify(usersLiked));

					// initilize first refresh likes on page
					$scope.checkUserLike = function(userId) {
						userId = userId.toString();
						if ($.inArray(userId, usersLiked) != -1) {
							return true;
						} else {
							return false;
						}
					}

					// insert new like to array - local storage
					$scope.starClicked = function(userId) {
						if ($.inArray(userId, usersLiked) == -1) { // insert to
							// localstorage

							usersLiked.push(userId);
							localStorage.setItem('myLikes', JSON
									.stringify(usersLiked));
							// insert new like to DB
							$
									.post(
											"db.php",
											{
												'insertLike' : "insertLike",
												'id' : JSON
														.parse(localStorage
																.getItem("myProfileDetails")).id,
												'id_liked' : userId

											}, function() {
											}).fail(function() {
										alert("error inserting new like");
									});

						} else {
							usersLiked.splice($.inArray(userId, usersLiked), 1);
							localStorage.setItem('myLikes', JSON
									.stringify(usersLiked));
							$
									.post(
											"db.php",
											{
												'removeLike' : "removeLike",
												'id' : JSON
														.parse(localStorage
																.getItem("myProfileDetails")).id,
												'id_liked' : userId

											}, function() {
											}).fail(function() {
										alert("error inserting new like");
									});
						}
					}

					$scope.userIdClicked = function(user) {

						localStorage.setItem("profileSelected", user);
						window.location.href = "#/personProfile";
					}

					closeMenu();

					$scope.users = JSON.parse(localStorage
							.getItem("usersSelected"));

					
					/** ************************ LIKES ************************ */
					
					/* Like ME */
					
					
					$userLikesMe = [];
					$
					.post(
							"db.php",
							{
								'usersLikeMe' : "usersLikeMe",
								'id' : JSON
										.parse(localStorage
												.getItem("myProfileDetails")).id

							}, function(data) {
								data = $.parseJSON(data);
								$.each(data, function(key, value) {
									value.link =  value.link.replace(/\s+/g, '');
									$userLikesMe.push(value);
									localStorage.setItem("usersLikeMe", JSON.stringify($userLikesMe));
									
								});
								if (JSON.parse(localStorage.getItem("usersLikeMe")) > 0){
									for ($i = 0; $i < JSON.parse(localStorage.getItem("cashDB")).length; $i++) {
										for ($j = 0; $j < JSON.parse(localStorage
												.getItem("usersLikeMe")).length; $j++) {
											if (JSON.parse(localStorage
													.getItem("cashDB"))[$i].userId == JSON
													.parse(localStorage.getItem("usersLikeMe"))[$j].id_liked) {
	
												$scope.usersLikedMe = JSON.parse(localStorage.getItem("usersLikeMe"));
											}
										}
									}
								}

							}).fail(function() {
						alert("error inserting new like");
					});
					$scope.usersLikedMe = JSON.parse(localStorage.getItem("usersLikeMe"));

					
					/* users like */
					
					$userLikesOnly = [];
					for ($i = 0; $i < JSON.parse(localStorage
							.getItem("usersSelected")).length; $i++) {
						for ($j = 0; $j < JSON.parse(localStorage
								.getItem("myLikes")).length; $j++) {
							if (JSON.parse(localStorage
									.getItem("usersSelected"))[$i].userId == JSON
									.parse(localStorage.getItem("myLikes"))[$j]) {
								$userLikesOnly.push(JSON.parse(localStorage
										.getItem("usersSelected"))[$i]);
							}
						}
					}
					$scope.usersLiked = $userLikesOnly;
					

				});
/*
 * **************** signUp controller **********************
 */

app.controller('signUpController', function($scope) {
	closeMenu();
	$(".frontPageHeader").css("display","none");
	$scope.educations = $educations;
	$scope.academies = $academies;
	$myGender = $('.personGender').find(":selected").text();
	// check selected academy
	$scope.onchange = function(academySelected) {
		console.log(academySelected);
		$filterAcademy = academySelected;
	}
	// press on sign up button
	$("#form").submit(
			function() {
				$(".updateMyProfileNextPage").css("opacity",0.5);
				// get all data and insert to DB new user
				$myName = $(".personName").val().toLowerCase();
				$myPassword = $(".personPass").val().toLowerCase();
				$myAge = $(".personAge").val();
				$myGender = $('.personGender').find(":selected").val();
				$myAcademy = $('.chooseMyAcademieSelected').find(":selected")
						.text();
				$myEducation = $('.chooseMyEducationsSelected').find(
						":selected").text();
				$myYear = $('.chooseMyProfileYear').find(":selected").text();
				$.post(
						"db.php",
						{
							'InsertNewUser' : "InsertNewUser",
							newNameSelected : $myName,
							newPasswordSelected : $myPassword,
							newGenderSelected : $myGender,
							newAgeSelected : $myAge,
							newYearSelected : $myYear,
							newAcademySelected : $myAcademy,
							newEducationSelected : $myEducation
						},
						function(data) {
							data = $.parseJSON(data);
							$myProfileDetails[0].id = data;
							$myProfileDetails[0].Name = $myName;
							$myProfileDetails[0].gender = $myGender;
							$myProfileDetails[0].Age = $myAge;
							$myProfileDetails[0].academy = $myAcademy;
							$myProfileDetails[0].year = $myYear;
							$myProfileDetails[0].education = $myEducation;
							$myProfileDetails[0].likes = [];

							// updateImg
							var file_data = $('#sortpicture').prop('files')[0];
							//file_data =  file_data.replace(/\s+/g, '');
							if (!file_data) {
								return;
							}
							var form_data = new FormData();
							form_data.append('file', file_data);
							form_data.append('id', $myProfileDetails[0].id);
							$.ajax({
								url : 'db.php',
								dataType : 'text',
								cache : false,
								contentType : false,
								processData : false,
								data : form_data,
								type : 'post',
								success : function(php_script_response) {
									$(".updateMyProfileNextPage").css("opacity",1);
									// show img on screen when succsses to
									// upload
									$(".newImg").css(
											"background-image",
											"url('uploads/"
													+ php_script_response
													+ "')");
									

									// download my profile Imgs
									$.post(
											"db.php",
											{
												'myProfileImgs' : "myProfileImgs",
												loginId : $myProfileDetails[0].id
											},
											function(data) {
												data = $.parseJSON(data);
												$.each(data, function(key, value) {
													console.log(value.link);
													$myProfileImgs.push(value);
													localStorage.setItem("myProfileImgs", JSON
															.stringify($myProfileImgs));
												});
											}).fail(function() {
										alert("error with myProfileImgs");
									});
								}
							});
							
							
							
						}).fail(function() {
					alert("error uploading image, please try again");
				});
				// show next button
				$(".updateMyProfileAge").addClass("hidden");
				$(".updateMyProfileNextPage").removeClass("hidden");
				// disable the submit button
				$('input[type="submit"]').prop('disabled', true);
				$scope.nextPage = "#/profileFilterSignUp";
			});
});

/*
 * **************** FILTER signUp controller **********************
 */

app
		.controller(
				'profileFilterSignUpController',
				function($scope) {
					// default filter
					$filterGender = "boys";
					$filterFromAge = 18;
					$filterToAge = 35;
					$filterYear = "א";
					$filterAcademy = $('.chooseMyAcademieSelected').find(":selected").text();

					// checkAmountOfUsers();
					// initilize first school

					$scope.educations = $educations;
					$scope.academies = $academies;

					// filter AGE
					$("#slider-range")
							.slider(
									{
										range : true,
										min : 18,
										max : 35,
										values : [ $filterFromAge, $filterToAge ],
										slide : function(event, ui) {
											$("#amount")
													.val(
															"From: "
																	+ ui.values[0]
																	+ "                                         To: "
																	+ ui.values[1]);

											$filterFromAge = ui.values[0];
											$filterToAge = ui.values[1];
										}
									});
					$("#amount")
							.val(
									"From: "
											+ $("#slider-range").slider(
													"values", 0)
											+ "                                         To: "
											+ $("#slider-range").slider(
													"values", 1));

					
					// filter GENDER
					$(".selectGenderCover").click(
							function() {
								if ($(".selectGenderCover").hasClass(
										"coverTransformLeft")) {
									$(".selectGenderCover").addClass(
											"coverTransformRight");
									$(".selectGenderCover").removeClass(
											"coverTransformLeft");
									$filterGender = "girls";
								} else {
									$(".selectGenderCover").removeClass(
											"coverTransformRight");
									$(".selectGenderCover").addClass(
											"coverTransformLeft");
									$filterGender = "boys";
								}
							});

					// filter YEAR
					jQuery('.filterYear > span').each(function() {
						if ($filterYear == $(this).text())
							$(this).addClass("yearSelected");
						$(this).click(function() {
							// $elmid=$(this).data('ind');
							if ($(this).hasClass("yearSelected")) {
								$(this).removeClass("yearSelected");
							} else {
								jQuery('.filterYear > span').each(function() {
									$(this).removeClass("yearSelected");
								});
								$(this).addClass("yearSelected");
								$filterYear = $(this).text();
							}
						});
					});

					// check selected academy
					$scope.onchange = function(academySelected) {
						console.log( $('.chooseMyAcademieSelected').find(":selected").text());
						$filterAcademy =  $('.chooseMyAcademieSelected').find(":selected").text();
					}
					
					

					// update my profile filter details
					$scope.updateFilter = function() {
						$
								.post(
										"db.php",
										{
											'InsertNewUserFilter' : "InsertNewUserFilter",
											'myProfileId' : $myProfileDetails[0].id,
											'filterGender' : $filterGender,
											'filterFromAge' : $filterFromAge,
											'filterToAge' : $filterToAge,
											'filterAcademy' : $('.chooseMyAcademieSelected').find(":selected").text(),
											'filterYear' : $filterYear
										},
										function(data) {
											$('.chooseMyAcademieSelected').find(":selected")
											.text();
											$myProfileDetails[0].filterGender = $filterGender;
											$myProfileDetails[0].filterFromAge = $filterFromAge;
											$myProfileDetails[0].filterToAge = $filterToAge;
											$myProfileDetails[0].filterYear = $filterYear;
											console.log(   $('.chooseMyAcademieSelected').find(":selected").text());
											$myProfileDetails[0].filterAcademy =   $('.chooseMyAcademieSelected').find(":selected").text();
											console.log($myProfileDetails[0]);
											$cashDB.push($myProfileDetails[0]);

											localStorage
													.setItem(
															"myProfileDetails",
															JSON
																	.stringify($myProfileDetails[0]));

											// show next button
											$(".updateMyProfileAge").addClass(
													"hidden");
											$(".updateMyProfileFilterNextPage")
													.removeClass("hidden");
											// disable the submit button
											$('input[type="submit"]').prop(
													'disabled', true);
										}).fail(function() {
									alert("error update my profile details");
								});
					
					}
				});

/*
 * ********************* personProfile controller ****************
 */
app
.controller(
		'personProfileController',
		function($scope) {
			closeMenu();
			checkAmountOfUsers();
			// likes
			$myFavLikes = [];
			if (localStorage && localStorage.getItem('myLikes'))
				$myFavLikes = JSON.parse(localStorage
						.getItem('myLikes'));
			else
				localStorage.setItem('myLikes', JSON
						.stringify($myLikes));

			if ($.inArray(localStorage.getItem("profileSelected")
					.toString(), $myFavLikes) != -1) {
				$(".starProfile").addClass("yellowStarProfile");
				$(".starProfile").removeClass("activeStar");
			}

			$scope.starClicked = function(starClicked) {
				if ($.inArray(starClicked, $myFavLikes) == -1) {
					// insert to localstorage new favorite
					$myFavLikes.push(starClicked);
					localStorage.setItem('myLikes', JSON
							.stringify($myFavLikes));
					$(".starProfile").addClass("yellowStarProfile");
					$(".starProfile").removeClass("activeStar");
					// insert new like to DB
					$
							.post(
									"db.php",
									{
										'insertLike' : "insertLike",
										'id' : JSON
												.parse(localStorage
														.getItem("myProfileDetails")).id,
										'id_liked' : starClicked

									}, function() {
									}).fail(function() {
								alert("error inserting new like");
							});

				} else {
					// remove from localstorage
					$myFavLikes = $.grep($myFavLikes, function(value) {
						return value != starClicked;
					});
					localStorage.setItem('myLikes', JSON
							.stringify($myFavLikes));

					$(".starProfile").addClass("activeStar")
					$(".starProfile").removeClass("yellowStarProfile");
					
					$
					.post(
							"db.php",
							{
								'removeLike' : "removeLike",
								'id' : JSON
										.parse(localStorage
												.getItem("myProfileDetails")).id,
								'id_liked' : starClicked

							}, function() {
							}).fail(function() {
						alert("error inserting new like");
					});
				}
			}

			// slider
			$sliderWidth = 580;
			$ind = 0;
			$liImages = $(".chosenProfileSlider > ul > li").length;

			if ($ind == $liImages)
				jQuery(".rightArrow").css("display", "none");

			jQuery(".leftArrow").css("display", "none");

			$(".rightArrow").click(function() {
				jQuery(".leftArrow").css("display", "block");
				$ind++;
				$(".chosenProfileSlider > ul").animate({
					left : (-1 * $ind * $sliderWidth) + 'px'
				}, 600, function() {
					// Animation complete.

				});
				if ($ind == $liImages - 1)
					jQuery(".rightArrow").css("display", "none");
			});
			$(".leftArrow").click(function() {
				jQuery(".rightArrow").css("display", "block");
				$ind--;
				$(".chosenProfileSlider > ul").animate({
					left : (-1 * $ind * $sliderWidth) + 'px'
				}, 600, function() {
					// Animation complete.

				});
				if ($ind == 0)
					jQuery(".leftArrow").css("display", "none");
			});

			var findUserObjInCash = $.grep($cashDB,
					function(e) {
						if (e.userId == localStorage
								.getItem("profileSelected")) {
							return e;
						}
					});

			localStorage.setItem("findUserObjInCash", JSON
					.stringify(findUserObjInCash));

			if (localStorage
					&& localStorage.getItem('findUserObjInCash')) {
				$scope.profileSelected = JSON.parse(localStorage
						.getItem("findUserObjInCash"));
			}

			// download all the chat conversation with specific user
			$
					.post(
							"db.php",
							{
								'personMessages' : "personMessages",
								'id' : JSON.parse(localStorage
										.getItem("myProfileDetails")).id,
								'toId' : localStorage.getItem(
										"profileSelected").toString()
							},
							function(data) {
								data = $.parseJSON(data);
								angular
										.forEach(
												data,
												function(key, value) {
													if (key.from_id == JSON.parse(localStorage.getItem("myProfileDetails")).id) {
														$(".message").append("<pre style='float:right; color:#A80CE8'> : "
																				+ JSON.parse(localStorage.getItem("myProfileDetails")).Name
																				+ "</pre><li style='color:#A80CE8'>"
																				+ key.message
																				+ "</li>");
													}
													if (key.from_id == localStorage.getItem("profileSelected").toString()) {
														$(".message").append("<pre style='float:right; color:#5369FF'> : "
																				+ JSON.parse(localStorage.getItem("findUserObjInCash"))[0].Name
																				+ "</pre><li style='color:#5369FF'>"
																				+ data[0].message
																				+ "</li>");
													}
												});
							}).fail(function() {
						alert("error with personMessages");
					});

			// set interval for new messages
			interval_id = setInterval(updateNewMessages, 3000);
			function updateNewMessages() {
				$
						.post(
								"db.php",
								{
									'newMessages' : "newMessages",
									'id' : JSON
											.parse(localStorage
													.getItem("myProfileDetails")).id,
									'toId' : localStorage.getItem(
											"profileSelected")
											.toString()
								},
								function(data) {
									if (data != "") {
										data = $.parseJSON(data);
															$(".message").append("<pre style='float:right; color:#5369FF'> : "
																					+ JSON.parse(localStorage.getItem("findUserObjInCash"))[0].Name
																					+ "</pre><li style='color:#5369FF'>"
																					+ data[0].message
																					+ "</li>");
									}
								});
			}


			// submit new message
			$("#submitNewMessageForm").submit(function( event ) {
								$(".messageInput").val();
								$.post("db.php",{
													'personMessagesChat' : "personMessagesChat",
													'from_id' : JSON
															.parse(localStorage
																	.getItem("myProfileDetails")).id,
													'to_id' : localStorage
															.getItem(
																	"profileSelected")
															.toString(),
													'message' : $(
															".messageInput")
															.val()
												},
												function(data) {
													data = $.parseJSON(data);
														$(".message").append(
																"<pre style='float:right; color:#A80CE8'> : "
																								+ JSON.parse(localStorage.getItem("myProfileDetails")).Name
																								+ "</pre><li style='color:#A80CE8'>"
																								+ data[0].message
																								+ "</li>");
													$('.messageInput')
															.val("");
												})
										.fail(
												function() {
													alert("error with personMessagesChat");
												});
							});
			
			
		

		});


/*
 * ********************* MENU my profile controller ****************
 */

app
		.controller(
				'profileController',
				function($scope) {
					checkAmountOfUsers();
					closeMenu();
					$myProfileDetails[0] = JSON.parse(localStorage
							.getItem("myProfileDetails"));
					var myProfileImgsArr = JSON.parse(localStorage
							.getItem("myProfileImgs"));

					$scope.myProfileImgs = myProfileImgsArr;
					$scope.myProfileDetails = $myProfileDetails[0];

					// set year to my profile details
					$(".chooseMyProfileYear > option").each(
							function() {
								if ($(this).text() == JSON.parse(localStorage
										.getItem("myProfileDetails")).year)
									$(this).attr("selected", "selected");
							});

					// set academy to my profile details
					$(".chooseMyAcademieSelected > option").each(
							function() {
								if ($(this).text() == JSON.parse(localStorage
										.getItem("myProfileDetails")).academy)
									$(this).attr("selected", "selected");
							});

					// update my profile details
					$(".updateMyProfileAge")
							.click(
									function() {
										$(".updateMyProfileAge").css(
												"box-shadow",
												"2px 6px 5px #888888");
										$newAgeSelected = $('.personAge').val();
										$newYearSelected = $(
												'.chooseMyProfileYear').find(
												":selected").text();
										$newAcademySelected = $(
												'.chooseMyAcademieSelected')
												.find(":selected").text();
										$newEducationSelected = $(
												'.chooseMyEducationsSelected')
												.find(":selected").text();
										if ($('.personName').val() != "")
											$newNameSelected = $('.personName')
													.val();
										else
											$newNameSelected = JSON
													.parse(localStorage
															.getItem("myProfileDetails")).Name;
										$
												.post(
														"db.php",
														{
															'updateMyProfileDetails' : "updateMyProfileDetails",
															updateId : $myProfileDetails[0].id,
															newNameSelected : $newNameSelected,
															newGenderSelected : $myProfileDetails[0].gender,
															newAgeSelected : $newAgeSelected,
															newYearSelected : $newYearSelected,
															newAcademySelected : $newAcademySelected,
															newEducationSelected : $newEducationSelected

														},
														function() {
															$myProfileDetails[0].Name = $newNameSelected;
															$myProfileDetails[0].Age = $newAgeSelected;
															$myProfileDetails[0].academy = $newAcademySelected;
															$myProfileDetails[0].year = $newYearSelected;
															$myProfileDetails[0].education = $newEducationSelected;
															localStorage
																	.setItem(
																			"myProfileDetails",
																			JSON
																					.stringify($myProfileDetails[0]));

														})
												.fail(
														function() {
															alert("error update my profile details");
														});

										// updateImg
										var file_data = $('#sortpicture').prop(
												'files')[0];
										if (!file_data) {
											return;
										}

										$userId = JSON.parse(localStorage
												.getItem("myProfileDetails")).id;
										var form_data = new FormData();
										form_data.append('file', file_data);
										form_data.append('id', $userId);
										$
												.ajax({
													url : 'db.php',
													dataType : 'text',
													cache : false,
													contentType : false,
													processData : false,
													data : form_data,
													type : 'post',
													success : function(
															php_script_response) {
														jQuery(".rightArrow")
																.css("display",
																		"block");
														$(".profileSlider > ul")
																.prepend(
																		"<li class='coverBackground' style='background-size:cover; background: url(uploads/"
																				+ php_script_response
																				+ ")'></li>");
														$liImages++;
														$('.noImg').addClass(
																"hidden");
														if ($liImages == 0
																|| $liImages == 1) {
															jQuery(
																	".rightArrow")
																	.css(
																			"display",
																			"none");
														} else {
															jQuery(
																	".rightArrow")
																	.css(
																			"display",
																			"block");
														}
														// download my updated
														// profile Imgs
														$myProfileImgs = [];
														$
																.post(
																		"db.php",
																		{
																			'myProfileImgs' : "myProfileImgs",
																			loginId : JSON
																					.parse(localStorage
																							.getItem("myProfileDetails")).id
																		},
																		function(
																				data) {
																			data = $
																					.parseJSON(data);
																			$
																					.each(
																							data,
																							function(
																									key,
																									value) {
																								$myProfileImgs
																										.push(value);
																								localStorage
																										.setItem(
																												"myProfileImgs",
																												JSON
																														.stringify($myProfileImgs));
																							});
																		})
																.fail(
																		function() {
																			alert("error with myProfileImgs");
																		});
													}
												});
									});

					$scope.educations = $educations;
					$scope.academies = $academies;

					// slider
					$sliderWidth = 580;
					$ind = 0;
					$liImages = JSON.parse(localStorage
							.getItem("myProfileImgs")).length;
					jQuery(".leftArrow").css("display", "none");
					if ($liImages == 0) {
						jQuery(".rightArrow").css("display", "none");
						$(".profileSlider > ul")
								.prepend(
										"<li class='coverBackground noImg' style='background: url(uploads/noImg.png)'></li>");
					}
					if ($liImages == 1) {
						jQuery(".rightArrow").css("display", "none");
					}
					$(".rightArrow").click(function() {
						jQuery(".leftArrow").css("display", "block");
						$ind++;
						$(".profileSlider > ul").animate({
							left : (-1 * $ind * $sliderWidth) + 'px'
						}, 600, function() {
							// Animation complete.

						});
						if ($ind == $liImages - 1)
							jQuery(".rightArrow").css("display", "none");
					});
					$(".leftArrow").click(function() {
						jQuery(".rightArrow").css("display", "block");
						$ind--;
						$(".profileSlider > ul").animate({
							left : (-1 * $ind * $sliderWidth) + 'px'
						}, 600, function() {
							// Animation complete.

						});
						if ($ind == 0)
							jQuery(".leftArrow").css("display", "none");
					});

				});
/*
 * ********************* MENU filter controller ****************
 */

app
		.controller(
				'filterController',
				function($scope) {
					closeMenu();
					$myProfileDetails[0] = JSON.parse(localStorage
							.getItem("myProfileDetails"));
					if ($myProfileDetails[0].filterGender == "girls") {
						$(".selectGenderCover").addClass("coverTransformRight");
						$(".selectGenderCover").removeClass(
								"coverTransformLeft");
						$myProfileDetails[0].filterGender = "girls";

					} else {
						$(".selectGenderCover").removeClass(
								"coverTransformRight");
						$(".selectGenderCover").addClass("coverTransformLeft");
						$myProfileDetails[0].filterGender = "boys";
					}

					// get my profile filter details
					$filterGender = JSON.parse(localStorage
							.getItem("myProfileDetails")).filterGender;
					$filterFromAge = JSON.parse(localStorage
							.getItem("myProfileDetails")).filterFromAge;
					$filterToAge = JSON.parse(localStorage
							.getItem("myProfileDetails")).filterToAge;
					$filterYear = JSON.parse(localStorage
							.getItem("myProfileDetails")).filterYear;
					$filterAcademy = JSON.parse(localStorage
							.getItem("myProfileDetails")).filterAcademy;

					localStorage.setItem("myProfileDetails", JSON
							.stringify($myProfileDetails[0]));

					$("#slider-range")
							.slider(
									{
										range : true,
										min : 18,
										max : 35,
										values : [ $filterFromAge, $filterToAge ],
										slide : function(event, ui) {
											$("#amount")
													.val(
															"From: "
																	+ ui.values[0]
																	+ "                                         To: "
																	+ ui.values[1]);

											$filterFromAge = ui.values[0];
											$filterToAge = ui.values[1];
											$myProfileDetails[0].filterFromAge = ui.values[0];
											$myProfileDetails[0].filterToAge = ui.values[1];
											localStorage
													.setItem(
															"myProfileDetails",
															JSON
																	.stringify($myProfileDetails[0]));
										}
									});
					$("#amount")
							.val(
									"From: "
											+ $("#slider-range").slider(
													"values", 0)
											+ "                                         To: "
											+ $("#slider-range").slider(
													"values", 1));

					$(".selectGenderCover")
							.click(
									function() {
										if ($(".selectGenderCover").hasClass(
												"coverTransformLeft")) {

											$myProfileDetails[0].filterGender = "girls";
											$(".selectGenderCover").addClass(
													"coverTransformRight");
											$(".selectGenderCover")
													.removeClass(
															"coverTransformLeft");
										} else {
											$myProfileDetails[0].filterGender = "boys";
											$(".selectGenderCover")
													.removeClass(
															"coverTransformRight");
											$(".selectGenderCover").addClass(
													"coverTransformLeft");
										}

										localStorage
												.setItem(
														"myProfileDetails",
														JSON
																.stringify($myProfileDetails[0]));
									});
					jQuery('.filterYear > span').each(function() {
						if ($filterYear == $(this).text())
							$(this).addClass("yearSelected");
						$(this).click(function() {
							// $elmid=$(this).data('ind');
							if ($(this).hasClass("yearSelected")) {
								$(this).removeClass("yearSelected");
							} else {
								jQuery('.filterYear > span').each(function() {
									$(this).removeClass("yearSelected");
								});
								$(this).addClass("yearSelected");
								$filterYear = $(this).text();
							}
						});
					});

					checkAmountOfUsers();

					$scope.educations = $educations;
					$scope.academies = $academies;

					if (localStorage
							&& localStorage.getItem('myProfileDetails')) {
						$scope.myProfileDetails = JSON.parse(localStorage
								.getItem("myProfileDetails"));
					}

					// UPDATE DB FILTER
					$scope.updateFilter = function() {
						if ($(".selectGenderCover").hasClass(
								"coverTransformLeft")) {
							// boys
							$filterGender = "boys";
						} else
							$filterGender = "girls";

						$filterAcademy = $('.chooseMyAcademieSelected').find(
								":selected").text();
						$
						$myProfileDetails[0].filterAcademy = $filterAcademy;
						localStorage.setItem("myProfileDetails", JSON
								.stringify($myProfileDetails[0]));
						$
								.post(
										"db.php",
										{
											'myProfileFilter' : "myProfileFilter",
											'myProfileId' : JSON
													.parse(localStorage
															.getItem("myProfileDetails")).id,
											'filterGender' : $filterGender,
											'filterFromAge' : $filterFromAge,
											'filterToAge' : $filterToAge,
											'filterAcademy' : $filterAcademy,
											'filterYear' : $filterYear
										},
										function() {
											// update my profile filter details
											$myProfileDetails[0].filterGender = $filterGender;
											$myProfileDetails[0].filterFromAge = $filterFromAge;
											$myProfileDetails[0].filterToAge = $filterToAge;
											$myProfileDetails[0].filterYear = $filterYear;
											$myProfileDetails[0].filterAcademy = $filterAcademy;
											checkAmountOfUsers();
											localStorage
													.setItem(
															"myProfileDetails",
															JSON
																	.stringify($myProfileDetails[0]));

										}).fail(function() {
									alert("error with myProfileFilter");
								});

					}

				});
/*
 * ********************* MENU messages controller ****************
 */

app.controller('messagesController', function($scope, $localStorage) {
	closeMenu();
	checkAmountOfUsers();
	var messagesUsers = [];
	$.post("db.php", {
		'messagesWindow' : "messagesWindow",
		'myProfileId' : JSON.parse(localStorage.getItem("myProfileDetails")).id
	}, function(data) {
		if (data != "") {
			data = $.parseJSON(data);
			angular.forEach(data, function(key, value) {
				angular.forEach(key, function(key2, value2) {
					messagesUsers.push(key2);
				});
			});

			$scope.messages = messagesUsers;
			$scope.$apply();
		} else {
			alert("no messages here :)");
		}
	}).fail(function() {
		alert("error bringing messages data");
	});

	$scope.userIdClicked = function(user) {

		localStorage.setItem("profileSelected", user);
		window.location.href = "#/personProfile";
	}
});

/*
 * ********************* MENU exit controller ****************
 */

app.controller('exitController', function($scope) {
	closeMenu();
	localStorage.clear();
	window.location.href = "index.php";
});

/**
 * ******************************** FUNCTIONS *******************************
 */

// JSON.parse(localStorage.getItem("myProfileDetails")).id;
// localStorage.setItem("myProfileDetails", JSON.stringify(usersSelected));
// JSON.stringify($myProfileDetails[0]));
var usersSelected = [];
function checkAmountOfUsers() {
	
	//set Theme Color
	if (JSON.parse(localStorage.getItem("myProfileDetails")).gender === "male"){
		$(".frontPageHeader").css("background","#00c0ff");
		$(".menuWrapper").css("background","#00c0ff");
		$(".frontPageHeader > a").addClass("logoHeadRed").removeClass("logoHead");
	}
	else{
		$(".frontPageHeader").css("background","#fe818f");
		$(".menuWrapper").css("background","#fe818f");
	}
	
	// get amount of users by filter and display them
	$countUsersFiltered = 0;
	$myProfileDetails[0] = $
			.parseJSON(localStorage.getItem("myProfileDetails"));
	if ($.parseJSON(localStorage.getItem("myProfileDetails")).filterGender == "boys") {
		$defineGender = "male";
		$myProfileDetails[0].filterGender = "boys";
		localStorage.setItem("myProfileDetails", JSON
				.stringify($myProfileDetails[0]));
	} else {
		$defineGender = "female";
		$myProfileDetails[0].filterGender = "girls";
		localStorage.setItem("myProfileDetails", JSON
				.stringify($myProfileDetails[0]));
	}
	if ($cashDB.length > 0) {
		usersSelected = [];

		angular
				.forEach(
						$cashDB,
						function(key, value) {
							if ($cashDB[value].gender == $defineGender
									&& $cashDB[value].id != JSON.parse(localStorage.getItem("myProfileDetails")).id
									&& $cashDB[value].userId != JSON.parse(localStorage.getItem("myProfileDetails")).id
									&& parseInt(JSON.parse(localStorage
											.getItem("myProfileDetails")).filterFromAge) <= parseInt($cashDB[value].Age)
									&& parseInt(JSON.parse(localStorage
											.getItem("myProfileDetails")).filterToAge) >= parseInt($cashDB[value].Age)
									&& JSON.parse(localStorage
											.getItem("myProfileDetails")).filterAcademy == $cashDB[value].academy) {
								usersSelected.push($cashDB[value]);
								$countUsersFiltered++;
							}
						});

		localStorage.setItem("usersSelected", JSON.stringify(usersSelected));
		$(".frontPageHeader > h3").html($countUsersFiltered + " ");
		if ($defineGender == "male")
			$(".frontPageHeader > h3").append("Boys");
		else
			$(".frontPageHeader > h3").append("Girls");
	}
}
function closeMenu() {
	$(".frontPageHeader").removeClass("hidden");
	$(".menuWrapper").removeClass("hidden");
	$(".menuWrapper").addClass("closeMenu");
	window.clearInterval(interval_id);
	$(".menuWrapper").animate({
		width : "0%"
	}, 300, function() {
		$(".menuWrapper > ul > li > a").css("display", "none");
		$(".menuWrapper > ul > li > div").css("display", "none");
		// Animation complete.
	});
}
$(".menu").click(function() {
	// open the menu

	if ($(".menuWrapper").hasClass("closeMenu")) {
		$mobileMenu = "370px";
		$mobHeight = "424px";
		$toggleMenu = "block";
		$(".menuWrapper").removeClass("closeMenu");
	} else {
		// close the menu
		$mobileMenu = "0px";
		$mobHeight = "0px";
		$toggleMenu = "none";
		$(".menuWrapper").addClass("closeMenu");
	}
	$(".menuWrapper").animate({
		height : $mobHeight,
		width : $mobileMenu
	}, 300, function() {
		$(".menuWrapper > ul > li > a").css("display", $toggleMenu);
		// Animation complete.
		$(".menuWrapper > ul > li > div").css("display",$toggleMenu);
	});
});
$(".frontPageHeader > h3").click(function() {
	closeMenu();
	window.location.href = "#/front-page";
});
$(".logoHead").click(function() {
	closeMenu();
	localStorage.clear();
	window.location.href = "index.php";
});
