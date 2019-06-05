$.ajax({
    url: "/data",
    success: function(data) {
        $('.box').html(data)
    }
})