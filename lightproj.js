var LIGHT = {
	canvas: null,
	ctx: null,
	ambient: "#000",
	drawMode: false,
	moveMode: false,
	activeIndex: null,
	drag: {
		start: {
			x: 0,
			y: 0
		},
		now: {
			x: 0,
			y: 0
		},
		offset: {
			x: 0,
			y: 0
		}
	},
	lastMove: null,
	shapes: [],
	run: true,
	crosshairs: {
		x: 0,
		y: 0
	},
	crosshairsBlink: 0,
	userPresets: {},
	presets: {
		"cop car": {
			"ambient": "#000000",
			"shapes": [
				{
					"type":"rectangle",
					"x":0.5232517482517482,"y":0.39850523168908825,
					"w":0.2,"h":0.2,"r":0.1,
					"color":"#ff0000",
					"edit":false,"active":true,
					"strobe":true,
					"strobeOn":50,"strobeOff":350,"strobeRandom":false,
				},{
					"type":"rectangle",
					"x":0.5227272727272727,"y":0.3931240657698057,
					"w":0.20279720279720279,"h":0.20926756352765322,"r":0.40503532566672523,
					"color":"#ff0000",
					"edit":false,"active":true,
					"strobe":true,
					"strobeOn":50,"strobeOff":350,"strobeOffset":100
				},{
					"type":"rectangle",
					"x":0.4,"y":0.4,
					"w":0.2,"h":0.2,"r":0.1,
					"color":"#0008ff",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":50,"strobeOff":350,"strobeOffset":200
				},{
					"type":"rectangle",
					"x":0.4,"y":0.4,
					"w":0.2,"h":0.2,"r":0.1,
					"color":"#0000ff",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":50,"strobeOff":350,"strobeOffset":300
				},{
					"type":"rectangle",
					"x":0.4361888111888112,"y":0.476831091180867,
					"w":0.24562937062937062,"h":0.043348281016442454,"r":0.42226080385046,
					"color":"#ffffff",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":50,"strobeOff":100
				}
			]
		},
		"train": {
			"ambient": "#000000",
			"shapes": [
				{
					"type":"rectangle",
					"x":1,"y":0.2,"w":0.1,"h":0.6,"r":1,
					"color":"#ffffff","edit":true,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":800,"moveX":-1.1
				}
			]
		}
	}
};
var TO_RADIANS = Math.PI / 180;
var requestAnimationFrame = (window.requestAnimationFrame ||
							 window.mozRequestAnimationFrame ||
							 window.webkitRequestAnimationFrame ||
							 window.msRequestAnimationFrame);
requestAnimationFrame = requestAnimationFrame || function(cb) {
	setTimeout(cb, 10, new Date());
};
console = console || {
	log: function() {}
};
function lerp(from, to, prog) {
	return (1 - prog) * from + prog * to;
};

function render(time) {
	requestAnimationFrame(render);
	if(!LIGHT.run) {
		return;
	}
	var x = 0;
	var y = 0;
	var w = 0;
	var h = 0;
	var r = 0;

	LIGHT.canvas.width = LIGHT.canvas.width;
	LIGHT.ctx.save();
	LIGHT.ctx.globalCompositeOperation = "lighter";
	LIGHT.ctx.fillStyle = LIGHT.ambient;
	LIGHT.ctx.fillRect(0, 0, LIGHT.canvas.width, LIGHT.canvas.height);
	LIGHT.shapes.every(function(shape, idx) {
		if(!shape.active) {
			return true;
		}
		if(shape.strobe) {
			if(shape.strobeRandom) {
				if(!shape._strobeOn || !shape._strobeOff) {
					shape._strobeOn = (shape.strobeOn +
									   ((Math.random() - 0.5) *
										shape.strobeOn));
					shape._strobeOff = (shape.strobeOff +
										((Math.random() - 0.5) *
										 shape.strobeOff));
				}
				shape._strobeStart = shape._strobeStart || time;
				if(time > (shape._strobeStart +
						   shape._strobeOn + shape._strobeOff)) {
					shape._strobeStart = shape._strobeOn = shape._strobeOff = 0;
					return true;
				}
				if((time - (shape.strobeOffset || 0)) %
				   (shape._strobeOn + shape._strobeOff) > shape._strobeOn) {
					return true;
				}
			} else {
				if((time - (shape.strobeOffset || 0)) %
				   (shape.strobeOn + shape.strobeOff) > shape.strobeOn) {
					return true;
				}
			}
		}
		if(shape.move && shape.moveDuration) {
			var prog = (time % shape.moveDuration) / shape.moveDuration;
			if(shape.moveTwoWay) {
				prog *= 2;
				if(prog > 1) {
					prog = 2 - prog;
				}
			}
			x = lerp(shape.x, shape.x + (shape.moveX || 0), prog);
			y = lerp(shape.y, shape.y + (shape.moveY || 0), prog);
			w = lerp(shape.w, shape.w + (shape.moveW || 0), prog);
			h = lerp(shape.h, shape.h + (shape.moveH || 0), prog);
			r = lerp(shape.r, shape.r + (shape.moveR || 0), prog);
		} else {
			x = shape.x;
			y = shape.y;
			w = shape.w;
			h = shape.h;
			r = shape.r;
		}
		LIGHT.ctx.fillStyle = shape.color;
		if(shape.type === "circle") {
			LIGHT.ctx.beginPath();
			LIGHT.ctx.arc(x * LIGHT.canvas.width, y * LIGHT.canvas.height,
						  r * LIGHT.canvas.height, 0, Math.PI * 2, false);
			LIGHT.ctx.closePath();
			LIGHT.ctx.fill();
			LIGHT.ctx.stroke();
		} else {
			LIGHT.ctx.fillRect(x * LIGHT.canvas.width, y * LIGHT.canvas.height,
							   w * LIGHT.canvas.width, h * LIGHT.canvas.height);
		}
		return true;
	});
	LIGHT.ctx.restore();

	if(LIGHT.drawMode) {
		LIGHT.ctx.fillStyle = [
			"rgb(", LIGHT.crosshairsBlink, ",",
			LIGHT.crosshairsBlink, ",",
			LIGHT.crosshairsBlink, ")"
		].join("");
		LIGHT.crosshairsBlink += 20;
		if(LIGHT.crosshairsBlink > 255) {
			LIGHT.crosshairsBlink = 0;
		}
		LIGHT.ctx.fillRect(LIGHT.crosshairs.x, LIGHT.crosshairs.y - 20, 1, 40);
		LIGHT.ctx.fillRect(LIGHT.crosshairs.x - 20, LIGHT.crosshairs.y, 40, 1);
	}
}

function loadpreset() {
	var pre = document.getElementById("preset");
	if(LIGHT.userPresets[pre.value]) {
		LIGHT.ambient = LIGHT.userPresets[pre.value].ambient;
		LIGHT.shapes = [].concat(LIGHT.userPresets[pre.value].shapes);
	} else if(LIGHT.presets[pre.value]) {
		LIGHT.ambient = LIGHT.presets[pre.value].ambient;
		LIGHT.shapes = [].concat(LIGHT.presets[pre.value].shapes);
	} else {
		alert("failed to load");
	}
	pre.value = "";
	renderHUD();
}
function removepreset() {
	var which = prompt("preset name to delete?");
	if(which && LIGHT.userPresets[which]) {
		delete LIGHT.userPresets[which];
	} else {
		alert("not found.");
	}
	localStorage.setItem("userPresets", JSON.stringify(LIGHT.userPresets));
	renderHUD();
}
function savepreset() {
	var name = prompt("preset name?");
	if(name) {
		LIGHT.userPresets[name] = {
			ambient: LIGHT.ambient,
			shapes: LIGHT.shapes
		}
	} else {
		alert("cancelled");
	}
	localStorage.setItem("userPresets", JSON.stringify(LIGHT.userPresets));
	renderHUD();
}

function addshape() {
	LIGHT.shapes.push({
		type: "rectangle",
		x: 0.4,
		y: 0.4,
		w: 0.2,
		h: 0.2,
		r: 0.1,
		color: "#ffffff",
		edit: true,
		active: true,
		strobe: false,
		strobeOn: 100,
		strobeOff: 100,
		move: false,
		moveDuration: 1000
	});
	renderHUD();
}

function renderHUD() {
	var pre = document.getElementById("preset");
	while(pre.lastChild.value) {
		pre.removeChild(pre.lastChild);
	}
	var set = null;
	Object.keys(LIGHT.presets).every(function(name) {
		set = document.createElement("option");
		set.value = name;
		set.appendChild(document.createTextNode(name));
		pre.appendChild(set);
		return true;
	});
	Object.keys(LIGHT.userPresets).every(function(name) {
		set = document.createElement("option");
		set.value = name;
		set.appendChild(document.createTextNode(name));
		pre.appendChild(set);
		return true;
	});

	var outer = document.getElementById("shapes");
	while(outer.firstChild) {
		outer.removeChild(outer.firstChild);
	}
	LIGHT.shapes.every(function(shape, idx) {
		var elm = document.createElement("div");
		elm.className = "shape shape" + idx;
		outer.appendChild(elm);
		var anc = document.createElement("a");
		anc.href = "#";
		if(shape.edit) {
			anc.title = "collapse section";
			anc.appendChild(document.createTextNode("[-]"));
		} else {
			anc.title = "expand section";
			anc.appendChild(document.createTextNode("[+]"));
		}
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			LIGHT.shapes[idx].edit = !LIGHT.shapes[idx].edit;
			renderHUD();
		});
		elm.appendChild(anc);
		var inp = document.createElement("input");
		inp.type = "checkbox";
		inp.checked = shape.active;
		inp.title = "enable/disable this shape";
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].active = this.checked;
			renderHUD();
		});
		elm.appendChild(inp);
		var inp = document.createElement("input");
		inp.title = "shape name";
		inp.value = shape.name || ("shape" + idx);
		inp.className = "name" + idx;
		inp.size = 8;
		inp.style.borderWidth = "2px";
		inp.style.borderStyle = "solid";
		inp.style.borderColor = LIGHT.shapes[idx].color;
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].name = this.value;
			renderHUD();
		});
		elm.appendChild(inp);
		//elm.appendChild(document.createTextNode("shape:"));
		var sel = document.createElement("select");
		var opt = document.createElement("option");
		opt.appendChild(document.createTextNode("rectangle"));
		opt.value = "rectangle";
		opt.selected = (shape.type === "rectangle");
		sel.appendChild(opt);
		opt = document.createElement("option");
		opt.appendChild(document.createTextNode("circle"));
		opt.value = "circle";
		opt.selected = (shape.type === "circle");
		sel.appendChild(opt);
		sel.addEventListener("change", function(e) {
			LIGHT.shapes[idx].type = this.value;
			renderHUD();
		});
		elm.appendChild(sel);
		elm.appendChild(document.createTextNode(" "));
		anc = document.createElement("a");
		anc.href = "#";
		anc.title = "move up";
		anc.appendChild(document.createTextNode("[^]"));
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			if(!idx) {
				return;
			}
			LIGHT.shapes.splice(idx - 1, 0, LIGHT.shapes.splice(idx, 1)[0]);
			renderHUD();
		});
		elm.appendChild(anc);
		anc = document.createElement("a");
		anc.href = "#";
		anc.title = "move down";
		anc.appendChild(document.createTextNode("[v]"));
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			LIGHT.shapes.splice(idx + 1, 0, LIGHT.shapes.splice(idx, 1)[0]);
			renderHUD();
		});
		elm.appendChild(anc);
		elm.appendChild(document.createTextNode(" "));
		anc = document.createElement("a");
		anc.href = "#";
		anc.title = "remove this shape";
		anc.appendChild(document.createTextNode("[X]"));
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			LIGHT.shapes.splice(idx, 1);
			renderHUD();
		});
		elm.appendChild(anc);

		if(!LIGHT.shapes[idx].edit) {
			return true;
		}
		elm.appendChild(document.createElement("br"));

		elm.appendChild(document.createTextNode("color:"));
		inp = document.createElement("input");
		inp.type = "color";
		inp.value = shape.color || "#fff";
		//inp.style.backgroundColor = inp.value;
		inp.size = 8;
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].color = this.value;
			renderHUD();
			//this.style.backgroundColor = this.value;
		});
		elm.appendChild(inp);
		elm.appendChild(document.createTextNode(" "));
		anc = document.createElement("a");
		anc.href = "#";
		anc.appendChild(document.createTextNode("[draw...]"));
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			LIGHT.drawMode = true;
			LIGHT.activeIndex = idx;
			LIGHT.drag.start.x = LIGHT.drag.start.y = 0;
			document.getElementById("hud").classList.toggle("hidden");
		});
		elm.appendChild(anc);
		elm.appendChild(document.createTextNode(" "));
		anc = document.createElement("a");
		anc.href = "#";
		anc.appendChild(document.createTextNode("[place...]"));
		anc.addEventListener("click", function(e) {
			e.preventDefault();
			LIGHT.moveMode = true;
			LIGHT.canvas.style.cursor = "move";
			LIGHT.activeIndex = idx;
			LIGHT.drag.start.x = LIGHT.drag.start.y = 0;
			LIGHT.drag.offset.x = LIGHT.shapes[idx].x * LIGHT.canvas.width;
			LIGHT.drag.offset.y = LIGHT.shapes[idx].y * LIGHT.canvas.height;
			document.getElementById("hud").classList.toggle("hidden");
		});
		elm.appendChild(anc);

		elm.appendChild(document.createElement("br"));

		elm.appendChild(document.createTextNode("x:"));
		inp = document.createElement("input");
		inp.value = shape.x || 0;
		inp.size = 3;
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].x = parseFloat(this.value);
		});
		elm.appendChild(inp);
		elm.appendChild(document.createTextNode(" y:"));
		inp = document.createElement("input");
		inp.value = shape.y || 0;
		inp.size = 3;
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].y = parseFloat(this.value);
		});
		elm.appendChild(inp);

		elm.appendChild(document.createTextNode(" / "));

		if(shape.type === "circle") {
			elm.appendChild(document.createTextNode("r:"));
			inp = document.createElement("input");
			inp.value = shape.r || 0;
			inp.size = 3;
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].r = parseFloat(this.value);
			});
			elm.appendChild(inp);
		} else {
			elm.appendChild(document.createTextNode("w:"));
			inp = document.createElement("input");
			inp.value = shape.w || 0;
			inp.size = 3;
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].w = parseFloat(this.value);
			});
			elm.appendChild(inp);
			elm.appendChild(document.createTextNode(" h:"));
			inp = document.createElement("input");
			inp.value = shape.h || 0;
			inp.size = 3;
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].h = parseFloat(this.value);
			});
			elm.appendChild(inp);
		}

		elm.appendChild(document.createElement("br"));

		var sec = document.createElement("div");
		sec.className = "section";
		elm.appendChild(sec);
		inp = document.createElement("input");
		inp.type = "checkbox";
		inp.checked = shape.strobe;
		inp.title = "shape strobe";
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].strobe = this.checked;
			renderHUD();
		});
		sec.appendChild(inp);
		sec.appendChild(document.createTextNode("strobe "));
		if(shape.strobe) {
			inp = document.createElement("input");
			inp.type = "checkbox";
			inp.checked = shape.strobeRandom;
			inp.title = "randomize on/off values by 0.5x~1.5x";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].strobeRandom = this.checked;
				renderHUD();
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode("randomize"));

			sec.appendChild(document.createElement("br"));

			sec.appendChild(document.createTextNode(" on:"));
			inp = document.createElement("input");
			inp.value = shape.strobeOn || 0;
			inp.size = 3;
			inp.title = "on for this many milliseconds";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].strobeOn = parseInt(this.value);
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode(" off:"));
			inp = document.createElement("input");
			inp.value = shape.strobeOff || 0;
			inp.size = 3;
			inp.title = "off for this many milliseconds";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].strobeOff = parseInt(this.value);
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode(" offset:"));
			inp = document.createElement("input");
			inp.value = shape.strobeOffset || 0;
			inp.size = 3;
			inp.title = "offset by this many milliseconds";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].strobeOffset = parseInt(this.value);
			});
			sec.appendChild(inp);
		}

		sec = document.createElement("div");
		sec.className = "section";
		elm.appendChild(sec);

		inp = document.createElement("input");
		inp.type = "checkbox";
		inp.checked = shape.move;
		inp.title = "move shape";
		inp.addEventListener("change", function(e) {
			LIGHT.shapes[idx].move = this.checked;
			renderHUD();
		});
		sec.appendChild(inp);
		sec.appendChild(document.createTextNode("move "));
		if(shape.move) {
			inp = document.createElement("input");
			inp.type = "checkbox";
			inp.checked = shape.moveTwoWay;
			inp.title = "move there and back again";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].moveTwoWay = this.checked;
				renderHUD();
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode("two-way"));

			sec.appendChild(document.createElement("br"));

			sec.appendChild(document.createTextNode("duration:"));
			inp = document.createElement("input");
			inp.value = shape.moveDuration || 0;
			inp.size = 3;
			inp.title = "move for this many milliseconds";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].moveDuration = parseInt(this.value);
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode(" offset:"));
			inp = document.createElement("input");
			inp.value = shape.moveOffset || 0;
			inp.size = 3;
			inp.title = "move for this many milliseconds";
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].moveOffset = parseInt(this.value);
			});
			sec.appendChild(inp);

			sec.appendChild(document.createElement("br"));

			sec.appendChild(document.createTextNode("x:"));
			inp = document.createElement("input");
			inp.value = shape.moveX || 0;
			inp.size = 3;
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].moveX = parseFloat(this.value);
			});
			sec.appendChild(inp);
			sec.appendChild(document.createTextNode(" y:"));
			inp = document.createElement("input");
			inp.value = shape.moveY || 0;
			inp.size = 3;
			inp.addEventListener("change", function(e) {
				LIGHT.shapes[idx].moveY = parseFloat(this.value);
			});
			sec.appendChild(inp);

			sec.appendChild(document.createTextNode(" / "));

			if(shape.type === "circle") {
				sec.appendChild(document.createTextNode("r:"));
				inp = document.createElement("input");
				inp.value = shape.moveR || 0;
				inp.size = 3;
				inp.addEventListener("change", function(e) {
					LIGHT.shapes[idx].moveR = parseFloat(this.value);
				});
				sec.appendChild(inp);
			} else {
				sec.appendChild(document.createTextNode("w:"));
				inp = document.createElement("input");
				inp.value = shape.moveW || 0;
				inp.size = 3;
				inp.addEventListener("change", function(e) {
					LIGHT.shapes[idx].moveW = parseFloat(this.value);
				});
				sec.appendChild(inp);
				sec.appendChild(document.createTextNode(" h:"));
				inp = document.createElement("input");
				inp.value = shape.moveH || 0;
				inp.size = 3;
				inp.addEventListener("change", function(e) {
					LIGHT.shapes[idx].moveH = parseFloat(this.value);
				});
				sec.appendChild(inp);
			}
		}

		return true;
	});
}

function resize() {
	if(!LIGHT.canvas) {
		return;
	}
	LIGHT.canvas.width = 0;
	LIGHT.canvas.height = 0;

	var parent = LIGHT.canvas.parentElement;
	var ratio = parent.clientWidth / parent.clientHeight; //16/9;
	var toowide = (parent.clientWidth / parent.clientHeight) > ratio;

	if(toowide) {
		LIGHT.canvas.width = parent.clientHeight * ratio;
		LIGHT.canvas.height = parent.clientHeight;
	} else {
		LIGHT.canvas.width = parent.clientWidth;
		LIGHT.canvas.height = parent.clientWidth / ratio;
	}
}

function mousedown(e) {
	LIGHT.lastMove = new Date();

	if(LIGHT.drawMode || LIGHT.moveMode) {
		LIGHT.drag.start.x = e.clientX - e.target.offsetLeft;
		LIGHT.drag.start.y = e.clientY - e.target.offsetTop;
	}
	if(LIGHT.drawMode) {
		LIGHT.shapes[LIGHT.activeIndex].x = LIGHT.drag.start.x / LIGHT.canvas.width;
		LIGHT.shapes[LIGHT.activeIndex].y = LIGHT.drag.start.y / LIGHT.canvas.height;
	}
}
function mousemove(e) {
	var now = new Date();
	if(now - LIGHT.lastMove < 16) {
		return;
	}
	if(LIGHT.drawMode || LIGHT.moveMode) {
		LIGHT.crosshairs = {
			x: e.clientX - e.target.offsetLeft,
			y: e.clientY - e.target.offsetTop
		};
	}
	if(!LIGHT.drag.start.x && !LIGHT.drag.start.y) {
		return;
	}
	e.preventDefault();
	if(e.changedTouches && e.changedTouches.length) {
		e = e.changedTouches[0];
	}

	LIGHT.lastMove = now;
	LIGHT.drag.now.x = e.clientX - e.target.offsetLeft;
	LIGHT.drag.now.y = e.clientY - e.target.offsetTop;

	if(LIGHT.drawMode) {
		var shape = LIGHT.shapes[LIGHT.activeIndex];
		shape.w = (LIGHT.drag.now.x - LIGHT.drag.start.x) / LIGHT.canvas.width;
		shape.h = (LIGHT.drag.now.y - LIGHT.drag.start.y) / LIGHT.canvas.height;
		shape.r = (Math.sqrt((Math.pow(LIGHT.drag.now.x - LIGHT.drag.start.x, 2)
							  + Math.pow(LIGHT.drag.now.y - LIGHT.drag.start.y, 2))) / LIGHT.canvas.height);
	}
	if(LIGHT.moveMode) {
		LIGHT.shapes[LIGHT.activeIndex].x = (LIGHT.drag.offset.x + (LIGHT.drag.now.x - LIGHT.drag.start.x)) / LIGHT.canvas.width;
		LIGHT.shapes[LIGHT.activeIndex].y = (LIGHT.drag.offset.y + (LIGHT.drag.now.y - LIGHT.drag.start.y)) / LIGHT.canvas.height;
	}
}
function mouseup(e) {
	e.preventDefault();
	if(e.changedTouches && e.changedTouches.length) {
		e = e.changedTouches[0];
	}

	if(LIGHT.drawMode) {
		LIGHT.drawMode = false;
		LIGHT.activeIndex = null;
		document.getElementById("hud").classList.toggle("hidden", false);
	}
	if(LIGHT.moveMode) {
		LIGHT.moveMode = false;
		LIGHT.canvas.style.cursor = null;
		LIGHT.activeIndex = null;
		document.getElementById("hud").classList.toggle("hidden", false);
	}
	LIGHT.drag.start.x = LIGHT.drag.start.y = 0;
	renderHUD();
}

function handleKey(e) {
	switch(e.keyCode) {
	case 32:
		document.getElementById("hud").classList.toggle("hidden");
		e.preventDefault();
		break;
	case 13:
		LIGHT.run = !LIGHT.run;
		e.preventDefault();
		break;
	default:
		console.log(e);
		break;
	}
}

window.addEventListener("load", function() {
	LIGHT.canvas = document.querySelector("#display");
	LIGHT.ctx = LIGHT.canvas.getContext("2d");

	document.getElementById("ambient").addEventListener("change", function(e) {
		LIGHT.ambient = this.value;
	});
	LIGHT.ambient = document.getElementById("ambient").value;

	LIGHT.userPresets = JSON.parse(localStorage.getItem("userPresets") || "{}");

	resize();
	render();
	renderHUD();

	window.addEventListener("keydown", handleKey);

	LIGHT.canvas.addEventListener("mousedown", mousedown);
	LIGHT.canvas.addEventListener("mousemove", mousemove);
	LIGHT.canvas.addEventListener("mouseup", mouseup);
	LIGHT.canvas.addEventListener("mouseout", mouseup);

	LIGHT.canvas.addEventListener("touchstart", mousedown);
	LIGHT.canvas.addEventListener("touchmove", mousemove);
	LIGHT.canvas.addEventListener("touchend", mouseup);
	LIGHT.canvas.addEventListener("touchcancel", mouseup);
});
window.addEventListener("resize", resize);
