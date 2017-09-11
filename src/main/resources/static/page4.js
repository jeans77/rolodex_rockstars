const baseurl = 'http://localhost:8080/cards';

function fillInDetails(data) {
	let html = `
		<h1>${data.lastName} ${data.firstName}</h1>
		<h2>${data.company}</h2>
		<div>Title: ${data.title}</div>
	`;
	
	for (let phone of data.phoneNumbers) {
		html += `
			<div>
				<b>${phone.type}</b>
				<div>${phone.number}</div>
			</div>
		`;
	}
	
	html +=`
	
			<form id="create-phone-form" method="post" action="/cards/${data.id}/phone">
				<input name="type" id="type">
				<br>
				<input required name="number" id="number" placeholder="###-###-###">
				<br>
				<button>Add this Phone Number</button>
			</form)
			
	`;
	
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

$('#create-card-form').on('submit', function (e) {
	
	//to prevent the default from submitting as JSON
	e.preventDefault();
//	console.log(e);
	
// Get the value for each element and build an object to send to JS
	
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
	
//	console.log(this.action);
//	console.log(payload);
	
	$.ajax(this.action, ajaxOptions)
		.done(function (card) {
			createListElement(card);
			
		})
//		.fail(function (error) {
//			console.log(error);
		.fail(error => console.error(error));
//		});
});


$(document).on('submit', '#create-phone-form', function (e){
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
//			console.log(data);
			fillInDetails(data);
		})
		
		.fail(error => console.error(error));
		
	
});


//Click Handler for the entire Webpage
$(document).on('click', 'a[data-card-id]', function (e) {
	// to prevent click event from following the Href #
	e.preventDefault();
	
	const cardId = $(this).data('cardId');
	
	
	
	$.getJSON(baseurl + '/' + cardId, function (data) {
// to set default when values are null
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
