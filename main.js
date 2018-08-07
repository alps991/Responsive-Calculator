"use strict";

$( document ).ready(function() {

	let params = [];
	let decimalPlace = 0;

	$("#one").click(() => {
		addParams(1);
	});

	$("#two").click(() => {
		addParams(2);
	});

	$("#three").click(() => {
		addParams(3);
	});

	$("#four").click(() => {
		addParams(4);
	});

	$("#five").click(() => {
		addParams(5);
	});

	$("#six").click(() => {
		addParams(6);
	});

	$("#seven").click(() => {
		addParams(7);
	});

	$("#eight").click(() => {
		addParams(8);
	});

	$("#nine").click(() => {
		addParams(9);
	});

	$("#zero").click(() => {
		addParams(0);
	});

	$("#decimal").click(() => {
		addParams(".");
	});

	$("#add").click(() => {
		addParams('+');
	});

	$("#sub").click(() => {
		addParams('-');
	});

	$("#mult").click(() => {
		addParams('*');
	});

	$("#divide").click(() => {
		addParams('/');
	});

	$("#equals").click(() => {
		$('#solution').append(' = ' + evaluate(params));
		params = [evaluate(params)];
	});

	$("#clear").click(() => {
		$('#solution').text("");
		decimalPlace = 0;
		params = [];
	});

	$("#save").click(() => {
		if(params[0]){
			$('#savedList').append(
				`<div class="row">
					<span class="col-xs-3">${params[0]}</span>
					<button class="col-xs-3 insert-save-btn">Insert</button>
					<button class="col-xs-3 remove-save-btn">Delete</button>
				</div> 
				<br>`
			);

			$('#solution').text("");
			params = [];
		}
	});

	$("#unsave").click(() => {
		$('#savedList').text("");
	});

	$(document).on('click', ".remove-save-btn", (e) => {
		e.currentTarget.closest("div").remove();
	});

	$(document).on('click', ".insert-save-btn", (e) => {
		if(params.length == 0 || params.length == 2) {
			addParams(e.currentTarget.closest("div").children[0].innerHTML);
		}
	});

	function evaluate(arr){
		if(params.length > 2){
			switch(arr[1]) {
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

	function addParams(x){
		let prev = params[params.length-1];
		if(isAcceptableParam(x)){
			if(decimalPlace > 0 && isNumber(x)){
				params[params.length-1] = prev + x / Math.pow(10, decimalPlace);
				decimalPlace++;
				$('#solution').append(x);
			} else if(x == "."){
				if(decimalPlace == 0) {
					if(params.length == 0 || !isNumber(prev)){
						params.push(0);					
					}
					$('#solution').append(x);
					decimalPlace = 1;
				}
			} else if(isNumber(x) && isNumber(prev)){
				params[params.length-1] = (prev * 10) + x;
				$('#solution').append(x);
			} else if(params.length < 3) {
				params.push(x);
				decimalPlace = 0;
				if(isNumber(x)) {
					$('#solution').append(x);
				} else {
					$('#solution').append(` ${x} `);
				}
				
			}
		}
	}

	function isAcceptableParam(x) {
		let prev = params[params.length-1];
		return params.length < 4 && ((isNumber(x) || isNumber(prev)) || x == ".");
	}

	function isNumber(n) {
	  return !isNaN(parseFloat(n)) && isFinite(n);
	}

});