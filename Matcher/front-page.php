<div class="frontPageWrapper">
	<div class="personWrapper" ng-repeat="user in users" >
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
