(function () {
	"use strict";
	angular.module("mmAngularDrawChem")
		.factory("DrawChemEdits", DrawChemEdits);

	DrawChemEdits.$inject = ["DrawChemCache", "DrawChemDirectiveUtils"];

	function DrawChemEdits(Cache, Utils) {

		var service = {};

		/**
		* Marks all structures as selected.
		*/
    service.selectAll = function () {
			var structure = angular.copy(Cache.getCurrentStructure());
			if (structure !== null) {
				structure.selectAll();
				Cache.addStructure(structure);
			  Utils.drawStructure(structure);
			}
    };

		/**
		* Deselects all structures.
		*/
		service.deselectAll = function () {
			var structure = angular.copy(Cache.getCurrentStructure());
			if (structure !== null) {
				structure.deselectAll();
				Cache.addStructure(structure);
				Utils.drawStructure(structure);
			}
    };

		/**
		* Aligns all structures to the uppermost point.
		*/
		service.alignUp = function () {
			var structure = angular.copy(Cache.getCurrentStructure()), changed = false, minMax;
			if (structure !== null) {
				minMax = structure.findMinMax();
				changed = structure.alignUp(minMax.minY);
				if (changed) {
					Cache.addStructure(structure);
					Utils.drawStructure(structure);
				}
			}
		};

		/**
		* Aligns all structures to the lowermost point.
		*/
		service.alignDown = function () {
			var structure = angular.copy(Cache.getCurrentStructure()), changed = false, minMax;
			if (structure !== null) {
				minMax = structure.findMinMax();
				changed = structure.alignDown(minMax.maxY);
				if (changed) {
					Cache.addStructure(structure);
					Utils.drawStructure(structure);
				}
			}
		};

		/**
		* Aligns all structures to the rightmost point.
		*/
		service.alignRight = function () {
			var structure = angular.copy(Cache.getCurrentStructure()), changed = false, minMax;
			if (structure !== null) {
				minMax = structure.findMinMax();
				changed = structure.alignRight(minMax.maxX);
				if (changed) {
					Cache.addStructure(structure);
					Utils.drawStructure(structure);
				}
			}
		};

		/**
		* Aligns all structures to the rightmost point.
		*/
		service.alignLeft = function () {
			var structure = angular.copy(Cache.getCurrentStructure()), changed = false, minMax;
			if (structure !== null) {
				minMax = structure.findMinMax();
				changed = structure.alignLeft(minMax.minX);
				if (changed) {
					Cache.addStructure(structure);
					Utils.drawStructure(structure);
				}
			}
		};

		service.edits = {
			"select all": {
				action: service.selectAll,
				id: "select-all",
				shortcut: "shift + a"
			},
			"deselect all": {
				action: service.deselectAll,
				id: "deselect-all",
				shortcut: "shift + d"
			},
			"align up": {
				action: service.alignUp,
				id: "align-up",
				shortcut: "shift + q"
			},
			"align down": {
				action: service.alignDown,
				id: "align-down",
				shortcut: "shift + w"
			},
			"align right": {
				action: service.alignRight,
				id: "align-right",
				shortcut: "shift + r"
			},
			"align left": {
				action: service.alignLeft,
				id: "align-left",
				shortcut: "shift + e"
			}
		};

		return service;
	}
})();