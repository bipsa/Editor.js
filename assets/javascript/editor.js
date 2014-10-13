;(function(window, document){

	'use strict';


	/**
	 * @author Sebastian Romero - Maachi LLC
	 * This class represents the Medium editor
	 * @return {[type]} public reference
	 */
	window.Editor = function(){
			/** @type {HTMLObject} reference of the editor */
		var editor,
			/** @type {Memento} current steps*/
			userSteps,
			/** @type {Number} Steps required for the Memento class */
			defaultMaxOfSteps = 8;

		/**
		 * Constructor
		 */
		function editor(htmlObject){
			editor = htmlObject;
			addEvents();
			editable(true);
		}

		/**
		 * Makes the editor element captured in the constructor editable or not according with the param
		 * @param  {Boolean} isEditable enables the edition to the editor object
		 */
		function editable(isEditable){
			if(editor){
				editor.setAttribute("contenteditable", isEditable);
			}
		}

		/**
		 * Event trigger when theres focus in the element
		 * @param  {[type]} event [description]
		 */
		function onFocus(event){
		}


		/**
		 * Gets the selection of the user
		 * @return {[String]} HTML of the selection
		 */
		function getSelection(){
			var selection,
				container,
				html,
				len,
				i;
			if(window.getSelection()){
				selection = window.getSelection();
				if (selection.rangeCount){
					container = document.createElement('div');
					for (i = 0, len = selection.rangeCount; i < len; i += 1) {
						container.appendChild(selection.getRangeAt(i).cloneContents());
					}
					html = container.innerHTML;
				}
			}
			return html;
		}


		function appendHTML(selection){
			document.execCommand('insertHTML', false, selection);
		}


		/** Adds the events to the landing page */
		function addEvents(){
			editor.addEventListener('focus', onFocus);
			userSteps = new Memento(defaultMaxOfSteps);
		}


		/**
		 * Adds html to the given selection after validating if is a valid html tag given
		 * @param {[type]} tag [description]
		 */
		function addHTMLToSelection(tag){
			var selection = getSelection();
			if(selection){
				userSteps.add(editor.innerHTML);
				selection = "<" + tag + ">" + selection + "</" + tag + ">";
				appendHTML(selection);
			}
		}


		/**
		 * @public
		 * Sets the selection in bold
		 */
		editor.prototype.setBold = function(){
			addHTMLToSelection("strong");
		};


		editor.prototype.undo = function(){
			var step = userSteps.undo();
			if(step){
				editor.innerHTML = step;
			}
		};

		return editor;

	}();


	/**
	 * @author Sebastian Romero - Maachi LLC
	 * Saves the differents mementos of the editor
	 */
	var Memento = function(){
			/** @type {Array} array of object that contains the steps */
		var steps,
			/** @type {Number} current index of the steps */
			index = 0,
			/** @type {Number} Maximum of steps support by the program*/
			maxSteps = 2;

		/**
		 * @constructor
		 * @param  {[Number]} maxS Optional Max of steps supported 
		 */
		function memento(maxS){
			if(maxS){
				maxSteps = maxS;
			}
		}

		/**
		 * Adds a step to the mometum
		 * @param {[type]} step [description]
		 */
		memento.prototype.add = function(step){
			var tempSteps,
				i = 1;
			if(!steps){
				steps = [];
			}
			if(steps.length == maxSteps){
				tempSteps = steps;
				steps = [];
				for (; i<tempSteps.length; i++){
					steps.push(tempSteps[i]);
				}
			}
			steps.push(step);
			index = steps.length-1;
		};


		/**
		 * Get back one step
		 * @return {[Object]} returns object reference
		 */
		memento.prototype.undo = function(){
			var reference;
			if(steps){
				reference = steps[index];
				steps.splice(index, 1);
				index--;
			}
			return reference;
		};

		return memento;
	}();


}(window, document));