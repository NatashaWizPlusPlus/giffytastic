$(document).ready (function(){

//Array of topics
var topics =["dogs", "giraffes", "elephants" ];

//The Query URL from Giphy
var queryURL = "http://api.giphy.com/v1/gifs/search?q=funny+dogs&api_key=dc6zaTOxFJmzC"

//Display the giphy image
function displayAnimalGifs(){
	$('#giphy-views').empty();
	//create a var that will equal to the attribute data name
	var animal = $(this).attr("data-name");
	var limits = '&limit=10';
    var APIKey = '&api_key=dc6zaTOxFJmzC';
    var queryURL= "http://api.giphy.com/v1/gifs/search?q=" + animal + limits + APIKey;
	//Set the Ajax info to get information from Giphy
	$.ajax({
		url: queryURL,
		method: "GET",
	}).done(function(response) {
		for(var j=0; j<=10; j++){
		// Create a div to hold the animal
		var animalDiv = $("<div class ='animal'>");
		

			
			// Storing the rating data
		    var rating = response.data.rating;
		    // Creating an element to have the rating displayed
		    var rate = $("<p>").text("Rating: " + rating);
			// Displaying the rating
		   	animalDiv.append(rate);

		   	
		   	// Retrieving the URL for the gif
		    var imgURL = response.data[j].images.downsized.url;

			// Creating an element to hold the image
		    var image = $('<img>').attr("src", imgURL);

			// Appending the image
			animalDiv.prepend(image);


          // Putting the entire giphy row above the previous giphys
          $("#giphy-views").append(animalDiv);
	}

});

}

// Function for displaying giphy data
      function render() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise you will have repeat buttons)
        $("#button-view").empty();

        // Looping through the giphy array
        for (var i = 0; i < topics.length; i++) {

          // Then dynamicaly generating buttons for each giphy in the array
          // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of giphy to our button
          a.addClass("giphy-class");
          // Adding a data-attribute
          a.attr("data-name", topics[i]);
          // Providing the initial button text
          a.text(topics[i]);
          // Adding the button to the buttons-view div
          $("#button-view").append(a);
        }
      }

 // This function handles events where a giphy button is clicked
      $("#add-animal").on("click", function(event) {
        event.preventDefault();
        // This line grabs the input from the textbox
        var animal1 = $("#animal-input").val().trim();

        // Adding movie from the textbox to our array
        topics.push(animal1);

        // Calling renderButtons which handles the processing of our giphy array
        render();
      });

      // Adding a click event listener to all elements with a class of "movie"
      $(document).on("click", ".giphy-class", displayAnimalGifs);

      // Calling the renderButtons function to display the intial buttons
      render();

});