$(function(){
  $('.inputfield').keydown(function(e){
    console.log(e);
    if (e.keyCode == 13){
      console.log(e.currentTarget);
      var inputvalue = $('.inputfield').val();
      $('ul').append('<li>'+inputvalue+'</li>');
    function fillField(input,val){
      if(input.val == ""){
        input.val = input.val;
      }
    };
    function clearField(input,val){
      if(input.val == val){
        input.val = "";
      }
    };
    }
  });
});