import { postgres } from "../deps.js";

let sql;
if (Deno.env.get("DATABASE_URL")) {
  sql = postgres(Deno.env.get("DATABASE_URL"));
} else {
  sql = postgres({});
}
// const sql = postgres({});

const getMessages = async () => {
    return await sql`SELECT * FROM messages ORDER BY id DESC LIMIT 5`;
}


const addMessage = async (sender, message) => {
    await sql`INSERT INTO messages(sender, message) VALUES(${sender}, ${message})`;
}
export {getMessages, addMessage}