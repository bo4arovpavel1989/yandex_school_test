$(document).ready(function(){
	myForm.submit();
	$('#getData').on('click',function(){
		console.log(myForm.getData());
	});
	$('#setData').on('click',function(){
		myForm.setData({
			fio:"qwe qwe qqw",
			email:"qwe@ya.ru",
			phone:"+7(111)111-11-11"
		});
	});
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
			var fio = $('#myForm>input[name="fio"]').val();
			var email = $('#myForm>input[name="email"]').val()
			var phone = $('#myForm>input[name="phone"]').val();
			var patterns={
				fio:/^[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}$/,
				email:/^\w{1,}@(ya|yandex)\.(ru|ua|kz|by|com)$/,
				phone:/^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/
				};
			if(fio.match(patterns.fio)==null) objectToReturn.errorFields.push('#myForm>input[name="fio"]');
			if(email.match(patterns.email)==null) objectToReturn.errorFields.push('#myForm>input[name="email"]');
			if (phone.match(patterns.phone)==null) objectToReturn.errorFields.push('#myForm>input[name="phone"]');
			else {
				var phoneArray=phone.split('');
				var sum=0;
				phoneArray.forEach(function(item){
					if (!isNaN(parseInt (item))) sum += parseInt (item);
				});
				if(sum>30) objectToReturn.errorFields.push('#myForm>input[name="phone"]');
			}
			objectToReturn.errorFields.forEach(function(field){
				$(field).addClass('error');
			});
			if(objectToReturn.errorFields.length==0)objectToReturn.isValid=true;
			return objectToReturn;
	},
	getData:function(){
			var fio = $('#myForm>input[name="fio"]').val();
			var email = $('#myForm>input[name="email"]').val()
			var phone = $('#myForm>input[name="phone"]').val();
			var objectToReturn={
				fio:fio,
				email:email,
				phone:phone
			};
			return objectToReturn;
	},
	setData: function(object){
		$('#myForm>input[name="fio"]').val(object.fio);
		$('#myForm>input[name="email"]').val(object.email)
		$('#myForm>input[name="phone"]').val(object.phone);
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
						$('#resultContainer').empty();
						$('#resultContainer').removeClass();
						$('#resultContainer').addClass(answer.status);
						if(answer.status=='success')$('#resultContainer').append('Success');
						if(answer.status=='error')$('#resultContainer').append(answer.reason);
						if(answer.status=='progress')setTimeout(function(){$('#myForm').submit()},answer.timeout);
					},
					error:function(e){
						console.log(e);
					}
				});
			}
		});
	}
};

