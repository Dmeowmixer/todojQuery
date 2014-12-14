$(function(){
  // Auto Load the save file!
  $.get("/items",function(todos){
    for(var i = 0; i < todos.length; i++){
      var isChecked = "";
      var checkedListItem = $('<li>', {
      });
      var checkBoxInput = $("<input type='checkbox'>");
      if(todos[i].completed==='true'){
        isChecked = "checked";
        // Trying to get line through if completed val == true
        checkedListItem.css("text-decoration", "line-through");
        checkBoxInput.attr('checked','checked');
      }
      checkedListItem.append(checkBoxInput);
      checkedListItem.append(todos[i].title);
      // this wouldn't put the checkBoxInput within the <li> field ? 
      $('ul').append(checkedListItem);
    }
  });
  $('.inputfield').keydown(function(e){
    console.log(e);
    if (e.keyCode == 13){
      var counter = 1;
      $('ul li').each(function(){
        counter++;
      });
      $('div.counter').html(counter + ' items left');
      var inputvalue = $('.inputfield').val();
      // var newListElement = $('<li>',{
      //   css: {"text-decoration": "line-through"}
      //   html: "test"
      // });
// create one element at a time
// use variables
      $('ul').append('<li>'+ '<input type="checkbox">'+inputvalue+'</li>');
      $(this).val("");
      var post_data = {
        new_item : {
          title : inputvalue,
          completed : false
        }
      } 
      $.post('/item', post_data ,function(data){ });
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
  // $('button.sync').on('click', function(e){
  //   var list = [];
  //   $('ul li').each(function (i, e){
  //     var object = { 
  //       title: $(e).text(),
  //       completed: $(e).find('input').prop('checked')
  //     };
  //     list.push(object);
  //   });
  //   var data = {
  //     list_to_save : JSON.stringify( list )
  //   };
  //   $.post('/save', data, function(d){

  //   });
  // });
});