describe('service Dashboard', () => {
	beforeEach(angular.mock.module('vyapi'));

	it('should be registered', inject(Dashboard=> {
		expect(Dashboard).not.toEqual(null);
	}));

	describe('all the functions', () => {
		it('getRooms should exist', inject(Dashboard => {
			expect(Dashboard.getRooms).not.toBeNull();
			var data = Dashboard.getRooms();
			expect(data).toEqual("success");
		}));
		it('getUserID should exist', inject(Dashboard => {
			expect(Dashboard.getUserID).not.toBeNull();
			var data = Dashboard.getUserID();
			expect(data).toEqual("success");
		}));
		it('getUserPic should exist', inject(Dashboard => {
			expect(Dashboard.getUserPic).not.toBeNull();
			var data = Dashboard.getUserPic();
			expect(data).toEqual("success");
		}));
		it('remove should exist', inject(Dashboard => {
			expect(Dashboard.remove).not.toBeNull();
			var data = Dashboard.remove();
			expect(data).toEqual("success");
		}));
		it('createRoom should exist', inject(Dashboard => {
			expect(Dashboard.createRoom).not.toBeNull();
			var data = Dashboard.createRoom();
			expect(data).toEqual("success");
		}));
		it('editRoom should exist', inject(Dashboard => {
			expect(Dashboard.editRoom).not.toBeNull();
			var data = Dashboard.editRoom();
			expect(data).toEqual("success");
		}));
		it('saveValues should exist', inject(Dashboard => {
			expect(Dashboard.saveValues).not.toBeNull();
			var data = Dashboard.saveValues();
			expect(data).toEqual("success");
		}));
	});
	/*
		 it('should return array of object', inject(webDevTec => {
		 const data = webDevTec.getTec();
		 expect(data).toEqual(jasmine.any(Array));
		 expect(data[0]).toEqual(jasmine.any(Object));
		 expect(data.length > 5).toBeTruthy();
		 }));
		 });
	 */
});
