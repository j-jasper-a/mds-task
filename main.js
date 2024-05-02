import "./style.scss";
import checkIcon from "/assets/images/icons/check-icon.svg";
import buttonIcon from "/assets/images/icons/menu-icon.svg";

const tasks = document.querySelector(".tasks__content");
const modalContainer = document.querySelector(".modal__container");

let data = [
  {
    title: "Call Katie",
    date: new Date(),
    location: "Dhaka, Bangladesh",
    isDone: false,
  },
  {
    title: "Email Cameron",
    date: new Date(),
    location: "Dhaka, Bangladesh",
    isDone: true,
  },
  {
    title: "Visit Michael",
    date: new Date(),
    location: "Dhaka, Bangladesh",
    isDone: false,
  },
  {
    title: "Call Anwar",
    date: new Date(),
    location: "Dhaka, Bangladesh",
    isDone: false,
  },
  {
    title: "Follow up with Tasnuva",
    date: new Date(),
    location: "Dhaka, Bangladesh",
    isDone: false,
  },
];

let isMenuOpenIndex = -1;

const createTask = (title, dateString, location, isDone, index) => {
  const date = new Date(dateString);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);

  const task = document.createElement("div");
  task.classList.add("tasks__content__item");

  const info = document.createElement("div");
  info.classList.add("tasks__content__item__info");

  const main = document.createElement("p");
  main.classList.add("tasks__content__item__info__main");
  main.textContent = title;
  info.appendChild(main);

  const sub = document.createElement("div");
  sub.classList.add("tasks__content__item__info__sub");
  const subDate = document.createElement("p");
  subDate.textContent = formattedDate;
  sub.appendChild(subDate);
  const subLocation = document.createElement("p");
  subLocation.textContent = location;
  sub.appendChild(subLocation);
  info.appendChild(sub);

  task.appendChild(info);

  const actions = document.createElement("div");
  actions.classList.add("tasks__content__item__actions");

  const check = new Image();
  check.src = checkIcon;
  check.classList.add("tasks__content__item__actions__check");
  isDone && actions.appendChild(check);

  const button = document.createElement("button");
  button.classList.add("tasks__content__item__actions__button");
  actions.appendChild(button);

  const buttonIconImg = new Image();
  buttonIconImg.src = buttonIcon;
  buttonIconImg.classList.add("tasks__content__item__actions__button__icon");
  button.appendChild(buttonIconImg);

  task.appendChild(actions);

  button.addEventListener("click", (event) => {
    event.stopPropagation();
    toggleMenu(index);
  });

  if (index === isMenuOpenIndex) {
    const menu = document.createElement("div");
    menu.classList.add("tasks__content__item__menu");

    const markAsDoneButton = document.createElement("button");
    markAsDoneButton.textContent = "Mark as Done";
    markAsDoneButton.classList.add("tasks__content__item__menu__button");
    markAsDoneButton.addEventListener("click", () => markAsDone(index));
    menu.appendChild(markAsDoneButton);

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.classList.add("tasks__content__item__menu__button");
    deleteButton.addEventListener("click", () => deleteTask(index));
    menu.appendChild(deleteButton);

    task.appendChild(menu);
  }

  return task;
};

const markAsDone = (index) => {
  data[index].isDone = !data[index].isDone;
  isMenuOpenIndex = -1;
  renderTasks();
};

const deleteTask = (index) => {
  data.splice(index, 1);
  isMenuOpenIndex = -1;
  renderTasks();
};

const toggleMenu = (index) => {
  isMenuOpenIndex = isMenuOpenIndex === index ? -1 : index;
  renderTasks();
};

const renderTasks = () => {
  tasks.innerHTML = "";

  data.forEach((item, index) => {
    const { title, date, location, isDone } = item;
    const task = createTask(title, date, location, isDone, index);
    tasks.appendChild(task);
  });
};

renderTasks();

document.addEventListener("click", (event) => {
  if (!event.target.closest(".tasks__content__item__menu")) {
    isMenuOpenIndex = -1;
    renderTasks();
  }
});

const showAddTaskModal = () => {
  modalContainer.style.display = "flex";
};

const tasksHeaderButton = document.querySelector(".tasks__header__button");
tasksHeaderButton.addEventListener("click", showAddTaskModal);

const closeModal = () => {
  modalContainer.style.display = "none";
};

const closeButton = document.querySelector(".modal__header__close");
closeButton.addEventListener("click", closeModal);

const saveNewTask = () => {
  const title = document.getElementById("task-title").value;
  const date = document.getElementById("task-date").value;
  const location = document.getElementById("task-location").value;

  data.push({
    title,
    date,
    location,
    isDone: false,
  });

  closeModal();
  renderTasks();
};

const saveButton = document.querySelector(".modal__footer__save");
saveButton.addEventListener("click", saveNewTask);

const cancelNewTask = () => {
  closeModal();
};

const cancelButton = document.querySelector(".modal__footer__cancel");
cancelButton.addEventListener("click", cancelNewTask);
