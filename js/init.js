$(function(){
 var mult = 2; // Ratio of page size to window size
 var $filler = $('#filler');
 $filler.width(mult*100+'%')
        .height(mult*100+'%');
        


 var $doc = $(document);
 var $window = $(window);
 $doc.scrollTop($window.height() * (mult-1) / 2)
     .scrollLeft($window.width() * (mult-1) / 2);


});