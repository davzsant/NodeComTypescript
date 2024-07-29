import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - Update",()=>{
  it("Atualiza registro",async ()=>{
    const res1 = await testServer
      .post("/pessoas/1")
      .send({
        nomeCompleto:"David Lucas",
        email:"David.lucas.santiago02@gmail.com",
        cidadeId:1
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagado = await testServer
      .put(`/pessoas/${res1.body}`)
      .send({nome:"Caxias do sul"});
    expect(resApagado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  },20000);

  it("Registro inexistente",async ()=>{
    const res = await testServer
      .put("/pessoas/99999")
      .send({
        nomeCompleto:"David Lucas",
        email:"David.lucas.santiago02@gmail.com",
        cidadeId:1
      });

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
