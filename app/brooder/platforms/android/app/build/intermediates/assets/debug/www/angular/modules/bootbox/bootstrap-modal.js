angular.module('bootstrap-modal',[]).service('bootstrapModal', function($compile,$timeout) {

	this.confirm = function(scope,title,content,onOk,onCancel) {
		
		var dialog = bootbox.confirm({
			title: title,
			message: content,
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-dark'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-info'
				}
			},
			callback: function (result) {
				if (result) {
					onOk(scope);
				} else {
					onCancel();
				}
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});	
		
	};
	
	this.notify = function(scope,content,onOk) {

		var dialog = bootbox.alert({
			title: 'Notification',
			message: content,
			callback: function () {
				onOk();
			}
		});
		
		dialog.init(function() {
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box = function(scope,title,content,onOk) {

		var dialog = bootbox.confirm({
			title: title,
			message: 'Loading content...',
			buttons: {
				cancel: {
					label: 'Close',
					className: 'btn-danger'
				},
				confirm: {
					label: 'Ok',
					className: 'btn-success'
				}
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});
		
		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});
	
	};
	
	this.box2 = function(scope,title,content,onOk) {

		var dialog = bootbox.alert({
			title: title,
			message: 'Loading...',
			buttons: {
				ok: {
					label: 'Close',
					className: 'btn-danger'
				}				
			},
			callback: function (result) {
				if (result) {
					return onOk(scope);
				}
			}
		});

		dialog.init(function() {
			dialog.find('.bootbox-body').load(content);
			$('.modal-content').css({"width":"130%", "left":"-15%"});
			$timeout(function() { $compile($('.bootbox-body')[0])(scope); }, 500);
		});

	};	

});