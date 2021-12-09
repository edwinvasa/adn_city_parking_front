import { by, element } from 'protractor';

export class ListarParqueoPage {
  private inputBuscarparqueo = element.all(by.id('buscarParqueo'));
  private botonRegistrar = element.all(by.id('btnRegistrar'));
  private listaParqueos = element.all(by.tagName('tr'));
  private botonEditarPrimerRegistro = element.all(by.id('editar')).get(0);
  private botonFacturaPrimerRegistro = element.all(by.id('factura')).get(0);

  async ingresarBusqueda(busqueda: string) {
    await this.inputBuscarparqueo.sendKeys(busqueda);
  }

  async clickBotonRegistrarParqueo() {
    await this.botonRegistrar.click();
  }

  async contarParqueos() {
    return this.listaParqueos.count();
  }

  async clickBotonEditarPrimerRegistro(){
    await this.botonEditarPrimerRegistro.click();
  }

  async clickBotonFacturaPrimerRegistro(){
    await this.botonFacturaPrimerRegistro.click();
  }
}
