(function () {
	"use strict";
	angular.module("mmAngularDrawChem")
		.directive("drawChemEditor", DrawChemEditor);

	DrawChemEditor.$inject = [
		"DrawChemPaths",
		"DrawChemCache",
		"DrawChemDirectiveUtils",
		"DrawChemDirectiveMouseActions",
		"DrawChemMenuButtons",
		"$sce"
	];

	function DrawChemEditor(Paths, Cache, Utils, MouseActions, MenuButtons, $sce) {
		return {
			template: "<div ng-include=\"getEditorUrl()\"></div>",
			scope: {
				showEditor: "="
			},
			link: function (scope, element, attrs) {
				scope.getEditorUrl = function () {
					var editorHtml = attrs.dcModal === "" ? "draw-chem-editor-modal.html": "draw-chem-editor.html";
					return Paths.getPath() + editorHtml;
				};

				scope.pathToSvg = Paths.getPathToSvg();

				scope.structures = [];

				scope.trackingFn = function (structure, index) {
					console.log(index + "" + structure.selected)
					return index + "" + structure.selected;
				}

				scope.selection = {};

				scope.$watchCollection("selection", function (newValues, oldValues) {
					var structure = Cache.getCurrentStructure();
					angular.forEach(newValues, function (value, key) {
						scope.structures[key].selected = value;
					});
					if (structure !== null) {
						Utils.drawStructure(structure);
					}
				});

				// Sets width and height of the dialog box based on corresponding attributes.
				scope.dialogStyle = {};

				if (attrs.width) {
					scope.dialogStyle.width = attrs.width;
				}
				if (attrs.height) {
					scope.dialogStyle.height = attrs.height;
				}

				// Returns content which will be bound in the dialog box.
				scope.content = function () {
					var svg = $sce.trustAsHtml(Cache.getCurrentSvg());
					return svg;
				};

				// Adds all buttons to the scope
				MenuButtons.addButtonsToScope(scope);

				/***** Mouse Events *****/
				scope.doOnMouseDown = function ($event) {
					try {
						MouseActions.doOnMouseDown($event, scope, element);
					} catch (e) {
						console.log(e);
					}
				};

				scope.doOnMouseUp = function ($event) {
					try {
						MouseActions.doOnMouseUp($event, scope, element);
					} catch (e) {
						console.log(e);
					}
				};

				scope.doOnMouseMove = function ($event) {
					try {
						MouseActions.doOnMouseMove($event, scope, element);
					} catch (e) {
						console.log(e);
					}
				};
			}
		}
	}
})();
