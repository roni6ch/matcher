
<div class="frontPageWrapper">
	<div class="chosenProfileSlider">
		<div class="sprite leftArrow"></div>
		<div class="sprite rightArrow"></div>
		<ul>
			<li ng-repeat="img in profileSelected"
				ng-style="{'background-image':'url(uploads/{{img.link}})'}"
				back-img="{{img.link}}"></li>
		</ul>
		<div data-ind="{{profileSelected[0].userId}}"
			class="sprite starProfile activeStar"
			ng-click="starClicked(profileSelected[0].userId)"></div>
		<h2>{{profileSelected[0].Name}}</h2>
		<h4>גיל: {{profileSelected[0].Age}}</h4>
		<h4>{{profileSelected[0].academy}} , {{profileSelected[0].education}}</h4>
	</div>
	<h2 class="messages">צ'אט</h2>
	<div class="chat">
		<ul class="message" >
		</ul>
		<form id="submitNewMessageForm">
			<input type="submit" class="submitNewMessage"><input type="text" class="messageInput">
		</form>
	</div>
</div>
