<div class="frontPageWrapper">
<h2 class="likesHL">People Like You</h2>
<div class="personWrapper" ng-repeat="u in usersLikedMe">
		<a data-ind="{{u.userId}}" class="profileImg"	ng-click="userIdClicked(u.userId)"
			ng-style="{'background-image':'url(uploads/'+u.link+')'}"></a>
		<div class="personInfo">
			<h2>{{u.Age}} , {{u.Name}}</h2>
		</div>
	</div>
	<div style="padding:20px; display:block; width:100%; float:right; height:20px;"></div>
<h2 class="likesHL">People You Like</h2>
	<div class="personWrapper" ng-repeat="user in usersLiked">
		<a data-ind="{{user.userId}}" class="profileImg"	ng-click="userIdClicked(user.userId)"
			ng-style="{'background-image':'url(uploads/'+user.link+')'}"></a>
		<div class="personInfo">
			<div  ng-class="{'yellowStar': checkUserLike({{user.userId}})}"
			ng-click="starClicked(user.userId)" 
			 data-star="{{user.userId}}" class="sprite star activeStar"></div>
			<h2>{{user.Name}}</h2>
		</div>
	</div>
</div>
