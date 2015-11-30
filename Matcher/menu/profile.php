<div class="frontPageWrapper">
	<div class="profileSlider">
		<div class="sprite leftArrow"></div>
		<div class="sprite rightArrow"></div>
		<ul data-role="listview">
			<li ng-repeat="img in myProfileImgs"
				ng-style="{'background-image':'url(uploads/{{img.link}})'}"
				back-img="{{img.link}}"></li>
		</ul>
		<input class="personName" type="text"
			placeholder="{{myProfileDetails.Name}}">

		<div class="sprite edit">
			<input id="sortpicture" type="file" accept="image/*;capture=camera"
				 name="sortpic">
		</div>
		<div class="flc"></div>

		<div class="rightProfile">
			<h3>:גיל</h3>
			<div class="flc"></div>
			<h3>:אקדמיה</h3>
			<div class="flc"></div>
			<h3>:מקצוע</h3>
			<div class="flc"></div>
			<h3>:שנה</h3>
		</div>
		<div class="leftProfile">

			<div class="choosePersonProfile">
				<input class="personAge" type="text" value="{{myProfileDetails.Age}}" placeholder="{{myProfileDetails.Age}}" />
				<div class="flc"></div>
				<h2 class="personAge"></h2>
				<select class="personAge chooseMyAcademieSelected" dir="rtl">
					<option value="{{ac.Name}}" ng-selected="ac.Name == myProfileDetails.academy" ng-repeat="ac in academies">{{ac.Name}}</option>
				</select>

				<div class="flc"></div>
				<select class="personAge chooseMyEducationsSelected" dir="rtl">
					<option value="{{ed.Name}}" ng-selected="ed.Name == myProfileDetails.education" ng-repeat="ed in educations">{{ed.Name}}</option>
				</select>
				<div class="flc"></div>
				<select dir="rtl" class="chooseMyProfileYear">
				<?php
				
$yearsArr = [ 
						"א",
						"ב",
						"ג",
						"ד",
						"ה",
						"ו",
						"ז" 
				];
				for($i = 0; $i < count ( $yearsArr ); $i ++) {
					?>
					<option><?php echo $yearsArr[$i]; ?></option>
					<?php } ?>
				</select>
			</div>
		</div>
	</div>
	
				<h3 class="updateMyProfileAge">עדכן</h3>
</div>