const form = document.querySelector("form"),
  studentTemp = document.querySelector("#student-temp").content,
  teacherTemp = document.querySelector("#teacher-temp").content,
  studentCards = document.querySelector("#student-cards"),
  teacherCards = document.querySelector("#teacher-cards"),
  students = [],
  teachers = [];

  document.addEventListener('click', e => {
    if (e.target.dataset.name) {
      if(e.target.matches('.btn-success')) {
        students.map( item => {
          if (item.name === e.target.dataset.name) {
            item.setState = true
          }
          return item  
        })
        Person.showPersonUI(students, 'Student')
      }
      if(e.target.matches('.btn-danger')) {
        students.map( item => {
          if (item.name === e.target.dataset.name) {
            item.setState = false
          }
          return item  
        })
        Person.showPersonUI(students, 'Student')

      }
    }
  })

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = new FormData(form);
  const [name, age, option] = [...data.values()];

  if (option === "Student") {
    const student = new Student(name, age);
    students.push(student);
    Person.showPersonUI(students, option)
  }
  if (option === "Teacher") {
    const teacher = new Teacher(name, age);
    teachers.push(teacher);
    Person.showPersonUI(teachers, option)
  }
});

class Person {
  constructor(name, age) {
    (this.name = name), (this.age = age);
  }
  static showPersonUI(persons, type) {
    if (type === "Student") {
      studentCards.textContent = "";
      const fragment = document.createDocumentFragment();
      persons.forEach((item) => {
        fragment.appendChild(item.addNewStudent());
      });
      studentCards.appendChild(fragment);
    }
    if (type === "Teacher") {
      teacherCards.textContent = "";
      const fragment = document.createDocumentFragment();
      persons.forEach((item) => {
        fragment.appendChild(item.addNewTeacher());
      });
      teacherCards.appendChild(fragment);
    }
  }
}

class Student extends Person {
  #state = false;
  #student = "Student";

  set setState(state) {
    this.#state = state;
  }
  get getStudent() {
    return this.#student;
  }
  addNewStudent() {
    const clone = studentTemp.cloneNode(true);
    clone.querySelector("h5 .text-primary").textContent = this.name;
    clone.querySelector("p").textContent = this.age;
    clone.querySelector("h6").textContent = this.getStudent;
    if(this.#state === true ) {
      clone.querySelector('.badge').className = 'badge bg-success';
      clone.querySelector('button').className = 'btn btn-success disabled';

    }else {
      clone.querySelector('.badge').className = 'badge bg-danger';
      clone.querySelector('.btn-danger').className = 'btn btn-danger disabled';
    }
    clone.querySelector('.badge').textContent = this.#state ? 'Aproved' : 'Dissaproved';

    clone.querySelector('button').dataset.name = this.name;
    clone.querySelector('.btn-danger').dataset.name = this.name;
    



    return clone;
  }
}

class Teacher extends Person {
  #state = false;
  #teacher = "Teacher";

  set setState(state) {
    this.#state = state;
  }
  get getTeacher() {
    return this.#teacher;
  }
  addNewTeacher() {
    const clone = teacherTemp.cloneNode(true);
    clone.querySelector("h5").textContent = this.name;
    clone.querySelector("p").textContent = this.age;
    clone.querySelector("h6").textContent = this.getTeacher;



    return clone;
  }
}
