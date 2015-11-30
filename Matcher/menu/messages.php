<div class="frontPageWrapper">
	<div class="personWrapper messageSect" ng-repeat="message in messages">

		<a data-ind="{{message.userId}}"  ng-click="userIdClicked(message.userId)"><div class="messageDetails">
				<h2>{{message.Name}}</h2>
				<h3>{{message.Age}}</h3>
				<h3>{{message.academy}}</h3>
			</div> <img
			ng-style="{'background-image':'url(uploads/{{message.link}})'}"
			back-img="{{message.link}}"> </a>
	</div>
</div>
