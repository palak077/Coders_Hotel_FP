
//booking form

register.addEventListener('click', () => {
	
	//if,loop,radio button,array js
	var cardnumber = document.getElementById('card').value;
	
    var cnumber = cardnumber.substring(0, 4);
	//it display only first 4 digits of card number, 0-starting number , 4 - ending number.
    
	var cardtype = document.getElementsByName('card');
	var cardtypeselected;
	
	for(var i = 0; i < cardtype.length; i++){
		
		if(cardtype[i].checked){
			cardtypeselected = cardtype[i].value;
			if(cardtypeselected=="MasterCard")
		{
			var discount = "5% discount on master card"
		}
		else if(cardtypeselected=="Visa")
		{
			discount = "$30 cashback"
		}
		else
		{
			discount = "NO OFFER"
			
		}
			
		}
		
		
		
	}
	
	
	//object
    let regInfo = {
    fname: fname.value,
    email: mail.value,
    phone: phone.value,
    address: address.value,
    person: person.value,
    room: room.value,
	datefrom:datefrom.value,
	dateto:dateto.value,
    instructions: instructions.value
    }
	
    output.innerHTML = `We accept your booking for our hotel, Check your Details and Print Receipt <br>Name:  ${regInfo.fname} <br> Phone: ${ regInfo.phone } <br>Email Address: ${ regInfo.email }<br> Address : ${regInfo.address} <br> Total No. of person : ${regInfo.person} <br> Booking From : ${regInfo.datefrom} <br> Booking To : ${regInfo.dateto}` + '<br> Your Card Type :'+ cardtypeselected + '<br> Your Card Number is :' + cnumber +'xxxxxxxx <br> Discount on your Card Type :' + discount;
	console.log(regInfo);
	return false;

})


/*****************************contact page js*****************/


function info()
{
	
	var namev = document.conform.name.value;
	var phonev = document.conform.phone.value;
	var addressv = document.conform.address.value;
	var emailv = document.conform.mail.value;
	var queryv = document.conform.query.value;
	
	
		if(document.conform.name.value.length<3)
			{
			document.getElementById("nameerror").innerHTML="Select Atleast 3 Character Name";
			return false;
			
			}
		if(document.conform.address.value.length<=10)
			{
			document.getElementById("addresserror").innerHTML="Select Atleast 10 Character address";
			return false;
			}
			
			
		if(document.conform.phone.value.length<10 || document.conform.phone.value.length>10)
			{
			document.getElementById("phoneerror").innerHTML="only 10 digits allowed";
			return false;
			}
			
			
			
		if ((conform.mail.value == "" || conform.mail.value.indexOf('@')<=2) || conform.mail.value.indexOf('.') == 8)
			{ 
			document.getElementById("emailerror").innerHTML="write correct format of E-Mail";
			return false;
			}
			
			
		if (( document.conform.gender[0].checked == false ) && (document.conform.gender[1].checked == false ) ) 
			{ 
			document.getElementById("gendererror").innerHTML="Select Gender";
			return false; 
			}
			
		if(document.conform.query.value.length<=10)
			{
			document.getElementById("queryerror").innerHTML="Select Atleast 10 Character query";
			return false;
			}
			
			
			
		document.getElementById('contactoutput').innerHTML="<font color='red'>Your Query is submitted to us</font> <br> Your Name is : " + namev + "<br> Your Email is : " + emailv + "<br> Your Phone Number is : " + phonev + '<br> Address is : ' + addressv + "<br> Your Query is : " + queryv + "<br><font color='red'>We Will call You Back</font>" ;

return false;
		
}