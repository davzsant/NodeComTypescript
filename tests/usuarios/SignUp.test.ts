import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Usuarios - Sign Up",()=>{

  it("Criar um registro valido",async()=>{
    const res = await testServer
      .post("/cadastrar")
      .send({
        nomeCompleto:"David Lucas",
        email:"David.lucas.santiago02@gmail.com",
        senha:"02022006"
      });

    expect(res.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof res.body).toEqual('number'); //Retorna o ID se for valido
  });

  it("Tentar criar um nome muito curto", async () => {
    const resError = await testServer
      .post("/cadastrar")
      .send({
        nomeCompleto: "Da",
        email:"example@gmail.com",
        senha:"02022006"
      });

    expect(resError.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resError.body).toHaveProperty("errors.body.nomeCompleto");
  });
});