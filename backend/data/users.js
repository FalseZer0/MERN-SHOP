import bcrypt from "bcryptjs";
const users = [
  {
    name: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("123456", 10),
    isAdmin: true,
  },
  {
    name: "Kairat",
    email: "kairat@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
  {
    name: "Nikita",
    email: "maslov@example.com",
    password: bcrypt.hashSync("123456", 10),
  },
];
export default users;
