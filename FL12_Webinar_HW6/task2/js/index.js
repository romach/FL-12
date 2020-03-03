const $list = $(".list");
const $input = $("#add-input");
const $add = $("#add-submit");

const todos = [
  {
    text: "Buy milk",
    done: false
  },
  {
    text: "Play with dog",
    done: true
  }
];

const removeCallback = function() {
  const todoIndex = $(".list li").index($(this).parent());
  todos.splice(todoIndex, 1);
  $(this)
    .parent()
    .remove();
};
$(".item-remove").click(removeCallback);

const doneCallback = function() {
  const todoIndex = $(".list li").index($(this).parent());
  todos[todoIndex].done = !todos[todoIndex].done;
  $(this)
    .parent()
    .find(".item-text")
    .toggleClass("done");
};
$(".item-text").click(doneCallback);

$add.click(function(event) {
  event.preventDefault();
  const newTodo = {
    text: $input.val(),
    done: false
  };
  todos.push(newTodo);
  $text = $(`<span class="item-text">${newTodo.text}</span>`);
  $text.click(doneCallback);
  $remove = $(`<button class="item-remove">Remove</button>`);
  $remove.click(removeCallback);
  $item = $(`<li class="item"></li>`);
  $item.append($text);
  $item.append($remove);
  $list.append($item);
  $("#add-input").val("");
});
