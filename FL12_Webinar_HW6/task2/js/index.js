const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $search = $("#search-input");

const todos = [];

$add.click(function(event) {
  event.preventDefault();
  const newTodo = {
    text: $input.val(),
    done: false
  };
  $list.append($('<li class="item"></li>').todoItem(todos, newTodo));
  $("#add-input").val("");
});

$search.keyup(function({ target: { value: searchedText } }) {
  if (searchedText.trim().length === 0) {
    $list.children().show();
  } else {
    $list.children().each(function() {
      if ($(this).todoHasText(searchedText)) {
        $(this).show();
      } else {
        $(this).hide();
      }
    });
  }
});

(function($) {
  $.fn.todoItem = function(todos, currentTodo) {
    const getCurrentTodoIndex = () =>
      this.parent()
        .children()
        .index(this);
    todos.push(currentTodo);
    $text = $(`<span class="item-text">${currentTodo.text}</span>`);
    $text.click(() => {
      const todoIndex = getCurrentTodoIndex();
      todos[todoIndex].done = !todos[todoIndex].done;
      this.find(".item-text").toggleClass("done");
    });
    $remove = $(`<button class="item-remove">Remove</button>`);
    $remove.click(() => {
      const todoIndex = getCurrentTodoIndex();
      todos.splice(todoIndex, 1);
      this.remove();
    });
    this.append($text);
    this.append($remove);
    return this;
  };
  $.fn.todoHasText = function(text) {
    return this.find(".item-text")
      .text()
      .includes(text);
  };
})(jQuery);
