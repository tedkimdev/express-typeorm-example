import { Connection, createConnection, useContainer } from "typeorm";
import { Container } from "typeorm-typedi-extensions";

export async function DatabaseConnectionLoader (
): Promise<Connection> {
  useContainer(Container);
  const connection: Connection = await createConnection();
  console.log("[database] connected", connection.name);

  return connection;
}
