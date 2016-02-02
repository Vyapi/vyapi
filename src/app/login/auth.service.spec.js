describe('service Auth', () => {
	beforeEach(angular.mock.module('vyapi'));

	it('should be registered', inject(Auth=> {
		expect(Auth).not.toEqual(null);
	}));

	describe('all the functions', () => {
		xit('login should exist', inject(Auth => {
			expect(Auth.login).not.toBeNull();
			var data = Auth.login();
			console.log(data);
			expect(data).toEqual("success");
		}));
		it('logout should exist', inject(Auth => {
			expect(Auth.logout).not.toBeNull();
			var data = Auth.logout();
			expect(data).toEqual("success");
		}));
	});
});
