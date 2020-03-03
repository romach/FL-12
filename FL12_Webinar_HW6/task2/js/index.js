(function($) {
  $.fn.todoItem = function(todos, currentTodo, updateHandler) {
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
      updateHandler();
    });
    $remove = $(`<button class="item-remove">Remove</button>`);
    $remove.click(() => {
      const todoIndex = getCurrentTodoIndex();
      todos.splice(todoIndex, 1);
      this.remove();
      updateHandler();
    });
    this.append($text);
    currentTodo.done && this.find(".item-text").addClass("done");
    this.append($remove);
    return this;
  };
  $.fn.todoHasText = function(text) {
    return this.find(".item-text")
      .text()
      .includes(text);
  };
})(jQuery);

const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");
const $search = $("#search-input");

const saveToLocalStorage = () => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

const todos = [];
const todosFromLocalStorage = localStorage.getItem("todos")
  ? JSON.parse(localStorage.getItem("todos"))
  : [];
todosFromLocalStorage.forEach(todo => {
  $list.append(
    $('<li class="item"></li>').todoItem(todos, todo, saveToLocalStorage)
  );
});

$add.click(function(event) {
  event.preventDefault();
  const newTodo = {
    text: $input.val(),
    done: false
  };
  $list.append(
    $('<li class="item"></li>').todoItem(todos, newTodo, saveToLocalStorage)
  );
  $("#add-input").val("");
  saveToLocalStorage();
});

$search.keyup(function(event) {
  const searchedText = event.target.value.trim();
  if (searchedText.length === 0) {
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
