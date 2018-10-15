const sha256 = require("crypto").createHash("sha256");

const hash = sha256.update("admin", "utf-8").digest("hex");
console.log(hash);