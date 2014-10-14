;(function(window){

	'use strict';

	/**
	 * @author Sebastian Romero - Maachi LLC
	 * Specific functionality for the popover object
	 */
	window.Popover = function(){

		var popoverObject,
			popoverClassName = "bs-popover";


		/**
		 * @constructor
		 */
		function popover(){
			draw();
		}


		/**
		 * Creates the popover
		 * @return {[type]} [description]
		 */
		function draw(){
			if(!popoverObject){
				popoverObject = document.createElement("div");
				document.body.appendChild(popoverObject);
			}
			popoverObject.className = popoverClassName;
			popoverObject.innerHTML = "popover";
		}

		/**
		 * Adds a step to the mometum
		 */
		popover.prototype.show = function(){
		};

		return popover;
	}();

}(window));