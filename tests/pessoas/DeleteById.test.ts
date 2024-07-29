import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Pessoas - DeleteById",()=>{
  it("Apagar pessoa",async ()=>{
    const res1 = await testServer
      .post("/pessoas")
      .send({
        nomeCompleto:"David Lucas",
        email:"David.lucas.santiago02@gmail.com",
        cidadeId:1
      });
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagado = await testServer
      .delete(`/pessoas/${res1.body}`)
      .send();

    expect(resApagado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Apagar registro inexistente",async ()=>{
    const res = await testServer
      .delete("/pessoas/99999")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});