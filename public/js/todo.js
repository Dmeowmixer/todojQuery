$(function(){
  $('.inputfield').keydown(function(e){
    console.log(e);
    if (e.keyCode == 13){
      
  var counter = 1;
  $('ul li').each(function(){
      counter++;
  });
  $('div.counter').html(counter + ' items left');
      var inputvalue = $('.inputfield').val();

      $('ul').append('<li>'+ '<input type="checkbox">'+inputvalue+'</li>');
      $(this).val("");
    }
  });
  var countertwo = 0;
  $('body').on("click",":checkbox",function(){
    if (this.checked){
      $(this).parent().css("text-decoration", "line-through");
      countertwo++;
      $('div.completed').html(countertwo + ' items completed');
    }
    else{
      $(this).parent().css("text-decoration", "none");
      countertwo--;
      $('div.completed').html(countertwo + ' items completed');
    }
  })


  $('button.sync').on('click', function(e){
    var list = [];
    $('ul li').each (function (i, e){
      var object = { 
        title: $(e).text(),
        completed: $(e).find('input').prop('checked')
      };
      list.push(object);
    });
    var data = {
      list_to_save : JSON.stringify( list )
    };
    $.post('/save', data, function(d){

    });
  });
});