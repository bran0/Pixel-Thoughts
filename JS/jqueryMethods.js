$(document).ready(function() {

	// play music
	var audioPromise = document.querySelector('.audio').play();

	if (audioPromise !== undefined) {
		audioPromise.catch(error => {
			$('.submit').on('click', function() {
				document.querySelector('.audio').play();
			})
		})
	}

	var messageDisappearHeight = '105px';
	var messageInterval = null;
	var messages = ["Take a deep breath in....", "....and breathe out", "Everything is okay", "Your life is okay", "Life is much grander than this thought", "The universe is over 93 billion light-years in distance", "Our galaxy is small", "Our sun is tiny", "The earth is minuscule", "Our cities are insignificant....", "....and you are microscopic", "This thought.... does not matter", "It can easily disappear", "and life will go on...."]


	var loadLink = function() {
		if (window.location.hash) {
			var urlSplit = window.location.hash.split('m=');
			try {
				var customMessage = JSON.parse(atob(urlSplit[1]));
				var name = customMessage.pop();
				$('.custom-message-username').hide()
				$('.custom-message-username').text(`Meditation Created By: ${name}`)
				$('.custom-message-username').fadeIn(1000)
				messages = customMessage;
				console.log('loaded custom message')
			} catch (err) {
				console.log('Invalid message')
				return false;
			}
		}
	}

	loadLink();

	var showStar = function() {
		$(".done").animate({
			"opacity": "0"
		}, 1000)
		$(".overlay").animate({
			"opacity": "0"
		}, 1000)
		$(".mainStar").animate({
			"opacity": "1"
		}, 3000)
		$(".typeHere").animate({
			"opacity": "1"
		}, 3000)
		$(".submit").animate({
			"opacity": "1"
		}, 3000)
		$(".message").animate({
			"opacity": "0.5"
		}, 3000)
	}

	setTimeout(showStar, 7000)

	$('.thought').textfill();

	$(".typeHere").keyup(function(event) {
		if (event.keyCode === 13) {
			$('.submit').click()
		}
	});

	$('.submit').on('click', function() {
		initializeDisappear();
	})

	var initializeDisappear = function() {
		var allText = $(".typeHere").val();
		$.ajax({
			type: "POST",
			url: "/message",
			data: {
				message: `${allText}`
			}
		});
		$(".typeHere").val('');
		if (allText.length < 25) {
			messageDisappearHeight = '50px'
			$('.thought').css({
				"margin-top": "-50px"
			});
		}
		$('.thoughtText').text(allText);
		$('.thoughtText').css({
			"opacity": "0"
		});
		$('.thoughtText').animate({
			"opacity": "1"
		}, 500);
		$('.thought').textfill();
		$(".typeHere").animate({
			"opacity": "0"
		}, 500);
		$(".submit").animate({
			"opacity": "0"
		}, 500);
		setTimeout(makeStarDisappear, 4000);
	}

	var makeStarDisappear = function() {

		$(".insideMessage").fadeOut(1000, function() {
			$(".insideMessage").text("Relax and watch your thought").fadeIn(500);
		});
		html2canvas($(".thought"), {
			height: 400,
			onrendered: function(canvas) {
				$(".thought").html(canvas);
				console.log(canvas);
				$("canvas").css({
					"z-index": 300
				})
				$("canvas").css({
					"display": "inline"
				})
				setTimeout(resizeStar, 3000);
				displayMessages();

			}
		});
	}

	var resizeStar = function() {
		$('.mainStar').css({
				"transition": "0s"
			})
			.animate({
				"width": "4px",
				"height": "4px",
				"margin-top": "-175px",
				"margin-left": "-25px"
			}, 60000, "linear")
		$('canvas').animate({
			"width": "1px",
			"height": "1px",
			"margin-top": messageDisappearHeight
		}, 60000, "linear", function() {
			$(".mainStar").animate({
				"margin-top": "-1000px"
			}, 7000, "linear", function() {
				$(".mainStar").remove()
				setTimeout(createOverlay, 1000);
				clearTimeout(messageInterval);
				$(".message").animate({
					"opacity": "0"
				}, 1000)
			})
		})
	}

	var displayMessages = function() {
		var i = 0;
		messageInterval = setInterval(function() {
			var newText = messages[i++ % messages.length];;
			$(".insideMessage").fadeOut(500, function() {
				$(".insideMessage").text(newText).fadeIn(500);
			});
		}, 4700);
	}

	var createOverlay = function() {
		$(".overlay").css({
			"display": "initial"
		});
		$(".done").animate({
			"opacity": "1"
		}, 1000);
		$(".done2").animate({
			"opacity": "0.5"
		}, 1000);
		$(".overlay").animate({
			"opacity": "1"
		}, 1000);
		$(".insideMessage").text("Put a stressful thought in the star");
	}
})