import fs from "node:fs/promises";
import path from "node:path";
import { nanoid } from "nanoid";

const contactsPath = path.resolve("db", "contacts.json");

export const writeFileContacts = async (contacts) => {
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
};

export const listContacts = async () => {
  const contactsJson = await fs.readFile(contactsPath, "utf-8");
  const contacts = JSON.parse(contactsJson);
  return contacts;
};

export const getContactById = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.find((contact) => contact.id === contactId);
  return contact ?? null;
};

export const removeContact = async (contactId) => {
  const contacts = await listContacts();
  const contact = contacts.findIndex((contact) => contact.id === contactId);
  if (contact === -1) return null;

  const [removedContact] = contacts.splice(contact, 1);
  await writeFileContacts(contacts);
  return removedContact;
};

export const addContact = async (name, email, phone) => {
  const contacts = await listContacts();
  const newContact = { id: nanoid(), name, email, phone };
  contacts.push(newContact);
  await writeFileContacts(contacts);
  return newContact;
};
