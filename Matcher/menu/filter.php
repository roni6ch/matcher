<div class="filtersWrapper">
	<div class="filterGender">
		<div class="sprite genderIcon"></div>
		<h3>Gender:</h3>
		<div class="selectGender">
			<div class="selectGenderCover coverTransformLeft"></div>
			<div class="selectGenderGirls">Girls</div>
			<div class="selectGenderBoys">Boys</div>
		</div>
	</div>
	<div class="filterAge">
		<div class="sprite AgeIcon"></div>
		<h3>Age:</h3>
		<input type="text" id="amount" readonly
			style="border: 0; color: #f6931f; font-weight: bold;">
		<div id="slider-range"></div>
	</div>
	<div class="filterEducation">
		<div class="sprite acedamyIcon"></div>
		<h3>Education:</h3>
			<select class="personAge chooseMyAcademieSelected" dir="rtl">
					<option value="{{ac.Name}}" ng-selected="ac.Name == myProfileDetails.filterAcademy" ng-repeat="ac in academies">{{ac.Name}}</option>
				</select>
	</div>
	<!-- <div class="filterYear">
		<div class="sprite educationIcon"></div>
		<h3>Year:</h3>
		<span data-ind="1">א</span>
		<span data-ind="2">ב</span>
		<span data-ind="3">ג</span>
		<span data-ind="4">ד</span>
		<span data-ind="5">ה</span>
		<span data-ind="6">ו</span>
		<span data-ind="7">ז</span>
	</div> -->
		<h3 class="updateMyProfileAge" ng-click="updateFilter()">עדכן</h3>
</div>










