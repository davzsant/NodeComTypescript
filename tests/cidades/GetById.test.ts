import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetByID",()=>{
  it("Buscar registro por Id",async ()=>{
    const res1 = await testServer.post("/cidades").send({nome:"Caxias do sul"});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);


    const resApagado = await testServer
      .get(`/cidades/${res1.body}`)
      .send();

    expect(resApagado.statusCode).toEqual(StatusCodes.OK);
  });

  it("Registro inexistente",async ()=>{
    const res = await testServer
      .get("/cidades/99999")
      .send();

    expect(res.statusCode).toEqual(StatusCodes.NOT_FOUND);
    expect(res.body).toHaveProperty("errors.default");
  });
});