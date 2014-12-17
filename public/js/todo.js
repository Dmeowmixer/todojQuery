// $(function(){
//   function click_delete_item_handler(){
//     click: function (e){
//       var button = $(e.currentTarget);
//       var object_id = button.closest("li").data("object-id");
//       $.ajax('/items/'+ object_id, 
//       { type:"DELETE",
//       success :function(data){
//         console.log('data',data);
//       }
//     })
//   }
//   }
//   // Auto Load the save file!
//   $.get("/items",function(todos){
//     for(var i = 0; i < todos.length; i++){
//       var isChecked = "";
//       var checkedListItem = $('<li>', {
//         "data-object-id" : todos[i]._id
//       });

//       var checkBoxInput = $("<input type='checkbox'>");
//       if(todos[i].completed==='true'){
//         isChecked = "checked";
//         // Trying to get line through if completed val == true
//         checkedListItem.css("text-decoration", "linethrough");
//         checkBoxInput.attr('checked','checked');
//       }
//       var list_delete = $('<button>', {
//         text:"[delete]",
//         click : click_delete_item_handler
//         // click: function (e){
//         //   var button = $(e.currentTarget);
//         //   var object_id = button.closest("li").data("object-id");
//         //   $.ajax('/items/'+ object_id, 
//         //     { type:"DELETE",
//         //     success :function(data){
//         //       console.log('data',data);
//         //     }
//         //   })
//         // }
//       })
//       if(todos.completed==="true"){
//         checkBoxInput.attr("checked","checked");
//       }
//       checkedListItem
//       .append(checkBoxInput)
//       .append(list_delete);
//       checkedListItem.append(checkBoxInput);
//       checkedListItem.append(todos[i].title);
//       // this wouldn't put the checkBoxInput within the <li> field ? 
//       $('ul').append(checkedListItem);
//     }

//   });

//   //  Keydown event if key == 13 (enter) 
//   $('.inputfield').keydown(function(e){
//     if (e.keyCode == 13){
//       var counter = 0;
//       $('ul').each(function(){
//         counter++;
//       });
//       $('div.counter').html(counter + ' items left');
//       var inputvalue = $('.inputfield').val();
//       $('ul').append('<li>',{
//         class : "list_items",
//         "data-object-id" : ""
//         // list_items[i]._id
//       });
//       $('li').append('<input type="checkbox">'+inputvalue);
//       var delete_button = $('<button>', {
//         text: "[x]",
//         click : function (e) {
//           var button = $(e.currentTarget.data("object-id"));
//         }
//       })
//       $(this).val("");
//       var post_data = {
//         new_item : {
//           title : inputvalue,
//           completed : false
//         }
//       } 
//       $.post('/item', post_data ,function(data){ });
//     }
//   });
//   var countertwo = 0;
//   $('body').on("click",":checkbox",function(){
//     if (this.checked){
//       $(this).parent().css("text-decoration", "linethrough");
//       countertwo++;
//       $('div.completed').html(countertwo + ' items completed');
//     }
//     else{
//       $(this).parent().css("text-decoration", "none");
//       countertwo--;
//       $('div.completed').html(countertwo + ' items completed');
//     }
//   })
//   // $('button.sync').on('click', function(e){
//   //   var list = [];
//   //   $('ul li').each(function (i, e){
//   //     var object = { 
//   //       title: $(e).text(),
//   //       completed: $(e).find('input').prop('checked')
//   //     };
//   //     list.push(object);
//   //   });
//   //   var data = {
//   //     list_to_save : JSON.stringify( list )
//   //   };
//   //   $.post('/save', data, function(d){

//   //   });
//   // });
// });


$(function(){
  // Items finished counter
  var taskcompleted = 0;
  // Items left function 
  function updatenum(){
    var total = $('.listitems');
    return total.length + " items left";
  }
  // End of updatenum function

  // Enter keydown event start
  $('.inputfield').keydown(function(e){
    if (e.keyCode == 13){
      var checkBoxInput = $("<input>",{
        class:"checkBox",
        type:"checkbox",
        checked:false,

        // Checkbox check click event text deco line-through

        change: function(e){
          var checkBox = $(e.currentTarget);
          var parentLi = checkBox.closest("li");
          if(checkBox.prop("checked")){
            // it is checked
            parentLi.css("text-decoration", "line-through");
            taskcompleted++;
          }
          else{
            // it is NOT checked
            parentLi.css("text-decoration", "none");
            taskcompleted--;
          }
          $('div.completed').html(taskcompleted + " items finished");
        }
      });
      //  End of check change function

      var inputvalue = $('.inputfield').val();

      var newListItem = $('<li>',{
        class: "listitems",
        text: inputvalue
      });

      var counterdiv = $('<div>',{
        class:"listdiv"
      });
      // Appends checkbox
      newListItem.prepend(checkBoxInput);
      // Appends List items to main UL
      $('ul').append(newListItem);
      // Appends items left function to Div
      counterdiv.append(updatenum);
      // Adds and wipes counter to main div
      $('div.counter').html(counterdiv);
    };
    // Ends IF block
  });
  // Ends enter keydown function
  $('button.sync').on('click',function (e){
    $.post("./save",  function (d){
        console.log( "data loaded " + data);
    });
  });
    // $.Post End
  
  // End of button Sync
});
