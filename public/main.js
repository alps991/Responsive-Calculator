
"use strict";

$(document).ready(function () {

	let params = [];
	let decimalPlace = 0;
	let locked = false;

	$(".num-btn").click((e) => {
		addParams(Number(e.target.textContent));
	});

	$(".operator").click((e) => {
		addParams(e.target.textContent);
	});

	$("#equals").click(() => {
		if (params.length == 3) {
			$('#solution').html("");
			$('#solution').append(' = ' + evaluate(params));
			params = [evaluate(params)];
		}
	});

	$("#clear").click(() => {
		$('#solution').text("");
		decimalPlace = 0;
		params = [];
		locked = false;
	});

	$("#save").click(() => {
		if (params[0]) {
			$('#savedList').append(
				`<div class="row saved-element">
					<span class="col-xs-6">${params[0]}</span>
					<button class="col-xs-3 insert-save-btn">Insert</button>
					<button class="col-xs-3 remove-save-btn">Delete</button>
				</div>`
			);
			$('#solution').text("");
			params = [];
			decimalPlace = 0;
			locked = false;
		}
	});

	$("#unsave").click(() => {
		$('#savedList').text("");
	});

	$(document).on('click', ".remove-save-btn", (e) => {
		e.currentTarget.closest("div").remove();
	});

	$(document).on('click', ".insert-save-btn", (e) => {
		if (params.length == 0 || params.length == 2) {
			addParams(Number(e.currentTarget.closest("div").children[0].innerHTML));
			locked = true;
		}
	});

	function evaluate(arr) {
		if (params.length > 2) {
			locked = true;
			switch (arr[1]) {
				case '+':
					return parseFloat((arr[0] + arr[2]).toFixed(8));
					break;
				case '-':
					return parseFloat((arr[0] - arr[2]).toFixed(8));
					break;
				case '*':
					return parseFloat((arr[0] * arr[2]).toFixed(8));
					break;
				case '/':
					return parseFloat((arr[0] / arr[2]).toFixed(8));
					break;
			}
		} else {
			return arr;
		}
	}

	function addParams(x) {
		let prev = params[params.length - 1];
		if (isAcceptableParam(x)) {
			if (decimalPlace > 0 && isNumber(x)) {
				if (decimalPlace < 9) {
					params[params.length - 1] = parseFloat((prev + x / Math.pow(10, decimalPlace)).toFixed(8));
					decimalPlace++;
					$('#solution').append(x);
				}
			} else if (x == ".") {
				if (decimalPlace == 0 && !locked) {
					if (params.length == 0 || !isNumber(prev)) {
						params.push(0);
						$('#solution').append("0");
					}
					$('#solution').append(x);
					decimalPlace = 1;
				}
			} else if (isNumber(x) && isNumber(prev)) {
				if (!locked) {
					params[params.length - 1] = (prev * 10) + x;
					$('#solution').append(x);
				}
			} else if (params.length < 3) {
				params.push(x);
				decimalPlace = 0;
				if (isNumber(x)) {
					$('#solution').append(x);
				} else {
					$('#solution').append(` ${x} `);
					locked = false;
				}
			}
			
		}
	}

	function isAcceptableParam(x) {
		let prev = params[params.length - 1];
		return params.length < 4 && ((isNumber(x) || isNumber(prev)) || x == ".");
	}

	function isNumber(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}

});