function User(first, last) {
  this.firstName = first
  this.lastName = last
}
// user 함수에 getFullName이라는 변수에 함수 할당
// prototype 속성에 getFullName을 할당해주면 메모리가 한 번만 만들어진다 !
User.prototype.getFullName = function () {
  return `${this.firstName} ${this.lastName}`;
}

// 생성자 함수(prototype)
const merrymary = new User('Merry', 'Jang');
const amy = new User('Amy', 'Chandler');
const venom = new User('venom', 'Pink');

console.log(merrymary.getFullName());
console.log(amy.getFullName());
console.log(venom.getFullName());
