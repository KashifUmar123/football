const bcrypt = require('bcryptjs');

async function hash(pass) {
    var hashPwd = bcrypt.hashSync(pass, 10);
    console.log(hashPwd);
    const isPasswordMatch = await bcrypt.compare(pass, hashPwd);
    console.log(isPasswordMatch);
}

hash("asad1234")