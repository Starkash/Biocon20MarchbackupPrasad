const dropdown = document.querySelector(".search__dropdown");

dropdown.addEventListener("click", function(e){
   e.stopPropagation();
   $('body').addClass("search-options");
});

$(document).click(function(){
   $('body').removeClass("search-options");
 });

 $('.item').on("click", function(){
   let imgSrc = $(this).find('img').attr('src');
   let searchType = $(this).find('img').attr("data-search-type");
   let temp = $(this).parent().parent().prev().find('.selected-search').attr("src");
   let tempData = $(this).parent().parent().prev().find('.selected-search').attr("data-search-type");
   
  $(this).parent().parent().prev().find('.selected-search').attr("src", imgSrc);
  $(this).parent().parent().prev().find('.selected-search').attr("data-search-type", searchType);
  $(this).find('img').attr('src', temp);
  $(this).find('img').attr("data-search-type", tempData);
 });

 $('.menu').on('click', function(){
   $('body').addClass('menu-expand');
 });

 $('.menu-close').on('click', function(){
   $('body').removeClass('menu-expand');
 });

 $('.overlay').on('click', function(){
   $('body').removeClass('menu-expand');
 })

 function checkWidgetsLength() {
   var len = $('.widgets-container > .widget').length;
   if(len === 4 || len === 2) {
    $('.widgets-container').removeClass().addClass('row widgets-container four-layout');
   }
   else if(len === 5) {
    $('.widgets-container').removeClass().addClass('row widgets-container five-layout');
   } 
   else {
    $('.widgets-container').removeClass().addClass('row widgets-container default-layout');
   }  
 }

 $(document).ready(function(){
  $('.promotion-slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    appendArrows: $('#promotion-slider-btn'),
    prevArrow:'<span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    nextArrow:'<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>'
  });
  
  $('.container-management').slick({
    arrows: true,
    dots: false,
    infinite: true,
    prevArrow:'<span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    nextArrow:'<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>'
  });

  $('.main-slider').slick({
    arrows: true,
    dots: false,
    infinite: true,
    prevArrow:'<span><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    nextArrow:'<span><i class="fa fa-chevron-right" aria-hidden="true"></i></span>',
    responsive: [
      
      {
        breakpoint: 767,
        settings: {
          infinite: true,
          dots: true,
          arrows: false
        }
      },
      
    ]
  });
  

  $('.promotion-slider-nested1, .promotion-slider-nested2').slick({
    arrows: true,
    dots: false,
    edgeFriction: .5,
    infinite: false,
    verticalSwiping: true,
    prevArrow:'<span class="prev"><i class="fa fa-chevron-left" aria-hidden="true"></i></span>',
    nextArrow:'<span class="next"><i class="fa fa-chevron-right" aria-hidden="true"></i></span>'
  });

  checkWidgetsLength();
  
});