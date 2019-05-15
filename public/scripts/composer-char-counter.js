$(document).ready(function() {
 
    
    $("textarea").keydown(function(){
        let count = 0
        count = $("textarea").val().length
        if (count > 140) {
        $(".counter").text(140 - count).css({color: 'red'})            
        } else {
        $(".counter").text(140 - count).css({color: 'green'})
        }
        
    })
    
    // button.on("click", function(event){
    //     event.preventDefault();
    //     const input = $("input[name =content");
    //     const content = 
    // })
    
    
    




});



