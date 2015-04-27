var accessToken = '546e71022cee4faf84dc01167fe9d400';
var image_jsonData;
var image_jsonData_length;
var window_h = $(window).height();
var count = 1;
var image_height = 640;

$(window).scroll(function (event) {
    var scroll = $(window).scrollTop();
    //user scrolls down the page enough to bring them inside the visible viewport region to load the subsequent image
    if (scroll > window_h + (count - 1) * image_height - 450 && count < image_jsonData_length) {
        var id = "#image" + count;
        $(id).attr('src', image_jsonData[count].images.standard_resolution.url);
        count = count + 1;
    }   
});

$.ajax({
    url: 'https://api.instagram.com/v1/tags/nofilter/media/recent?',
    dataType: 'jsonp',
    type: 'GET',
    data: {client_id: accessToken},
    success: function(data) {
        image_jsonData = data.data;
        image_jsonData_length = image_jsonData.length;
        for (x in data.data) {
            var id="image"+x
            //create placeholder of all images of same size
            $('.page').append('<img class="lazy" id="'+id+'" width="640" height="640"> <br/>');
        }
        //load the first image
        $('#image0').attr('src', image_jsonData[0].images.standard_resolution.url);

    },
    error: function(data){
        console.log(data);
    }
});