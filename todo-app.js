let listObj

function createAppTitle(title) {
  let appTitle = document.createElement("h2");
  appTitle.innerHTML = title;
  return appTitle;
}

function createTodoItemForm() {
  let form = document.createElement("form");
  let input = document.createElement("input");
  let buttonWrapper = document.createElement("div");
  let button = document.createElement("button");
  
  button.disabled = true;
  form.classList.add("input-group", "mb-3");
  input.classList.add("form-control");
  input.placeholder = "Введите название нового дела";
  buttonWrapper.classList.add("input-group-append");
  button.classList.add("btn", "btn-primary");
  button.textContent = "Добавить дело";
  buttonWrapper.append(button);
  form.append(input);
  form.append(buttonWrapper);
  input.addEventListener("input", ()=> {
    if (input.value !== "") {
      button.disabled = false;
    } else button.disabled = true;    
  })
  return {
    form,
    input,
    button,
  };
}

function createTodoList() {
  let list = document.createElement("ul");
  list.classList.add("list-group");
  return list;
}

function createTodoItem(name,done = false) {
  let item = document.createElement("li");
  // кнопки помещаем в элемент, который красиво покажет их в одной группе
  let buttonGroup = document.createElement("div");
  let doneButton = document.createElement("button");
  let deleteButton = document.createElement("button");

  // устанавливаем стили для элемента списка, а также для размещения кнопок
  // в его правой части с помощью flex
  item.classList.add(
    "list-group-item",
    "d-flex",
    "justify-content-between",
    "align-items-center"
  );
  item.textContent = name;

  buttonGroup.classList.add("btn-group", "btn-group-sm");
  doneButton.classList.add("btn", "btn-success");
  doneButton.textContent = "Готово";
  deleteButton.classList.add("btn", "btn-danger");
  deleteButton.textContent = "Удалить";
  if (done) {
    item.classList.add("list-group-item-success")
  }

  // вкладываем кнопки в отдельный элемент, чтобы они объединились в один блок
  buttonGroup.append(doneButton);
  buttonGroup.append(deleteButton);
  item.append(buttonGroup);

  // приложению нужен доступ к самому элементу и кнопкам, чтобы обрабатывать события нажатия
  return {
    item,
    doneButton,
    deleteButton,
  };
}

function createTodoApp(container,title = 'Список дел',list = []) {
  listObj = list
  let todoAppTitle = createAppTitle(title);
  let todoItemForm = createTodoItemForm();
  let todoList = createTodoList();
  if (!listObj.length == 0) {
    listObj.forEach(el => {
      let itemList = createTodoItem(el.name,el.done)
      itemList.doneButton.addEventListener("click", function () {
        itemList.item.classList.toggle("list-group-item-success");
      })
      itemList.deleteButton.addEventListener("click", function () {
        if (confirm("Bы уверены?")) {
          itemList.item.remove();
        }
      })
      todoList.append(itemList.item);
    })
  }
  container.append(todoAppTitle);
  container.append(todoItemForm.form);
  container.append(todoList);

  todoItemForm.form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!todoItemForm.input.value) {
      return;
    }

    let todoItem = createTodoItem(todoItemForm.input.value);

    // добавляем обработчики на кнопки
    todoItem.doneButton.addEventListener("click", function () {
      todoItem.item.classList.toggle("list-group-item-success");
    });
    todoItem.deleteButton.addEventListener("click", function () {
      if (confirm("Bы уверены?")) {
        todoItem.item.remove();
      }
    });

    todoList.append(todoItem.item);
    todoItemForm.input.value = "";
    todoItemForm.button.disabled = true
  });
}


window.createTodoApp = createTodoApp