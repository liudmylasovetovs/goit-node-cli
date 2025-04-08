import { program } from "commander";
import * as actions from "./contacts.js";


program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse();

const options = program.opts();

async function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      const allContacts = await actions.listContacts();
      console.table(allContacts);
      break;

    case "get":
      const contactById = await actions.getContactById(id);
      console.log(contactById);
      break;

    case "add":
      const newContact = await actions.addContact(name, email, phone);
      console.log(newContact);
    break;

    case "remove":
      const removedContact = await actions.removeContact(id);
      console.log(removedContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(options);
