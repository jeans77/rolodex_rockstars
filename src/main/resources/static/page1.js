const baseurl = 'http://localhost:8080/cards';

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
		
		`)
//		console.log('Data for: ', cardId, 'is', data);
	});
//	console.log('The you clicked on is : ' , this);
//	console.log(typeOf cardId);
});

$.getJSON(baseurl,function (data) {
	if (data.length) {
		for (let card of data) {
			$('<li></li>')
			.html('<a href="#" data-card-id="' + card.id + '">' + card.lastName + ', ' + card.firstName + '</a>')
			.appendTo($('#card-list'));
		}
		
	} else {
		$('<li></li>')
		.css('color', 'red')
		.html('You Have no Rolodex Data.')
		.appendTo($('#card-list'));
	}
	console.log('List Rolodex Data if Available');
});
