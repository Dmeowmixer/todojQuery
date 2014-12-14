$(function(){
// Auto Load the save file
var linethrough = .css("text-decoration", "linethrough");
  $.get("/todo.txt",function(d){
    var list_items = jQuery.parseJSON(d);
    for (var i = 0; i < list_items[i].length; i++){
      var isChecked = "";
      if(list_items[i].completed){
        isChecked = "checked";
        // Trying to get line through if completed val == true
        $(this).linethrough;
      }
      var checkedListItem = $('<li>', {
        class = "checked";
      });
      var checkBoxInput = $("<input type='checkbox'>")
      // this wouldn't put the checkBoxInput within the <li> field ? 
      $('ul').append(checkedListItem + checkBoxInput + isChecked+ list_items[i].title+list_items.completed+);
    }
  });
  $('.inputfield').keydown(function(e){
    if (e.keyCode == 13) {
      var counter = 1;
      $('ul li').each(function() {
        counter++;
      });
      var inputValue = $('.inputfield').val();
      var newListItem = $('<li>')
      $('ul').append(newListItem);
      newListItem.append(checkBoxInput + inputValue);
      $(this).val("")
    }
  });
  var countertwo = " ";
  $('body').on("click", ":checkbox", function (){
    if (this.checked){
      $(this).parent().linethrough;
      countertwo++;
      $('div.completed').html(countertwo + ' items completed');
    };
    else {
      $(this).parent().css("text-decoration", none);
      countertwo--
      $('div.completed').html(countertwo + ' items_completed');
    };
  });
  $('button.sync').on('click', function (e){
    var list = [];
    $('ul li').each(function (i, e){
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