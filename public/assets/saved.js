$(document).ready(function () {

    getAllNews();

    $("#main").on('click', '.delete', function() {

        $.ajax({
            url: "/article/" + this.id,// The URL for the request
            data: {},// The data to send (will be converted to a query string)
            type: "DELETE",// Whether this is a POST or GET request
            dataType: "json",// The type of data we expect back
        })
        .done(function (json) {
            console.log(json)
            //var $div = $(div);
        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            //console.dir(xhr);
        })
        // Code to run regardless of success or failure;
         .always(function (xhr, status) {
            $("#main").empty();
             getAllNews();
        // });
        });

    });

    function getAllNews(){
        $.ajax({
            url: "/articles",// The URL for the request
            data: {},// The data to send (will be converted to a query string)
            type: "GET",// Whether this is a POST or GET request
            dataType: "json",// The type of data we expect back
        })
        .done(function (json) {
            console.log(json[0])
            for (let i = 0; i < json.length; i++) {
                const element = json[i];
               let item = `<div class="card mb-2" >
                <div class="card-body">
                    <h5 class="card-title">${json[i].headLine}</h5>
                    <p class="card-text">${json[i].summary}</p>
                    <a href="${json[i].link}" class="card-link">link</a>
                    <br>
                    <button id="${json[i]._id}" class="btn btn-danger delete">Delete</button>
                    <button type="button" id="${json[i]._id}" class="btn btn-primary add rounded-0" data-toggle="modal" data-target="#Employee">Add Comments</button>  
                </div>
                </div>`
                $("#main").append(item);
            }
            
            //var $div = $(div);
        })
        // Code to run if the request fails; the raw request and
        // status codes are passed to the function
        .fail(function (xhr, status, errorThrown) {
            alert("Sorry, there was a problem!");
            console.log("Error: " + errorThrown);
            console.log("Status: " + status);
            //console.dir(xhr);
        })
        // Code to run regardless of success or failure;
         .always(function (xhr, status) {
             //alert("The request is complete!");
        // });
        });
    }

    

    $('#main').on('click', '.add', function () {
        _article_id = this.id;

        console.log('hello');
        console.log(_article_id);
    });

    var _article_id;

    var form = document.getElementById('needs-validation');  
    form.addEventListener('submit', function (event) {  
        // if (form.checkValidity() === false) {  
        //     event.preventDefault();  
        //     event.stopPropagation();  
        // }  
        form.classList.add('was-validated');  
        
        

        console.log(_article_id);
        console.log('_article_id');
    }, false); 



});