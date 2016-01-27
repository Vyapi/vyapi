describe('controllers', () => {
	let dashboard;

	beforeEach(angular.mock.module('vyapi'));

	beforeEach(inject(($controller) => {
		dashboard = $controller('DashboardController');
	}));

	it('to be defined	',function(){
		expect(dashboard.createRoom()).toBe("room created");
		expect(dashboard.path).toBeDefined();
		expect(dashboard.rooms).toBeDefined();
	});
});
