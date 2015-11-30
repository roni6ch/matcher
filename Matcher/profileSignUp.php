<div class="frontPageWrapper">
	<form id="form">
		<div class="profileSlider">
			<div class="noImg newImg"></div>
			<h3>:שם</h3>
			<input class="personName" type="text" required
				placeholder="אנא הכנס\י שם">

			<div class="sprite edit">
				<!-- IMG -->
				<input id="sortpicture" type="file" required
					accept="image/x-png, image/gif, image/jpeg" name="sortpic">
			</div>
			<div class="flc"></div>
			<div class="rightProfile">
				<h3>:סיסמה</h3>
				<div class="flc"></div>
				<h3>:מין</h3>
				<div class="flc"></div>
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
					<!-- PASSWORD -->
					<input autocomplete class="personPass" type="password" required
						placeholder="אנא הכנס\י סיסמה" />
					<div class="flc"></div>
					<!-- GENDER -->
					<select required class="personGender" dir="rtl">
						<option name="male" value="male">זכר</option>
						<option name="female" value="female">נקבה</option>
					</select>
					<div class="flc"></div>
					<!-- AGE -->
					<input class="personAge" type="text" required
						placeholder="אנא הכנס\י גיל" />
					<div class="flc"></div>
					<!-- ACADEMY -->
					<select required class="personAge chooseMyAcademieSelected" dir="rtl" ng-model="selectedItem" ng-init="selectedItem='שנקר'" ng-change="onchange(selectedItem)">
						<option value="{{ac.Name}}"   ng-selected="selectedItem == ac.Name"   ng-repeat="ac in academies"  ng-model="ac.Name">{{ac.Name}}</option>
					</select>

					<div class="flc"></div>
					<!-- EDUCATION -->
					<select required class="chooseMyEducationsSelected" dir="rtl">
						<option value="{{ed.Name}}"
							ng-selected="ed.Name == myProfileDetails.education"
							ng-repeat="ed in educations">{{ed.Name}}</option>
					</select>
					<div class="flc"></div>
					<!-- YEAR -->
					<select required dir="rtl" class="chooseMyProfileYear">
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

		<input type="submit" class="updateMyProfileAge" /> <a
			ng-href="{{nextPage}}" class="updateMyProfileNextPage hidden">עמוד
			הבא</a>
	</form>
</div>