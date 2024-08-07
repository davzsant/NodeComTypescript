import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - Update",()=>{
  it("Atualiza registro",async ()=>{
    const res1 = await testServer.post("/cidades").send({nome:"Caxias do sul"});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagado = await testServer
      .put(`/cidades/${res1.body}`)
      .send({nome:"Caxias do sul"});
    expect(resApagado.statusCode).toEqual(StatusCodes.NO_CONTENT);
  },20000);

  it("Registro inexistente",async ()=>{
    const res = await testServer
      .put("/cidades/99999")
      .send({nome:"Mato grossao"});

    expect(res.statusCode).toEqual(StatusCodes.INTERNAL_SERVER_ERROR);
    expect(res.body).toHaveProperty("errors.default");
  });
});
