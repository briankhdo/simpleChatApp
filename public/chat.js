
$(function(){
   	//make connection
	var socket = io.connect('https://chat.wifichua.co')

	//buttons and inputs
	var message = $("#message")
	var username = $("#username")
	var send_message = $("#send_message")
	var send_username = $("#send_username")
	var chatroom = $("#chatroom")
	var feedback = $("#feedback")

	var names = ['Harold Phillips', 'Guillermo Ellis', 'Marcos Cook', 'Ryan Mann', 'Lucille Adkins', 'Bob Abbott', 'Dustin Wright', 'Franklin Fuller', 'Jasmine Wagner', 'Erik Watson', 'Sean Morris', 'Minnie Gray', 'Patsy Clayton', 'Carmen Gonzales', 'Luther Lambert', 'Juanita Hunt', 'Enrique Morrison', 'Sheldon Graham', 'Clarence Wood', 'Beatrice Mccarthy', 'Darrell Carson', 'Donald Carr', 'Ebony Kim', 'Hugh Vasquez', 'Domingo Armstrong', 'Carl Reyes', 'Bessie Ferguson', 'Shawn Crawford', 'Kathryn Reynolds', 'Owen Floyd', 'Adrian Reed', 'Connie Mcdaniel', 'Ben Hansen', 'Ethel Hardy', 'Jerry Mcdonald', 'Jean Howard', 'Sarah Weaver', 'Marion Bass', 'Neil Copeland', 'Beulah Ramsey', 'Renee Todd', 'Perry Moody', 'Alfred Perez', 'Andre Soto', 'Claire Alvarado', 'Tyrone Barker', 'Loren Robbins', 'Mindy Castillo', 'Ricardo Mcgee', 'Christina Lopez', 'Douglas Powers', 'Linda Padilla', 'Tammy Collins', 'Genevieve Beck', 'Noel Garner', 'Vera Briggs', 'Alejandro Waters', 'Tara Thornton', 'Eileen Howell', 'Rachel Ingram', 'Viola Casey', 'Victor Dunn', 'Ora Ross', 'Dallas Oliver', 'Kevin Allen', 'Grady Christensen', 'Angel Ortega', 'Susie Singleton', 'Marco Marsh', 'Christopher Potter', 'Rosalie Carlson', 'Sheryl Peterson', 'Madeline Nunez', 'Lester Chambers', 'Stella Park', 'Terrell Jimenez', 'Kara Hawkins', 'Bernadette Garcia', 'Levi Tran', 'Janie Perkins', 'Lindsey Snyder', 'Hector Yates', 'Derrick Massey', 'Alexander Arnold', 'Danny Wilkerson', 'Gary Taylor', 'Brittany Stevenson', 'Bonnie Leonard', 'Brandon Klein', 'Desiree Harper', 'Marian Berry', 'Jim James', 'Wade Nguyen', 'Charles Norris', 'Raul Thompson', 'Frederick Lucas', 'Barbara Swanson', 'Timothy Flowers', 'Agnes Green', 'Herbert Coleman'];
	username.val(names[Math.floor(Math.random()*names.length)]);
	socket.emit('change_username', {username : username.val()})

	$('#message').on('keydown', function(e) {
		if (e.keyCode == 13) {
			socket.emit('new_message', {message : message.val()})
		}
	});

	//Emit message
	send_message.click(function(){
		socket.emit('new_message', {message : message.val()})
	})

	//Listen on new_message
	socket.on("new_message", (data) => {
		feedback.html('');
		message.val('');
		chatroom.append("<p class='message'>" + data.username + ": " + data.message + "</p>");
		// console.log("Scroll: " + $("#chatroom").scrollTop() + ". Height: " + ($('#chatroom').prop("scrollHeight") - $('#chatroom').height() + 100));
		if ($("#chatroom").scrollTop() + 100 > $('#chatroom').prop("scrollHeight") - $('#chatroom').height()) {
			$("#chatroom").scrollTop($('#chatroom').prop("scrollHeight"));
		}
	})

	//Emit a username
	send_username.click(function(){
		socket.emit('change_username', {username : username.val()})
	})

	//Emit typing
	message.bind("keypress", () => {
		socket.emit('typing')
	})

	//Listen on typing
	socket.on('typing', (data) => {
		feedback.html("<p><i>" + data.username + " is typing a message..." + "</i></p>")
	})
});


