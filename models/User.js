const users = [
  {
    id: '12345',
    firstname: 'Cool',
    lastname: 'Dev',
  },
];

class User {
  static getUsers() {
    return users;
  }

  static getCurrentUser() {
    return users[0];
  }
}

module.exports = User;
