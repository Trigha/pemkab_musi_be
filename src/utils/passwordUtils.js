const bcrypt = require("bcrypt");

const saltRounds = 10;

module.exports = {
  hashPassword: async (password) => {
    const salt = await bcrypt.genSalt(saltRounds);
    return bcrypt.hash(password, salt);
  },

  comparePasswords: async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
  },
};
// const crypto = require('crypto');
// module.exports = {
//     hashPassword: async (password) => {
//       return new Promise((resolve, reject) => {
//         const salt = crypto.randomBytes(16).toString('hex');
//         crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
//           if (err) reject(err);
//           resolve(salt + ':' + derivedKey.toString('hex'));
//         });
//       });
//     },

//   comparePasswords: async (password, hashedPassword) => {
//     return new Promise((resolve, reject) => {
//       const [salt, storedHash] = hashedPassword.split(':');
//       crypto.pbkdf2(password, salt, 100000, 64, 'sha512', (err, derivedKey) => {
//         if (err) reject(err);
//         resolve(storedHash === derivedKey.toString('hex'));
//       });
//     });
//   },
// };

// const password = "AdminMayapada@2023";
// module.exports.hashPassword(password)
//   .then((hashedPassword) => {
//     console.log("Hashed Password:", hashedPassword);

//     // Example of how to use comparePasswords
//     const inputPassword = "AdminMayapada@2023";

//     module.exports.comparePasswords(inputPassword, hashedPassword)
//       .then((isMatch) => {
//         console.log("Passwords match:", isMatch);
//       })
//       .catch((error) => {
//         console.error("Error comparing passwords:", error);
//       });
//   })
//   .catch((error) => {
//     console.error("Error hashing password:", error);
//   });