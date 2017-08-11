$(document).ready(function(){
	myForm.submit();
});

var myForm={
	validate: function(){
			var objectToReturn={
				errorFields:[],
				isValid: false
			};
			$('input').each(function(){
				$(this).removeClass('error');
			});
		    var form=document.forms.myForm;
			var fio = form.elements.fio.value;
			var email = form.elements.email.value;
			var phone = form.elements.phone.value;
			var regexps={
				fio:/^[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}$/,
				email:/^\w{1,}@(ya|yandex)\.(ru|ua|kz|by|com)$/,
				phone:/^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/
				};
			if(fio.match(regexps.fio)==null) objectToReturn.errorFields.push('#fio');
			if(email.match(regexps.email)==null) objectToReturn.errorFields.push('#email');
			if (phone.match(regexps.phone)==null) objectToReturn.errorFields.push('#phone');
			else {
				var phoneArray=phone.split('');
				var sum=0;
				phoneArray.forEach(function(item){
					if (!isNaN(parseInt (item))) sum += parseInt (item);
				});
				if(sum>30) objectToReturn.errorFields.push('#phone');
			}
			objectToReturn.errorFields.forEach(function(field){
				$(field).addClass('error');
			});
			if(objectToReturn.errorFields==0)objectToReturn.isValid=true;
			return objectToReturn;
	},
	getData:function(){
		
	},
	setData: function(object){
		
	},
	submit: function(){
		$('#myForm').on('submit',function(e){
			e.preventDefault();
			var answer=myForm.validate();
			if(answer.isValid){
				document.getElementById('submitButton').disabled = true;
				var getRandomInt = function (min, max){return Math.floor(Math.random() * (max - min + 1)) + min;};
				var queries=['queries/success.json','queries/error.json','queries/progress.json'];
				var queryIndex=getRandomInt(0,2);
				$.ajax({
					url:queries[queryIndex],
					dataType: 'json',
					success:function(answer){
						console.log(answer.status);
					}
				});
			}
		});
	}
};

