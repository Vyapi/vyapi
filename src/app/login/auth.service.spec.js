describe('service Auth', () => {
	beforeEach(angular.mock.module('vyapi'));

	it('should be registered', inject(Auth=> {
		expect(Auth).not.toEqual(null);
	}));

	describe('all the functions', () => {
		xit('login should exist', inject(Auth => {
			expect(Auth.login).not.toBeNull();
			var data = Auth.login();
			console.log("Data back from Auth\n" + data);
			expect(data).toEqual(true);
		}));
		it('logout should exist', inject(Auth => {
			expect(Auth.logout).not.toBeNull();
			var data = Auth.logout();
			expect(data).toEqual(true);
		}));
	});
});
