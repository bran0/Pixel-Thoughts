var pixelThoughts = function() {

	var obj = {
		"stars": [],
		"numberOfStars": 100,
		"intervalID": null,
		"starStarted": false
	};

	obj.initalize = function() {

		var isFirefox = typeof InstallTrigger !== 'undefined';

		if (isFirefox) {
			obj.numberOfStars = 50
			this.intervalID = setInterval(this.moveStars.bind(this), 40);
			this.starInterval = setInterval(this.addStars.bind(this), 500)
		} else {
			this.intervalID = setInterval(this.moveStars.bind(this), 25);
			this.starInterval = setInterval(this.addStars.bind(this), 100)

		}

		// this.addInitialStars();

		//add NewStars

		this.startPixel();
		d3.select("img")
			.on('click', function() {
				//RESIZE SCREEN
				if ((document.fullScreenElement && document.fullScreenElement !== null) ||
					(!document.mozFullScreen && !document.webkitIsFullScreen)) {
					if (document.documentElement.requestFullScreen) {
						document.documentElement.requestFullScreen();
					} else if (document.documentElement.mozRequestFullScreen) {
						document.documentElement.mozRequestFullScreen();
					} else if (document.documentElement.webkitRequestFullScreen) {
						document.documentElement.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT);
					}
				}
			});
	}

	obj.startPixel = function() {
		if (!this.starStarted) {
			var removeTitle = function() {
				d3.select(".mainTitle")
					.transition()
					.duration(4000)
					.style("opacity", 0)
			}
		}

		setTimeout(removeTitle, 5000)
		setTimeout(() => {
			d3.select(".mainTitle").remove()
		}, 9000)


	};


	obj.getRandomWidth = function() {
		var width = (Math.random() * window.innerWidth) - 10;
		width = width < 0 ? 0 : width;
		return width;
	};

	obj.getRandomHeight = function() {
		var height = (Math.random() * window.innerHeight) - 10;
		height = height < 0 ? 0 : height;
		return height;
	};

	obj.setSpeed = function() {
		return Math.ceil(13 * (Math.random()) / 4)
	}


	obj.addInitialStars = function() {
		for (var i = 0; i < this.numberOfStars; i++) {
			this.stars[i] = {
				"width": this.getRandomWidth(),
				"height": this.getRandomHeight(),
				"speed": this.setSpeed()
			};
		}

		d3.select("body").selectAll('.stars')
			.data(function(data) {
				return this.stars
			}.bind(this))
			.enter()
			.insert('div')
			.attr('class', 'stars')
			.style('left', function(star) {
				return star.width + 'px';
			}.bind(obj))
			.style('top', function(star) {
				return star.height + 'px';
			}.bind(obj));
	};

	obj.moveStars = function() {
		d3.selectAll(".stars")
			.style('top', function(data) {
				data.height = data.height - data.speed
				return data.height + 'px';
			}.bind(obj))
			.style('width', function(data) {
				return data.speed + "px";
			})
			.style('height', function(data) {
				return data.speed + "px";
			})
			.attr('class', function(data) {
				if (data.height < 0) {
					return "stars remove"
				} else {
					return "stars"
				}
			})

		//remove stars from DOM.
		d3.selectAll(".remove")
			.remove()


		//remove stars from stars object.
		for (var i = 0; i < this.stars.length; i++) {
			if (this.stars[i].height < 0) {
				this.stars.splice(i, 1);
			}
		}
	}

	//add new stars to the screen
	obj.addStars = function() {

		var newStar = {
			"width": this.getRandomWidth(),
			"height": window.innerHeight + 100,
			"speed": this.setSpeed()
		}
		this.stars.push(newStar)

		d3.select("body").selectAll('.stars')
			.data(this.stars)
			.enter()
			.append('div')
			.attr('class', 'stars')
			.style('left', function(star) {
				return newStar.width + 'px';
			}.bind(obj))
			.style('top', function(star) {
				return newStar.height + 'px';
			}.bind(obj));
	};


	return obj;
}

window.pixelThoughts = pixelThoughts()
window.pixelThoughts.initalize();