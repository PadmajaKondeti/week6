// Initial array of animals
var movies = ['dogs', 'cats','parrots'];
// displayAnimalInfo function now re-renders the HTML
// to display the appropriate content. 
function displayAnimalInfo(){
	var animal = $(this).attr('data-name');
	 https://github.com/Giphy/GiphyAPI#search-endpoint
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="
	 + animal + "&limit=5&rating=pg&fmt=json";
	 // Creates AJAX call for the specific animal being 
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
					console.log(response);
	var animalDiv = $('<div class="animal">');
	// Creates a generic div to hold the movie

	// Retrieves the Rating Data
	var rated = response.rating;
	// Creates an element to have the rating displayed
	var pOne= $('<p>').text("Rating: "+response.rating);
	animalDiv.append(pOne);
	// Creates an element to hold the plot
	//var pTwo = $('<p>').text("Plot: " + plot);
	// Appends the plot
	//movieDiv.append(pTwo);
	// Creates an element to hold the image 
	var image = $('<img>').attr("src", response.fixed_width_still['url']);
	console.log(image);
	// Appends the image
	movieDiv.append(image);
	// Puts the entire Movie above the previous movies.
	$('#moviesView').prepend(animalDiv);
});

}