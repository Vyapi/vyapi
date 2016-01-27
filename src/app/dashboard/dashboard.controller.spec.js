describe('controllers', () => {
	var dashboard;

	beforeEach(angular.mock.module('vyapi'));

	beforeEach(inject(($controller) => {
		dashboard = $controller('DashboardController');
		console.log(dashboard);
	}));

	it('to be defined	',function(){
		spyOn(dashboard,"setParam");
		expect(dashboard.setParam()).toHaveBeenCalled;
		expect(dashboard.path).toBeDefined();
		expect(dashboard.rooms).toBeDefined();
	});
});
