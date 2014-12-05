$(function(){
  $('.inputfield').keydown(function(e){
    console.log(e);
    if (e.keyCode == 13){

      var inputvalue = $('.inputfield').val();

      $('ul').append('<li>'+ '<input type="checkbox">'+inputvalue+'</li>');
      $(this).val("");

    }
  });
});