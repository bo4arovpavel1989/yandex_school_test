$(document).ready(function(){
	$('#myForm').on('submit',function(e){
		e.preventDefault();
		myForm.submit();
	});
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
	fio:'#myForm>input[name="fio"]',
	email:'#myForm>input[name="email"]',
	phone:'#myForm>input[name="phone"]',
	validate: function(){
			var objectToReturn={
				errorFields:[],
				isValid: false
			};
			$('input').each(function(){
				$(this).removeClass('error');
			});
			var data=this.getData();
			var patterns={
				fio:/^[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}\s[A-Za-zА-Яа-яЁё]{1,}$/,
				email:/^\w{1,}@(ya|yandex)\.(ru|ua|kz|by|com)$/,
				phone:/^\+7\(\d\d\d\)\d\d\d-\d\d-\d\d$/
				};
			if(data.fio.match(patterns.fio)==null) objectToReturn.errorFields.push(this.fio);
			if(data.email.match(patterns.email)==null) objectToReturn.errorFields.push(this.email);
			if (data.phone.match(patterns.phone)==null) objectToReturn.errorFields.push(this.phone);
			else {
				var phoneArray=data.phone.split('');
				var sum=0;
				phoneArray.forEach(function(item){
					if (!isNaN(parseInt (item))) sum += parseInt (item);
				});
				if(sum>30) objectToReturn.errorFields.push(this.phone);
			}
			objectToReturn.errorFields.forEach(function(field){
				$(field).addClass('error');
			});
			if(objectToReturn.errorFields.length==0)objectToReturn.isValid=true;
			return objectToReturn;
	},
	getData:function(){
			return {
				fio:$(this.fio).val(),
				email:$(this.email).val(),
				phone:$(this.phone).val()
			};
	},
	setData: function(object){
		if(object){
			$(this.fio).val(object.fio);
			$(this.email).val(object.email)
			$(this.phone).val(object.phone);
		}
	},
	submit: function(){
			var that=this;
			var answer=this.validate();
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
						if(answer.status=='progress')setTimeout(function(){that.submit()},answer.timeout);
					},
					error:function(e){
						console.log(e);
					}
				});
			}
	}
};

