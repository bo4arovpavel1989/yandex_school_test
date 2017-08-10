$(document).ready(function(){
	myForm.submit();
});

var myForm={
	validate: function(){
			var objectToReturn={errorFields:[]};
		    var form=document.forms.myForm
			var fio = form.elements.fio.value;
			var email = form.elements.email.value;
			var phone = form.elements.phone.value;
			if(fio.match(/^[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}$/)==null) objectToReturn.errorFields.push('#fio');
			if (phone.match(/^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/)==null) objectToReturn.errorFields.push('#tel');
			else {
				var phoneArray=phone.split('');
				var sum=0;
				phoneArray.forEach(function(item){
					console.log(isNaN(parseInt (item)))
					if (!isNaN(parseInt (item))) sum += parseInt (item);
					
				});
				console.log(sum);
				if(sum>30) objectToReturn.errorFields.push('#tel');
			}
			if(email.match(/^\w{1,}@(ya|yandex)\.(ru|ua|kz|by|com)$/)==null) objectToReturn.errorFields.push('#email');
			console.log(objectToReturn);
	},
	getData:function(){
		
	},
	setData: function(object){
		
	},
	submit: function(){
		$('#myForm').on('submit',function(e){
			e.preventDefault();
			myForm.validate();
		});
	}
};

