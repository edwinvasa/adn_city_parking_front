import { by, element } from 'protractor';

export class CrearParqueoPage {
  private inputPlaca = element.all(by.id('placa'));
  private radioButtonAutomovil = element.all(by.id('radioAutomovil'));
  private radioButtonMotocicleta = element.all(by.id('radioMotocicleta'));
  private inputFechaIngreso = element.all(by.id('fechaIngreso'));
  private inputHorasIngreso = element.all(by.id('horasIngreso'));
  private inputMinutosIngreso = element.all(by.id('minutosIngreso'));

  private inputFechaSalida = element.all(by.id('fechaSalida'));
  private inputHorasSalida = element.all(by.id('horasSalida'));
  private inputMinutosSalida = element.all(by.id('minutosSalida'));

  private botonAceptar = element.all(by.id('btnAceptar'));

  async ingresarPlaca(placa: string) {
    await this.inputPlaca.sendKeys(placa);
  }

  async seleccionarTipoVehiculoAutomovil() {
    await this.radioButtonAutomovil.click();
  }

  async seleccionarTipoVehiculoMotocicleta() {
    await this.radioButtonMotocicleta.click();
  }

  async ingresarFechaIngreso(fechaIngreso: string) {
    await this.inputFechaIngreso.sendKeys(fechaIngreso);
  }

  async ingresarHorasIngreso(horasIngreso: string) {
    await this.inputHorasIngreso.sendKeys(horasIngreso);
  }

  async ingresarMinutosIngreso(minutosIngreso: string) {
    await this.inputMinutosIngreso.sendKeys(minutosIngreso);
  }

  async ingresarFechaSalida(fechaSalida: string) {
    await this.inputFechaSalida.sendKeys(fechaSalida);
  }

  async ingresarHorasSalida(horasSalida: string) {
    await this.inputHorasSalida.sendKeys(horasSalida);
  }

  async ingresarMinutosSalida(minutosSalida: string) {
    await this.inputMinutosSalida.sendKeys(minutosSalida);
  }

  async clickBotonCrearParqueo() {
    await this.botonAceptar.click();
  }
}
