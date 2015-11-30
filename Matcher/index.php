<!DOCTYPE html>
<html ng-app="matcherApp">
<head>
<title>Matcher</title>
<meta name="viewport" content="width=device-width" />
<link rel="stylesheet" type="text/css" media="all" href="css/style.css" />
<link rel="stylesheet" type="text/css" media="all" href="img/sprites/sprite.css" />
<script src="js/jquery-1.11.1.min.js"></script>
<script src="js/jquery-ui.min.js"></script>
</head>
<body>
	<header>
		<div class="frontPageHeader hidden">
			<div class="sprite menu"></div>
			<a class="sprite logoHead"></a>
			<h3></h3>
		</div>
	</header>
	<div class="wrapper">
		<div class="menuWrapper closeMenu" style="width: 0%;">
			<ul>
				<a href="#/Profile"><div class="profilePicPage">
				
				<div class="" ng-style="{'background-image':'url(uploads/{{img.link}})'}" back-img="{{img.link}}"></div>
				
				</div></a>
				<li><div class="sprite profileIcon"></div><a href="#/Profile">Profile</a></li><hr>
				<li><div class="sprite filterIcon"></div><a href="#/Filter">Filter</a></li><hr>
				<li><div class="sprite messagesIcon"></div><a href="#/Messages">Messages</a></li><hr>
				<li><div class="sprite likeIcon"></div><a href="#/Likes">Likes</a></li><hr>
				<li><div class="sprite exitIcon"></div><a href="#/Exit">Exit</a></li>
			</ul>
		</div>
		<div ng-view></div>
	</div>
	<script src="js/lib/angular/angular.min.js"></script>
	<script src='js/lib/angular/angular-cookies.min.js'></script>
	<script src="js/lib/angular/angular-route.min.js"></script>
	<script src="js/lib/angular/ngStorage.min.js"></script>
	<script src="js/site.js"></script>
</body>
</html>