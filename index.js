// document의 form 엘리먼트를 받아옵니다.
const form = document.getElementById('registerForm');

// user 정보를 저장할 클래스를 생성합니다.
function User(userId, firstName, lastName, email, password) {
  this.userId = userId;
  this.firstName = firstName;
  this.lastName = lastName;
  this.email = email;
  this.password = password;
}

const users = [];

const formOnSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const createdUser = new User();

  for (const [key, value] of formData) {
    const warningNode = document.querySelector(`.${key}Warning`);
    if (value == '') {
      warningNode.innerHTML = `${key} is required`;
      continue;
    }
    switch (key) {
      case 'userId':
        if (users.find((user) => user.userId == value) !== undefined)
          warningNode.innerHTML = 'This userId already exists';
        break;
      case 'email':
        if (!regexChecker(value, /\w+@[a-z]+.[a-z.]+/))
          warningNode.innerHTML = 'Invalid email format';
        if (users.find((user) => user.email == email) !== undefined)
          warningNode.innerHTML = 'This email already exists';
        break;
      case 'password':
        if (
          !regexChecker(
            value,
            /^.*(?=.{8,})(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[\[\]\{\}\/\(\)\.\?\<\,\>\!\@\#\$\%\^\&]).*$/,
          )
        )
          warningNode.innerHTML =
            'Password must have containing 1 or more special symbol, upper case, lower case and number, and least 8 length.';
        break;
      default:
        createdUser[key] = value;
        break;
    }
  }
  if (Object.keys(createdUser).length === 5) users.push(createdUser);
};

const regexChecker = (value, regex) => {
  return regex.test(value);
};

form.addEventListener('submit', formOnSubmit);
