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
			phone:"+7(111)111-11-11",
			validate:123
		});
	});
});

const myForm={
	fio:'#myForm>input[name="fio"]',
	email:'#myForm>input[name="email"]',
	phone:'#myForm>input[name="phone"]',
	getData:function(){
			var objectToReturn={};
			
			$('#myForm>input').each(function(){
				objectToReturn[$(this).attr('name')]=$(this).val();
			});
			
			return objectToReturn;
	},
	setData: function(object){
		if(object)for (prop in object){
					if(typeof(this[prop])==='string') $(this[prop]).val(object[prop]);
				}			
	},
	validate: function(){
			$('input').each(function(){
				$(this).removeClass('error');
			});
			
			var objectToReturn={
				errorFields:[],
				isValid: false
			};
			var data=this.getData();
			var patterns={
				fio:/^([A-Za-zА-Яа-яЁё]{1,}\s){2}[A-Za-zА-Яа-яЁё]{1,}$/,
				email:/^[^\s]{1,}@ya(ndex)?\.(ru|ua|kz|by|com)$/,
				phone:/^\+7\(\d{3}\)\d{3}-\d{2}-\d{2}$/
			};
			
			for (prop in data){
				if(data[prop].match(patterns[prop])==null)objectToReturn.errorFields.push(this[prop]);
			}	
			
			if(objectToReturn.errorFields.indexOf(this.phone)===-1){//start checking sum only if it matches phone pattern
				var phoneArray=data.phone.match(/\d{1}/g);
				var sum=0;
				phoneArray.forEach(function(item){
					 sum += parseInt (item);
				});
				if(sum>30) objectToReturn.errorFields.push(this.phone);
			}
			
			if(objectToReturn.errorFields.length==0)objectToReturn.isValid=true;
			else objectToReturn.errorFields.forEach(function(field){
					$(field).addClass('error');
				});	
				
			return objectToReturn;
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

