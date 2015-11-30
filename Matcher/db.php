<?php
// localhost
/*
 $servername = "localhost";
 $username = "root";
 $password = "";
 $dbname = "matcher";
*/
 
// ftp
// http://easyskool.com/roni/Matcher

$servername = "localhost";
$username = "ezcom_roni";
$password = "roni123roni";
$dbname = "ezcom_matcher";
header ( 'content-type: text/html; charset=UTF-8' );

 
// Create connection
$conn = new mysqli ( $servername, $username, $password, $dbname );

// make the charset HEBREW support
if (function_exists ( 'mysql_set_charset' )) {
	mysqli_set_charset ( $conn, 'utf8' );
} else {
	mysqli_query ( $conn, "SET NAMES 'utf8'" );
}

function passwordHash($pass) {
	//return password_hash ( $pass, PASSWORD_BCRYPT );
	return md5($pass);
}

// Check connection
if (!$conn) {
	die ( "Connection failed: " . $conn->connect_error );
} 

// TODO: return back the dbToCash as group pictures
else {
	switch (true) {
		case isset ( $_POST ["dbToCash"] ) :
			if (isset ( $_POST ["dbToCash"] ) && ! empty ( $_POST ["dbToCash"] )) {
				$result = $conn->query ( "SELECT * FROM users JOIN usersimgs ON users.id=usersimgs.userId GROUP BY usersimgs.userId" );
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				echo json_encode ( $data );
			}
			break;
		case isset ( $_POST ["loginUser"] ) :
			$name = $_POST ["nameLogin"];
			if ( isset ( $_POST ["nameLogin"] ) && !empty ( $_POST ["nameLogin"])&& isset($_POST ["passwordLogin"] ) && !empty ( $_POST ["passwordLogin"] )) {
				$passHash = passwordHash ( $_POST ["passwordLogin"] );
				// first select id
				$result = $conn->query ( "SELECT id FROM users WHERE Name='" . $name . "'" );

				if ($result->num_rows > 0) {

					// output data of each row
					while ( $row = $result->fetch_assoc () ) {
						$id = $row ['id'];
					}
					
					// then select all my details
					$result2 = $conn->query ( "SELECT * FROM users LEFT JOIN likes ON users.id=likes.id WHERE users.id='" . $id . "' " );
					//if user has likes
					if ($result2->num_rows > 0) {
						$id_liked_arr = array ();
						while ( $row = $result2->fetch_assoc () ) {
							if ($row ['id_liked'] != NULL) {
								array_push ( $id_liked_arr, $row ['id_liked'] );
							}
							$arr = $row;
							$passFromDB = $row ['password'];
						}
						
						$arr ["id_liked"] = $id_liked_arr;
						$arr ["id"] = $id;
						// var_dump("id_liked: " . $a ["id_liked"] );
						if ($passHash == $passFromDB ) {
							echo json_encode ( $arr );
						} else {
							echo false;
						}
					} else {
						//user has no likes
						$result = $conn->query ( "SELECT * FROM users WHERE users.id='" . $id . "' " );
						while ( $row = $result->fetch_assoc () ) {
							$passFromDB = $row ['password'];
						}
						$result2 = $conn->query ( "SELECT * FROM users WHERE users.id='" . $id . "' " );
						if ($passHash == $passFromDB ) {
							$data = $result2->fetch_all ( MYSQLI_ASSOC );
							echo json_encode ( $data [0] );
						} else {
							echo false;
						}
					}
				} else {
					echo "";
				}
			}
			break;
			case isset ( $_POST ["SelectedProfile"] ) :
				if (isset ( $_POST ["loginId"] ) && ! empty ( $_POST ["loginId"] )) {
					$result = $conn->query ( "SELECT * FROM usersimgs WHERE userId='" . $_POST ["loginId"] . "'" );

					$id_selected_arr = array ();
					if ($result->num_rows > 0) {
						while ( $row = $result->fetch_assoc () ) {
							if ($row ['link'] != NULL) {
								array_push ( $id_selected_arr, $row ['link'] );
							}
							$arr = $row;
						}
						$arr ["link"] = $id_selected_arr;
					}
					echo json_encode ( $arr );
				}
				break;
		case isset ( $_POST ["myProfileImgs"] ) :
			if (isset ( $_POST ["loginId"] ) && ! empty ( $_POST ["loginId"] )) {
				$result = $conn->query ( "SELECT * FROM usersimgs WHERE userId='" . $_POST ["loginId"] . "'" );
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				echo json_encode ( $data );
			}
			break;
		case isset ( $_POST ["updateMyProfileDetails"] ) :
			if (isset ( $_POST ["updateMyProfileDetails"] ) && ! empty ( $_POST ["updateMyProfileDetails"] ) && isset ( $_POST ["newEducationSelected"] ) && ! empty ( $_POST ["newEducationSelected"] ) && isset ( $_POST ["newAcademySelected"] ) && ! empty ( $_POST ["newAcademySelected"] ) && isset ( $_POST ["newAgeSelected"] ) && ! empty ( $_POST ["newAgeSelected"] )) {
				$result = $conn->query ( "UPDATE users SET gender ='" . $_POST ["newGenderSelected"] . "' , Name ='" . $_POST ["newNameSelected"] . "' , education ='" . $_POST ["newEducationSelected"] . "' , Age ='" . $_POST ["newAgeSelected"] . "' , academy ='" . $_POST ["newAcademySelected"] . "' , year = '" . $_POST ["newYearSelected"] . "' WHERE id ='" . $_POST ["updateId"] . "' " );
				echo $result;
			} else {
				echo "N0T updated";
			}
			break;
		case isset ( $_POST ["InsertNewUser"] ) :
			if (isset ( $_POST ["InsertNewUser"] ) && ! empty ( $_POST ["InsertNewUser"] ) && isset ( $_POST ["newNameSelected"] ) && ! empty ( $_POST ["newNameSelected"] ) && isset ( $_POST ["newPasswordSelected"] ) && ! empty ( $_POST ["newPasswordSelected"] ) && isset ( $_POST ["newEducationSelected"] ) && ! empty ( $_POST ["newEducationSelected"] ) && isset ( $_POST ["newAcademySelected"] ) && ! empty ( $_POST ["newAcademySelected"] ) && isset ( $_POST ["newAgeSelected"] ) && ! empty ( $_POST ["newAgeSelected"] )) {
				$passHash = passwordHash ( $_POST ["newPasswordSelected"] );
				$result = $conn->query ( "INSERT users SET Name ='" . $_POST ["newNameSelected"] . "' ,password ='" . $passHash . "' , gender ='" . $_POST ["newGenderSelected"] . "' , education ='" . $_POST ["newEducationSelected"] . "' , Age ='" . $_POST ["newAgeSelected"] . "' , academy ='" . $_POST ["newAcademySelected"] . "' , year = '" . $_POST ["newYearSelected"] . "'" );
				$last_id = mysqli_insert_id ( $conn );
				echo $last_id;
			} else {
				echo "N0T updated";
			}
			break;
		case isset ( $_POST ["InsertNewUserFilter"] ) :
			if (isset ( $_POST ["InsertNewUserFilter"] )) {
				$result = $conn->query ( "UPDATE users SET filterGender ='" . $_POST ["filterGender"] . "' , filterFromAge ='" . $_POST ["filterFromAge"] . "' , filterToAge ='" . $_POST ["filterToAge"] . "' , filterAcademy = '" . $_POST ["filterAcademy"] . "' , filterYear = '" . $_POST ["filterYear"] . "' WHERE id ='" . $_POST ["myProfileId"] . "' " );
			} else {
				echo "N0T updated";
			}
			break;
		case isset ( $_FILES ['file'] ['name'] ) :
			if (0 < $_FILES ['file'] ['error']) {
				echo 'Error: ' . $_FILES ['file'] ['error'] . '<br>';
			} else {
				//$_FILES ['file']['name'] = preg_replace ( '/\s+/', ' ', $_FILES ['file'] ['name'] );
				$fileName = str_replace(' ', '',$_FILES ['file'] ['name']);
				$file_destination = 'uploads' . DIRECTORY_SEPARATOR . $_FILES ['file'] ['name'];
				$file_destination = str_replace(' ', '',$file_destination);
				move_uploaded_file ( $_FILES ['file'] ['tmp_name'],$file_destination );
				//var_dump("file:".$fileName);
				$sql = "INSERT INTO usersimgs (userId, link) VALUES ('" . $_POST ["id"] . "',' $fileName ')";
				if ($conn->query ( $sql ) === TRUE) {
					echo $fileName;
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
			break;
		case isset ( $_POST ["academies"] ) :
			if (isset ( $_POST ["academies"] ) && ! empty ( $_POST ["academies"] )) {
				$result = $conn->query ( "SELECT * FROM academies" );
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				echo json_encode ( $data );
			}
			break;
		case isset ( $_POST ["educations"] ) :
			if (isset ( $_POST ["educations"] ) && ! empty ( $_POST ["educations"] )) {
				$result = $conn->query ( "SELECT * FROM educations" );
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				echo json_encode ( $data );
			}
			break;
		case isset ( $_POST ["myProfileFilter"] ) :
			if (isset ( $_POST ["myProfileFilter"] ) && ! empty ( $_POST ["myProfileFilter"] )) {
				$result = $conn->query ( "UPDATE users SET filterGender ='" . $_POST ["filterGender"] . "' , filterFromAge ='" . $_POST ["filterFromAge"] . "' , filterToAge ='" . $_POST ["filterToAge"] . "' , filterAcademy = '" . $_POST ["filterAcademy"] . "' , filterYear = '" . $_POST ["filterYear"] . "' WHERE id ='" . $_POST ["myProfileId"] . "'" );
			}
			break;
		case isset ( $_POST ["personMessages"] ) :
			if (isset ( $_POST ["personMessages"] ) && ! empty ( $_POST ["personMessages"] )) {
				// change all messages send to me to be 0
				$conn->query ( "UPDATE messages SET read_message = 0  WHERE ( from_id = '" . $_POST ["toId"] . "' AND to_id ='" . $_POST ["id"] . "' ) " );
				$result = $conn->query ( "SELECT * FROM messages WHERE ( from_id = '" . $_POST ["id"] . "' AND to_id ='" . $_POST ["toId"] . "' ) OR ( from_id = '" . $_POST ["toId"] . "' AND to_id ='" . $_POST ["id"] . "' ) " );
				
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				// var_dump($data);
				echo json_encode ( $data );
			}
			break;
		case isset ( $_POST ["personMessagesChat"] ) :
			if (isset ( $_POST ["personMessagesChat"] ) && ! empty ( $_POST ["personMessagesChat"] )) {
				$from = $_POST ['from_id'];
				$to = $_POST ["to_id"];
				$message = $_POST ['message'];
				$result = $conn->query ( "INSERT messages SET from_id='" . $from . "' ,to_id ='" . $to . "',message ='" . $message . "',read_message = 1 " );
				$last_id = mysqli_insert_id ( $conn );
				$result2 = $conn->query ( "SELECT * FROM messages WHERE ID = '" . $last_id . "'" );
				$data = $result2->fetch_all ( MYSQLI_ASSOC );
				if ($result === TRUE) {
					// $last_id = mysqli_insert_id ( $conn );
					echo json_encode ( $data );
				} else {
					echo "Error: " . $sql . "<br>" . $conn->error;
				}
			}
			break;
		// timer
		case isset ( $_POST ["newMessages"] ) :
			if (isset ( $_POST ["newMessages"] ) && ! empty ( $_POST ["newMessages"] )) {
				$result = $conn->query ( "SELECT * FROM messages WHERE ( from_id = '" . $_POST ["toId"] . "' AND to_id ='" . $_POST ["id"] . "' AND read_message = 1 )  " );
				
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				if (! empty ( $data )) {
					var_dump ( json_encode ( $data ) );
					if ($result === TRUE) {
						echo json_encode ( $data );
					} else {
						echo "Error: " . $sql . "<br>" . $conn->error;
					}
				} else {
					$data = "";
					echo $data;
				}
			}
			break;
		
		case isset ( $_POST ["insertLike"] ) :
			if (isset ( $_POST ["insertLike"] ) && ! empty ( $_POST ["insertLike"] )) {
				$from = $_POST ['id'];
				$to = $_POST ["id_liked"];
				$conn->query ( "INSERT likes SET id='" . $from . "' ,id_liked ='" . $to . "' " );
			}
			break;
		case isset ( $_POST ["removeLike"] ) :
			if (isset ( $_POST ["removeLike"] ) && ! empty ( $_POST ["removeLike"] )) {
				$from = $_POST ['id'];
				$to = $_POST ["id_liked"];
				$conn->query ( "DELETE FROM likes WHERE id='" . $from . "' AND id_liked ='" . $to . "' " );
			}
			break;
			case isset ( $_POST ["usersLikeMe"] ) :
				if (isset ( $_POST ["id"] ) && ! empty ( $_POST ["id"] )) {
					$id = $_POST ['id'];
					
					$result = $conn->query ( "SELECT * FROM likes JOIN users ON likes.id=users.id JOIN usersimgs ON users.id=usersimgs.userId WHERE id_liked = '" . $id . "' GROUP BY usersimgs.userId");
				}
				$data = $result->fetch_all ( MYSQLI_ASSOC );
				echo json_encode ( $data );
				break;
			
		case isset ( $_POST ["messagesWindow"] ) :
			if (isset ( $_POST ["messagesWindow"] ) && ! empty ( $_POST ["messagesWindow"] )) {
				$messages_arr = array ();
				$from = $_POST ['myProfileId'];
				$result = $conn->query ( "SELECT to_id FROM messages WHERE from_id=" . $from . " GROUP BY to_id" );
				if ($result->num_rows > 0) {
					while ( $row = $result->fetch_assoc () ) {
						if ($row ['to_id'] != NULL) {
							$result2 = $conn->query ( "SELECT * FROM users JOIN usersimgs ON users.id=usersimgs.userId AND users.id=" . $row ['to_id'] . " GROUP BY users.id" );
							$data = $result2->fetch_all ( MYSQLI_ASSOC );
							array_push ( $messages_arr, $data );
						}
					}
				}
				echo json_encode ( $messages_arr );
				break;
			}
	}
}