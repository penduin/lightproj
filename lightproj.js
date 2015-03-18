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
		"empty": {
			"ambient": "#000000",
			"shapes": []
		},
		"key+spot": {
			"ambient": "#000000",
			"shapes": [
				{
					"type":"circle",
					"x":0.25524475524475526,"y":0.21324717285945072,
					"w":0.025349650349650348,"h":-0.06462035541195477,
					"r":0.07981660308262116,
					"color":"#ffffff",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":false,"moveDuration":1000,
					"name":"key"
				},{
					"type":"circle",
					"x":0.8881118881118881,"y":0.656203288490284,
					"w":0.043706293706293704,"h":0.16442451420029897,
					"r":0.1806135422061969,
					"color":"#8c8874",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":false,"moveDuration":1000,
					"name":"fill"
				}
			]
		},
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
		},
		"candle": {
			"ambient": "#000000",
			"shapes": [
				{
					"type":"circle",
					"x":0.527972027972028,"y":0.6935724962630793,
					"w":0.008741258741258742,"h":-0.01943198804185351,
					"r":0.024516023119367306,
					"color":"#ffffff",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":2184,"moveTwoWay":true,
					"moveR":0.01,
					"name":"flame1"
				},{
					"type":"circle",
					"x":0.527972027972028,"y":0.6711509715994022,
					"w":0.022727272727272728,"h":-0.03587443946188341,
					"r":0.05,
					"color":"#ffed00",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":3511,
					"moveR":0.01,"moveTwoWay":true,"moveOffset":500,
					"name":"flame2"
				},{
					"type":"circle",
					"x":0.5288461538461539,"y":0.6457399103139013,
					"w":-0.015734265734265736,"h":0.07174887892376682,
					"r":0.07662783628087472,
					"color":"#ff4600",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":3222,
					"moveR":0.01,"moveTwoWay":true,
					"name":"flame3"
				},{
					"type":"circle",
					"x":0.5297202797202797,"y":0.6337817638266068,
					"w":0.04632867132867133,"h":-0.08071748878923767,
					"r":0.11309974551884572,
					"color":"#3b1f00",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":800,
					"move":false,"moveDuration":1000,"strobeRandom":true,
					"name":"flicker1"
				},{
					"type":"circle",
					"x":0.527972027972028,"y":0.6382660687593423,
					"w":0.062062937062937064,"h":0.013452914798206279,
					"r":0.10697780170453147,
					"color":"#2f1e00",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":600,
					"move":false,"moveDuration":1000,
					"strobeRandom":true,
					"name":"flicker2"
				},{
					"type":"circle",
					"x":0.527972027972028,"y":0.6292974588938715,
					"w":0.04283216783216783,"h":0.08221225710014948,
					"r":0.11010670768731179,
					"color":"#400d00",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":900,
					"move":false,"moveDuration":1000,
					"strobeRandom":true,
					"name":"flicker3"
				}
			]
		},
        "lighthouse": {
			"ambient": "#090052",
			"shapes": [
				{
					"type":"circle",
					"x":1.5,"y":0.5,
					"w":0.1,"h":0.1,"r":0.1,
					"color":"#ffb900",
					"edit":false,"active":true,
					"strobe":true,
					"strobeOn":1000,"strobeOff":1000,
					"move":true,
					"moveDuration":1000,
					"moveX":-1,"moveR":0.7,"moveTwoWay":false
				},{
					"type":"circle",
					"x":0.5,"y":0.5,"w":0.8,"h":0.2,"r":0.8,
					"color":"#ffb900",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":1000,"strobeOff":1000,
					"move":true,"moveDuration":1000,"moveX":-1,"moveR":-0.7,
					"strobeOffset":1000
				},{
					"type":"circle",
					"x":0.5,"y":0.5,"w":0.2,"h":0.2,"r":0.3,
					"color":"#ffffff",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":1900,
					"move":false,
					"moveDuration":1000,
					"strobeOffset":900
				}
			]
		},
		"fire": {
			"ambient": "#000000",
			"shapes":[
				{
					"type":"rectangle",
					"x":0.2571678321678322,"y":0.4947683109118087,
					"w":0.5893356643356643,"h":0.40956651718983555,
					"r":0.642293090018518,
					"color":"#ad1023",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,
					"moveDuration":870,
					"moveW":0.1,"moveH":0.1,
					"moveTwoWay":true,
					"moveX":-0.05,"moveY":-0.05
				},{
					"type":"rectangle",
					"x":0.29982517482517484,"y":0.5979073243647235,
					"w":0.2736013986013986,"h":0.3572496263079223,
					"r":0.5886616998920089,
					"color":"#fc3838",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":688,
					"moveY":-0.5,"moveW":-0.3,
					"moveH":-0.35,"moveX":0.15
				},{
					"type":"rectangle",
					"x":0.4781468531468531,"y":0.6307922272047832,
					"w":0.21765734265734266,"h":0.17787742899850523,
					"r":0.4125181412791471,
					"color":"#ff5a38",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":789,
					"moveY":-0.6,"moveW":-0.2,"moveX":0.1
				},{
					"type":"rectangle",
					"x":0.6765734265734266,"y":0.6367713004484304,
					"w":0.17307692307692307,"h":0.31689088191330345,
					"r":0.4336064974819971,
					"color":"#ff324a",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":568,
					"moveY":-0.6,"moveW":-0.2,"moveH":-0.3,"moveX":0.1
				},{
					"type":"rectangle",
					"x":0.30244755244755245,"y":0.70254110612855,
					"w":0.21853146853146854,"h":0.23766816143497757,
					"r":0.4428678402373742,
					"color":"#ff9136",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":711,
					"moveY":-0.6,"moveX":0.1,"moveW":-0.2,"moveH":-0.3
				},{
					"type":"rectangle",
					"x":0.45,"y":0.6472346786248132,
					"w":0.1660839160839161,"h":0.34080717488789236,
					"r":0.4436315212024706,
					"color":"#ff9f26",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":652,
					"moveY":-0.7,"moveW":-0.2,"moveH":-0.3,"moveX":0.1
				},{
					"type":"rectangle",
					"x":0.6118881118881119,"y":0.5082212257100149,
					"w":0.20367132867132867,"h":0.3841554559043348,
					"r":0.5185316583539085,
					"color":"#ff9622",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":696,
					"moveY":-0.6,"moveW":-0.2,"moveH":-0.4,"moveX":0.1
				},{
					"type":"rectangle",
					"x":0.30506993006993005,"y":0.5216741405082213,
					"w":0.5,"h":0.3617339312406577,"r":0.9283798884808618,
					"color":"#ffc92a",
					"edit":false,"active":true,
					"strobe":false,"strobeOn":100,"strobeOff":100,
					"move":true,"moveDuration":1000,
					"moveW":-0.2,"moveH":0.2,"moveTwoWay":true,
					"moveX":0.1,"moveY":-0.1
				},{
					"type":"rectangle",
					"x":0.4624125874125874,"y":0.7638266068759342,
					"w":0.02972027972027972,"h":-0.375186846038864,
					"r":0.3786133351893619,
					"color":"#fffbd8",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":500,
					"move":false,"moveDuration":1000,
					"strobeRandom":true,"_strobeOn":80.52351552850001,
					"_strobeOff":746.7746368031048,
					"_strobeStart":78084514.849643
				},{
					"type":"rectangle",
					"x":0.6171328671328671,"y":0.351270553064275,
					"w":0.04895104895104895,"h":0.33183856502242154,
					"r":0.3422333989243422,
					"color":"#fffcd4",
					"edit":false,"active":true,"strobe":true,
					"strobeOn":100,"strobeOff":400,
					"move":false,"moveDuration":1000,
					"strobeRandom":true,
					"_strobeOn":86.48123044245813,"_strobeOff":405.98520016350534,
					"_strobeStart":78084446.695077
				},{
					"type":"rectangle",
					"x":0.30965,"y":0.6651718983557549,
					"w":0.09265734265734266,"h":0.15994020926756353,
					"r":0.22513513342101857,
					"color":"#ffffff",
					"edit":false,"active":true,
					"strobe":true,"strobeOn":100,"strobeOff":200,
					"move":true,"moveDuration":200,
					"strobeRandom":true,
					"_strobeOn":61.01421604309392,
					"_strobeOff":143.24434896747175,
					"_strobeStart":78084446.695077,
					"moveTwoWay":true,
					"moveX":0.4
				}
			]
		}
/*
water
"[{"type":"rectangle","x":0.8,"y":0.1,"w":0.1,"h":0.2,"r":0.223656503608587,"color":"#39ff69","edit":false,"active":true,"strobe":false,"strobeOn":100,"strobeOff":100,"move":true,"moveDuration":1511,"moveTwoWay":true,"moveW":0.1,"moveH":0.2,"moveX":-0.05,"moveY":-0.1},{"type":"rectangle","x":0.4,"y":0.2,"w":0.3,"h":0.1,"r":0.5073632078342897,"color":"#91ff00","edit":false,"active":true,"strobe":false,"strobeOn":100,"strobeOff":100,"move":true,"moveDuration":2046,"moveTwoWay":true,"moveW":0.4,"moveH":0.2,"moveX":-0.2,"moveY":-0.1},{"type":"rectangle","x":0.4,"y":0.4,"w":0.1,"h":0.2,"r":0.1,"color":"#b700ff","edit":false,"active":true,"strobe":false,"strobeOn":100,"strobeOff":100,"move":true,"moveDuration":1234,"moveW":0.2,"moveH":0.4,"moveTwoWay":true,"moveX":-0.1,"moveY":-0.2,"strobeRandom":true,"_strobeOn":81.8586976100012,"_strobeOff":69.52728528743953,"_strobeStart":1548729.5308150002},{"type":"rectangle","x":0.13024475524475523,"y":0.2615844544095665,"w":0.07604895104895106,"h":0.5635276532137519,"r":0.57833820307872,"color":"#cbff00","edit":false,"active":true,"strobe":false,"strobeOn":100,"strobeOff":100,"move":true,"moveDuration":2884,"moveW":0.2,"moveH":0.2,"moveX":-0.1,"moveY":-0.1,"moveTwoWay":true}]"
*/
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
	document.getElementById("ambient").value = LIGHT.ambient;
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
