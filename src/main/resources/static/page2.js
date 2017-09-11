const baseurl = 'http://localhost:8080/cards';

function createListElement(card) {
	
	$('<li></li>')
	.html(`
		<a href="#" data-card-id="${card.id}">
			${card.lastName}, ${card.firstName}
		</a>
		
		<form method="post" action="/cards/${card.id}">
			<button>Delete</button
		</form>
		
		`)
	.appendTo($('#card-list'));
	
}

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


//Click Handler for the entire Webpage
$(document).on('click', 'a[data-card-id]', function (e) {
	// to prevent click event from following the Href #
	e.preventDefault();
	
	const cardId = $(this).data('cardId');
	
	$.getJSON(baseurl + '/' + cardId, function (data) {
// to set default when values are null
		data.company = data.company || '<i>no company speified</i>';
		
		$('#card-detail')
		.html(`
		
		<h1>${data.lastName} ${data.firstName}</h1>
		<h2>${data.company}</h2>
		<div>Title: ${data.title}</div>
//		<img src=
		
		`)
//		console.log('Data for: ', cardId, 'is', data);
	});
//	console.log('The you clicked on is : ' , this);
//	console.log(typeOf cardId);
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
