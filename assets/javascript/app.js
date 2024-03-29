$(document).ready(function () {


    let topics = ["music", "hiking", "travel", "beer", "Avengers Movies", "Star Wars"]

    console.log(topics);


    //a function to create the button
    function createButton(topic) {

        let button = $("<button>").text(topic);
        button.attr("data-topic", topic);
        button.attr("class", "btn btn-primary topic-button");
        $(".buttons-original").append(button);

    };

    // a loop to generate a button for each item in my array

    for (let i = 0; i < topics.length; i++) {
        console.log(topics[i]);
        createButton(topics[i]);

    };

    //function to display gif
    function displayGif() {

        let selectedTopic = $(this).attr("data-topic");
        let queryUrl = "https://api.giphy.com/v1/gifs/search?q=" + selectedTopic + "&api_key=MuPhBJu226KIzGhBU9WD0dnZcrfS8DZF&limit=10";

        // Ajax call
        $.ajax({ url: queryUrl, method: "GET" }).done(function (response) {
            // Empty div holding previous Gifs
            $('.gifContainer').empty();

            for (let i = 0; i < response.data.length; i++) {
                // Variables to add HTML elements and standardize images generated by buttons
                let gifDiv = $('<div class="gifDiv">');
                let rating = response.data[i].rating;
                let ratingDiv = $('<p>').html("Rating: " + rating);
                let animated = response.data[i].images.fixed_height.url;
                let still = response.data[i].images.fixed_height_still.url;
                let gifImg = $('<img class="gImage">');

                // Default to still
                gifImg.attr('src', still);
                gifImg.attr('data-still', still);
                gifImg.attr('data-animate', animated);
                gifImg.attr('data-state', 'still')

                // Show ratings
                gifDiv.append(ratingDiv);
                gifDiv.prepend(gifImg);
                $('.gifContainer').prepend(gifDiv);


            }
        });

    };

        // Onclick function to animate/pause gifs
        $('.gifContainer').on("click", ".gImage", function () {

            let state = $(this).attr('data-state');
            // If state = still, on click will animate the gif
            if (state == 'still') {
                $(this).attr('src', $(this).data('animate'));
                $(this).attr('data-state', 'animate');
            }
            // Otherwise, if state != still, gif will pause on click   
            else {
                $(this).attr('src', $(this).data('still'));
                $(this).attr('data-state', 'still');
            }
        });

    
        $(document).on("click", ".topic-button", displayGif);

});