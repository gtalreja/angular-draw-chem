describe("DrawChemEditor directive tests - part6", function () {
	beforeEach(module("mmAngularDrawChem"));

	var $scope, element, $rootScope, DrawChem, DrawChemCache, DrawChemModStructure, DrawChemStructures, template, styleFull;

	beforeEach(inject(function ($httpBackend, $compile, _$rootScope_, _DrawChem_, _DrawChemCache_, _DrawChemModStructure_, _DrawChemStructures_) {
		// configure path for static files
		jasmine.getFixtures().fixturesPath = "base/assets/";
		// load template of the editor
		template = readFixtures("draw-chem-editor-modal.html");

		DrawChem = _DrawChem_;
		DrawChemModStructure = _DrawChemModStructure_;
		DrawChemStructures = _DrawChemStructures_;
    DrawChemCache = _DrawChemCache_;
		$rootScope = _$rootScope_;

		$scope = $rootScope.$new();
		element = angular.element(
			"<div draw-chem-editor dc-modal></div>"
		);
		temp = $compile(element)($scope);
		$httpBackend
			.expectGET("draw-chem-editor-modal.html")
			.respond(template);
		$scope.$digest();
		$httpBackend.flush();
	}));

  it("should do nothing when delete is performed but no structure exists", function () {
    DrawChem.runEditor("test");
		expect(DrawChem.showEditor()).toEqual(true);
    temp.find("#dc-delete").click();
		mouseClick(temp, 200, 120);
    expect(temp.find(".dc-editor-dialog-content").html()).toEqual("");
	});

	it("should do nothing when delete is performed, structure is present, but mouseup occurred outside of it", function () {
		var custom = DrawChemStructures.cyclohexane();
    DrawChem.runEditor("test");
		expect(DrawChem.showEditor()).toEqual(true);
		temp.find("#dc-" + custom.name).click();
		mouseClick(temp, 100, 100);
		expect(temp.find(".dc-editor-dialog-content").html()).toEqual(
      "<svg>" +
        "<g id=\"cmpd1\">" +
          "<style type=\"text/css\">" +
            styleBase + styleExpanded +
          "</style>" +
          "<path d=\"M 98.00 98.00 L 115.32 108.00 L 115.32 128.00 L 98.00 138.00 L 80.68 128.00 L 80.68 108.00 L 98.00 98.00 \"></path>" +
					"<rect class=\"focus\" x=\"99.50\" y=\"95.40\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(30.00, 99.50, 95.40)\"></rect>" +
					"<rect class=\"focus\" x=\"118.32\" y=\"108.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(90.00, 118.32, 108.00)\"></rect>" +
					"<rect class=\"focus\" x=\"116.82\" y=\"130.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(150.00, 116.82, 130.60)\"></rect>" +
					"<rect class=\"focus\" x=\"96.50\" y=\"140.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-150.00, 96.50, 140.60)\"></rect>" +
					"<rect class=\"focus\" x=\"77.68\" y=\"128.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-90.00, 77.68, 128.00)\"></rect>" +
					"<rect class=\"focus\" x=\"79.18\" y=\"105.40\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-30.00, 79.18, 105.40)\"></rect>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"98.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"115.32\" cy=\"108.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"115.32\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"138.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"108.00\" r=\"3.40\"></circle>" +
        "</g>" +
    "</svg>");
    temp.find("#dc-delete").click();
    mouseClick(temp, 200, 120);
		expect(temp.find(".dc-editor-dialog-content").html()).toEqual(
      "<svg>" +
        "<g id=\"cmpd1\">" +
          "<style type=\"text/css\">" +
            styleBase + styleExpanded +
          "</style>" +
          "<path d=\"M 98.00 98.00 L 115.32 108.00 L 115.32 128.00 L 98.00 138.00 L 80.68 128.00 L 80.68 108.00 L 98.00 98.00 \"></path>" +
					"<rect class=\"focus\" x=\"99.50\" y=\"95.40\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(30.00, 99.50, 95.40)\"></rect>" +
					"<rect class=\"focus\" x=\"118.32\" y=\"108.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(90.00, 118.32, 108.00)\"></rect>" +
					"<rect class=\"focus\" x=\"116.82\" y=\"130.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(150.00, 116.82, 130.60)\"></rect>" +
					"<rect class=\"focus\" x=\"96.50\" y=\"140.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-150.00, 96.50, 140.60)\"></rect>" +
					"<rect class=\"focus\" x=\"77.68\" y=\"128.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-90.00, 77.68, 128.00)\"></rect>" +
					"<rect class=\"focus\" x=\"79.18\" y=\"105.40\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-30.00, 79.18, 105.40)\"></rect>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"98.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"115.32\" cy=\"108.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"115.32\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"138.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"108.00\" r=\"3.40\"></circle>" +
        "</g>" +
    "</svg>");
	});

	it("should delete a chosen atom", function () {
		var custom = DrawChemStructures.cyclohexane();
    DrawChem.runEditor("test");
		expect(DrawChem.showEditor()).toEqual(true);
		temp.find("#dc-" + custom.name).click();
		mouseClick(temp, 100, 100);
    temp.find("#dc-delete").click();
    mouseClick(temp, 115, 108);
		expect(temp.find(".dc-editor-dialog-content").html()).toEqual(
      "<svg>" +
        "<g id=\"cmpd1\">" +
          "<style type=\"text/css\">" +
            styleBase + styleExpanded +
          "</style>" +
          "<path d=\"M 98.00 98.00 \"></path>" +
					"<path d=\"M 115.32 128.00 L 98.00 138.00 L 80.68 128.00 L 80.68 108.00 L 98.00 98.00 \"></path>" +
					"<rect class=\"focus\" x=\"116.82\" y=\"130.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(150.00, 116.82, 130.60)\"></rect>" +
					"<rect class=\"focus\" x=\"96.50\" y=\"140.60\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-150.00, 96.50, 140.60)\"></rect>" +
					"<rect class=\"focus\" x=\"77.68\" y=\"128.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-90.00, 77.68, 128.00)\"></rect>" +
					"<rect class=\"focus\" x=\"79.18\" y=\"105.40\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(-30.00, 79.18, 105.40)\"></rect>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"98.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"115.32\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"98.00\" cy=\"138.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"128.00\" r=\"3.40\"></circle>" +
          "<circle class=\"atom\" cx=\"80.68\" cy=\"108.00\" r=\"3.40\"></circle>" +
        "</g>" +
    "</svg>");
	});

	it("should delete a chosen arrow", function () {
    DrawChem.runEditor("test");
		expect(DrawChem.showEditor()).toEqual(true);
		temp.find("#dc-one-way-arrow").click();
		mouseClick(temp, 100, 100);
		expect(temp.find(".dc-editor-dialog-content").html()).toEqual(
      "<svg>" +
        "<g id=\"cmpd1\">" +
          "<style type=\"text/css\">" +
            styleBase + styleExpanded +
          "</style>" +
          "<path class=\"arrow\" d=\"M 98.00 98.00 L 118.00 98.00 M 115.00 98.00 L 115.00 96.70 L 118.00 98.00 L 115.00 99.30 Z \"></path>" +
					"<rect class=\"focus\" x=\"98.00\" y=\"95.00\" rx=\"2.00\" ry=\"2.00\" width=\"20.00\" height=\"6.00\" transform=\"rotate(0.00, 98.00, 95.00)\"></rect>" +
					"<circle class=\"atom\" cx=\"98.00\" cy=\"98.00\" r=\"3.40\"></circle>" +
					"<circle class=\"atom\" cx=\"118.00\" cy=\"98.00\" r=\"3.40\"></circle>" +
        "</g>" +
    	"</svg>"
		);
    temp.find("#dc-delete").click();
    mouseClick(temp, 100, 100);
		expect(temp.find(".dc-editor-dialog-content").html()).toEqual(
			"<svg>" +
				"<g id=\"cmpd1\">" +
					"<style type=\"text/css\">" +
						styleBase + styleExpanded +
					"</style>" +
				"</g>" +
			"</svg>"
		);
	});
});
