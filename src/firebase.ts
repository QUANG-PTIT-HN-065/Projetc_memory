import { initializeApp } from "firebase/app";
import { getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "@dataconnect/generated";

const firebaseConfig = {
  projectId: "my-projetc-4c9bb",
};

const app = initializeApp(firebaseConfig);
const dataConnect = getDataConnect(app, connectorConfig);

export { app, dataConnect };
