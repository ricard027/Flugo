import { initializeApp } from "firebase/app";

import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  Timestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA_ksdmxLxmLLnJrroOQhUyLelVKddWVKg",
  authDomain: "flugo-bb6dd.firebaseapp.com",
  projectId: "flugo-bb6dd",
  storageBucket: "flugo-bb6dd.firebasestorage.app",
  messagingSenderId: "346321780181",
  appId: "1:346321780181:web:546d5b97ce07017c36115c",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialEmployees = [
  {
    name: "Fernanda Torres",
    email: "fernandatorres@flugo.com",
    department: "Design",
    isActive: true,
  },
  {
    name: "Joana D'Arc",
    email: "joanadarc@flugo.com",
    department: "TI",
    isActive: true,
  },
  {
    name: "Mari Froes",
    email: "marifroes@flugo.com",
    department: "Marketing",
    isActive: true,
  },
  {
    name: "Clara Costa",
    email: "claracosta@flugo.com",
    department: "Produto",
    isActive: false,
  },
  {
    name: "João Silva",
    email: "joaosilva@flugo.com",
    department: "Tecnologia da Informação",
    isActive: true,
  },
  {
    name: "Maria Santos",
    email: "mariasantos@flugo.com",
    department: "Recursos Humanos",
    isActive: true,
  },
];

async function populateData() {
  try {
    console.log("Verificando se já existem dados...");

    const querySnapshot = await getDocs(collection(db, "employees"));

    if (querySnapshot.empty) {
      console.log("Populando dados iniciais...");

      for (const employee of initialEmployees) {
        await addDoc(collection(db, "employees"), {
          ...employee,
          createdAt: Timestamp.now(),
        });
        console.log(`Adicionado: ${employee.name}`);
      }

      console.log("✅ Dados iniciais populados com sucesso!");
    } else {
      console.log("ℹ️ Dados já existem no banco");
    }
  } catch (error) {
    console.error("❌ Erro ao popular dados:", error);
  }
}

populateData();
