import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Create",()=>{

  it("Criar um registro",async()=>{
    const resOk = await testServer
      .post("/pessoas")
      .send({
        nomeCompleto:"David Lucas",
        email:"David.lucas.santiago02@gmail.com",
        cidadeId:1
      });

    expect(resOk.statusCode).toEqual(StatusCodes.CREATED);
    expect(typeof resOk.body).toEqual('number');
  });

  it("Tentar criar um nome muito curto", async () => {
    const resError = await testServer
      .post("/pessoas")
      .send({
        nomeCompleto: "Da",
        email:"example@gmail.com",
        cidadeId:1
      });

    expect(resError.statusCode).toEqual(StatusCodes.BAD_REQUEST);
    expect(resError.body).toHaveProperty("errors.body.nome");
  });
});