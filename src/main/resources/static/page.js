const baseurl = 'http://localhost:8080/cards';

function fillInDetails(data) {
	let html = `
		<b>LastName: ${data.lastName}</b>
		<b>FirstName: ${data.firstName}</b>
		<b>Company: ${data.company}</b>
		<b>Title: ${data.title}</b>

	`;
	
	for (let phone of data.phoneNumbers) {
		html += `
			<div>
				<br>
				<b>${phone.type}</b>
				<b>${phone.number}</b>
			
				<form class="delete-phone-form" method="post" action="/cards/${data.id}/phone/${phone.id}">
					<button>Delete Phone</button>
				</form>
				
			</div>
		`;
	}
	
	html +=`
			<form id="create-phone-form" method="post" action="/cards/${data.id}/phone">
				<br>
				<input name="type" id="type">
				<br>
				<input required name="number" id="number">
				<br>
				<button>Add Phone</button>
			</form>	
	`;
	
	
	for (let address of data.addresses) {
		html += `
			<div>
				<br>
				<b>${address.type}</b>
				<b>${address.street}</b>
				<b>${address.city}</b>
				<b>${address.state}</b>
				<b>${address.zipCode}</b>
			
			<form class="delete-address-form" method="post" action="/cards/${data.id}/address/${address.id}">
				<button>Delete Address</button>
			</form>

			</div>
	
		`;	
	}
		
		html += `
			<form id="create-address-form" method="post" action="/cards/${data.id}/address">
				<br>
				<input name="type" id="type">
				<br>
				<input required name="street" id="street">
				<br>
				<input required name="city" id="city">
				<br>
				<input required name="state" id="state">
				<br>
				<input required name="zipCode" id="zipCode">
				<br>
				<button>Add Address</button>
			</form>
			
	`;
console.log(html);
	$('#card-detail').html(html);

	
}

function createListElement(card) {
	
	$('<li></li>')
	.html(`
		<a href="#" data-card-id="${card.id}">
			${card.lastName}, ${card.firstName}
		</a>
		
		<form class="delete-card-form" method="post" action="/cards/${card.id}">
			<button>Delete</button
		</form>
		
		`)
	.appendTo($('#card-list'));
	
}

$('#create-card-form').on('submit', function (e) {
	
	e.preventDefault();

	let payload = {
			firstName: $('#firstName').val(),
			lastName: $('#lastName').val(),
			title: $('#title').val(),
			company: $('#company').val(),
			pictureUrl: $('#pictureUrl').val()

	};
	
	let ajaxOptions = {
			type: 'POST',
			data: JSON.stringify(payload),
			contentType: 'application/json'
	};
	
	$.ajax(this.action, ajaxOptions)
		.done(function (card) {
			createListElement(card);
			
		})

		.fail(error => console.error(error));

});

$(document).on('submit', '.delete-card-form', function (e) {
	e.preventDefault();
	
	$.ajax(this.action, { type: 'DELETE' })
		.done(() => {
			$(this)
				.closest('li')
				.remove();
		})
		
		.fail(error => console.error(error));
});

$(document).on('submit', '#create-phone-form', function (e){
	console.log(e);
	e.preventDefault();
	
	let payload = {
			type: $('#type').val(),
			number: $('#number').val()
	};
	
	let ajaxOptions = {
			type: 'POST',
			data: JSON.stringify(payload),
			contentType: 'application/json'
	};
	
	$.ajax(this.action, ajaxOptions)
		.done(function (data) {

			fillInDetails(data);
		})
		
		.fail(error => console.error(error));	
	
});

$(document).on('submit', '.delete-phone-form', function (e) {
	e.preventDefault();
	
	$.ajax(this.action, { type: 'DELETE' })
		.done(() => {
			$(this)
				.closest('div')
				.remove();
		})
		
		.fail(error => console.error(error));
});

$(document).on('submit', '#create-address-form', function (e){
	e.preventDefault();
	
	let payload = {
			type: $('#type').val(),
			street: $('#street').val(),
			city: $('#city').val(),
			state: $('#state').val(),
			zipCode: $('#zipCode').val()
	};
	
	let ajaxOptions = {
			type: 'POST',
			data: JSON.stringify(payload),
			contentType: 'application/json'
	};
	
	$.ajax(this.action, ajaxOptions)
		.done(function (data) {

			fillInDetails(data);
		})
		
		.fail(error => console.error(error));	
	
});


$(document).on('submit', '.delete-address-form', function (e) {
	e.preventDefault();
	
	$.ajax(this.action, { type: 'DELETE' })
		.done(() => {
			$(this)
				.closest('div')
				.remove();
		})
		
		.fail(error => console.error(error));
});


// Click Handler for the entire Webpage
$(document).on('click', 'a[data-card-id]', function (e) {

	e.preventDefault();
	
	const cardId = $(this).data('cardId');
	
	
	$.getJSON(baseurl + '/' + cardId, function (data) {

		data.company = data.company || '<i>no company speified</i>';
		fillInDetails(data);

	});

});

$.getJSON(baseurl,function (data) {
	if (data.length) {
		for (let card of data) {
			createListElement(card);
		}
	} else {
		$('<li></li>')
		.css('color', 'red')
		.html('You Have no Rolodex Data.')
		.appendTo($('#card-list'));
	}
	console.log('List Rolodex Data if Available');
});