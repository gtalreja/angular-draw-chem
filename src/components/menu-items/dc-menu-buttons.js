(function () {
	"use strict";
	angular.module("mmAngularDrawChem")
		.factory("DrawChemMenuButtons", DrawChemMenuButtons);

	DrawChemMenuButtons.$inject = [
    "DrawChemStructures",
		"DrawChemLabels",
    "DrawChemActions",
		"DrawChemEdits",
    "DrawChemArrows",
    "DrawChemGeomShapes",
    "DrawChemDirectiveFlags"
  ];

	function DrawChemMenuButtons(Structures, Labels, Actions, Edits, Arrows, Shapes, Flags) {

		var service = {};

    service.addButtonsToScope = function (scope) {
			var menu = {
				"Actions": {
					actions: Actions.actions
				},
				"Edit": {
					actions: Edits.edits
				},
				"Arrows": {
					actions: Arrows.arrows
				},
				"Structures": {
					actions: Structures.structures
				},
				"Atom Labels": {
					actions: Labels.labels
				}
			}

			scope.menu = {};

			scope.quickMenu = {};

      // stores all actions related to Actions, Edit, Arrows, and ModStructure menu items
      angular.forEach(menu, function (item, name) {
				scope.menu[name] = {
					actions: item.actions,
					scope: scope
				}
			});

			// stores all actions related to quick menu
			angular.forEach(menu["Structures"].actions, function (item, name) {
				if (item.quick) {
					scope.quickMenu[name] = item;
					item.scope = scope;
				}
			});

      scope.chooseCustomLabel = function (text) {
				Flags.customLabel = text;
        Flags.selected = "customLabel";
      };

			scope.chooseTextArea = function (text) {
				Flags.textArea = text;
        Flags.selected = "textArea";
      };
    };

		return service;
	}
})();
