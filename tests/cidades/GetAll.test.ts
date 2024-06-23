import { StatusCodes } from "http-status-codes";
import { testServer } from "../jest.setup";

describe("Cidades - GetAll",()=>{
  it('Busca todos os registros',async() => {
    const res1 = await testServer.post("/cidades").send({nome:"Caxias do sul"});
    expect(res1.statusCode).toEqual(StatusCodes.CREATED);

    const resBuscado = await testServer
      .get("/cidades")
      .send();

    expect(Number(resBuscado.header['x-total-count'])).toBeGreaterThan(0);
    expect(resBuscado.statusCode).toEqual(StatusCodes.OK);
    expect(resBuscado.body.length).toBeGreaterThan(0);
  });

  
});