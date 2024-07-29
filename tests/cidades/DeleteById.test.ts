import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - DeleteById",()=>{
  it("Apagar cidade",async ()=>{
    const res1 = await testServer.post("/cidades").send({nome:"Caxias do sul"});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagado = await testServer
      .delete(`/cidades/${res1.body}`)
      .send();

    expect(resApagado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  });

  it("Apagar registro inexistente",async ()=>{
    const res = await testServer
      .delete("/cidades/99999")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});