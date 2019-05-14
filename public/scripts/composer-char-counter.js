$(document).ready(function() {
    console.log("HELLO!")
    
    $("textarea").keyup(function(){
        let count = 0
        count = $("textarea").val().length
        if (count > 140) {
        $(".counter").text(140 - count).css({color: 'red'})            
        } else {
        $(".counter").text(140 - count).css({color: 'green'})
        }
        
    })
    
    
    
    




});



