import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuarios",()=>{
  /*Criar um usuario para testar a validacao */
  beforeAll(async()=>{
    const res1 = await testServer.post("/cadastrar").send(
      {
        nomeCompleto:"Caxias do sul",
        email:"David.lucas.santiago02@gmail.com",
        senha:"02022006"
      }
    );
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res1 === "number");
  });
  it('Procura um usuario valido',async() => {
    const resBuscado = await testServer
      .get("/entrar")
      .send(
        {
          email:"david.lucas.santiago02@gmail.com",
          senha:"02022006"
        }
      );

    expect(resBuscado.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscado.body).toHaveProperty("acessToken");
  });

  
});