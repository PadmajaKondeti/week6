var animals = ['dogs', 'cats','parrots'];

// displayAnimalInfo function now re-renders the HTML
// to display the appropriate content. 
function displayAnimalInfo(){
	var animal = $(this).attr('data-name');
	$('#animalsView').empty();
	var queryURL = "http://api.giphy.com/v1/gifs/search?api_key=dc6zaTOxFJmzC&q="
	 + animal + "&limit=5&rating=pg&fmt=json";
	 // Creates AJAX call for the specific animal being 
	$.ajax({url: queryURL, method: 'GET'}).done(function(response) {
		var animalDiv = $('<div class="animalDiv">');
		
		// Creates a generic div to hold the animal
		for (var i = 0; i < response.data.length; i++){
			var gifBlock = $('<div class="gifBlock">');
		// Retrieves the Rating Data
			var rating = response.data[i].rating;
			
			// Creates an element to have the rating displayed
			var pOne= $('<p>').text("Rating: "+rating);
			gifBlock.append(pOne);
			// Creates an element to hold the image 
			var image = $('<img>').attr({
				"data-still": response.data[i].images.fixed_height_still.url,
				"data-animate": response.data[i].images.fixed_height.url,
				"data-state": "still",
				"src": response.data[i].images.fixed_height_still.url,

			}).addClass("animalImage img-thumbnail");
			
			//animalDiv.append("<div class='gifBlock'>"+pOne+image+"</div>");
			gifBlock.append(image);
			animalDiv.append(gifBlock);
			// Puts the entire animal above the previous animals.
		};
		$('#animalsView').prepend(animalDiv);
	});
	return false;
};
// Generic function for displaying animal data 
function renderButtons(){ 
	// Deletes the animals prior to adding new animals (this is necessary otherwise you will have repeat buttons)
	$('#buttonsView').empty();
	// Loops through the array of animals
	for (var i = 0; i < animals.length; i++){
		// Then dynamicaly generates buttons for each animal in the array
		// Note the jQUery syntax here... 
	    var a = $('<button>') // This code $('<button>') is all jQuery needs to create the beginning and end tag. (<button></button>)
	    a.addClass('animalButton'); // Added a class 
	    a.attr('data-name', animals[i]); // Added a data-attribute
	    a.text(animals[i]); // Provided the initial button text
	    $('#buttonsView').append(a); // Added the button to the HTML
	}
};
$(document).ready(function(){
	// This function handles events where one button is clicked
	$('#addAnimal').on('click', function(){
		debugger
		//if ($('animal-input').val().trim().length >0){
			// This line of code will grab the input from the textbox
			var animal = ($('#animal-input').val()).trim();
			if (animal.length > 0 ){
				// The animal from the textbox is then added to our array
				animals.push(animal);
				// Our array then runs which handles the processing of our animal array
				renderButtons();
				// We have this line so that users can hit "enter" instead of clicking on ht button and it won't move to the next page
				return false;
			} else {
				alert("please enter your favorite animal")
			};
	})
	// ========================================================
	// Generic function for displaying the animalInfo
	$(document).on('click', '.animalButton', displayAnimalInfo);

	// ========================================================
	// This calls the renderButtons() function
	renderButtons();
	$(document).on('click','.animalImage', function(event){
		//event.stopPropagation();
		var state = $(this).attr('data-state');
		if ( state == 'still'){
            $(this).attr('src', $(this).data('animate'));
            $(this).attr('data-state', 'animate');
          	
        }else{
            $(this).attr('src', $(this).data('still'));
            $(this).attr('data-state', 'still');
           
        }
        //return false;
     });
})