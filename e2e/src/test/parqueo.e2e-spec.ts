import { browser, by, element } from 'protractor';
import { NavbarPage } from '../page/navbar/navbar.po';
import { AppPage } from '../app.po';
import { CrearParqueoPage } from '../page/parqueo/crear-parqueo.po';
import { ListarParqueoPage } from '../page/parqueo/listar-parqueo.po';
import { ParqueoPage } from '../page/parqueo/parqueo.po';

const PLACA = 'E2E' + Math.floor((Math.random() * 99) + 1).toString();
const FECHA_INGRESO = '03/12/2021';
const FECHA_SALIDA = '04/12/2021';
const HORAS_SALIDA = '1';
const MINUTOS_SALIDA = '0';

describe('workspace-project Parqueo', () => {
  let page: AppPage;
  let navBar: NavbarPage;
  let crearParqueo: CrearParqueoPage;
  let parqueoPage: ParqueoPage;
  let listarParqueo: ListarParqueoPage;

  beforeEach(() => {
    page = new AppPage();
    navBar = new NavbarPage();
    parqueoPage = new ParqueoPage();
    crearParqueo = new CrearParqueoPage();
    listarParqueo = new ListarParqueoPage();
  });

  it('Deberia llegar hasta la pagina para registar un parqueo', async () => {
    page.navigateTo();
    navBar.clickBotonParqueo();
    parqueoPage.clickBotonCrearParqueos();
    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/crear');
  });

  it('El boton aceptar deberia iniciar inhabilitado', async () => {
    page.navigateTo();
    navBar.clickBotonParqueo();
    parqueoPage.clickBotonCrearParqueos();
    // Assert
    expect(element(by.id('btnAceptar')).isEnabled()).toEqual(false);
  });

  it('El boton aceptar deberia habilitarse', async () => {
    page.navigateTo();
    navBar.clickBotonParqueo();
    parqueoPage.clickBotonCrearParqueos();
    // Arrange
    crearParqueo.ingresarPlaca(PLACA);
    crearParqueo.seleccionarTipoVehiculoAutomovil();
    crearParqueo.ingresarFechaIngreso(FECHA_INGRESO);

    // Act - Assert
    expect(element(by.id('btnAceptar')).isEnabled()).toEqual(true);
  });

  it('Deberia registrar un parqueo', async () => {
    page.navigateTo();
    navBar.clickBotonParqueo();
    parqueoPage.clickBotonCrearParqueos();
    // Arrange
    crearParqueo.ingresarPlaca(PLACA);
    crearParqueo.seleccionarTipoVehiculoMotocicleta();
    crearParqueo.ingresarFechaIngreso(FECHA_INGRESO);

    // Act
    crearParqueo.clickBotonCrearParqueo();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar');
  });

  it('Deberia navegar hasta listar parqueos', async () => {
    // Arrange - Act
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar');
  });

  it('Deberia listar parqueos', async () => {
    // Arrange - Act
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    // Assert
    expect(11).toBe(listarParqueo.contarParqueos());
  });

  it('Deberia buscar un parqueo por placa', async () => {
    // Arrange - Act
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    listarParqueo.ingresarBusqueda(PLACA);

    // Assert
    expect(2).toBe(listarParqueo.contarParqueos());
  });

  it('Deberia buscar un parqueo por placa y navegar hasta edicion', async () => {
    // Arrange
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    //Act
    listarParqueo.ingresarBusqueda(PLACA);
    listarParqueo.clickBotonEditarPrimerRegistro();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar/editar');
  });

  it('Deberia buscar un parqueo por placa y navegar hasta edicion', async () => {
    // Arrange
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    //Act
    listarParqueo.ingresarBusqueda(PLACA);
    listarParqueo.clickBotonEditarPrimerRegistro();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar/editar');
  });

  it('Deberia registrar la salida de un parqueo', async () => {
    // Arrange
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    //Act
    listarParqueo.ingresarBusqueda(PLACA);
    listarParqueo.clickBotonEditarPrimerRegistro();
    crearParqueo.ingresarFechaSalida(FECHA_SALIDA);
    crearParqueo.ingresarHorasSalida(HORAS_SALIDA);
    crearParqueo.ingresarMinutosSalida(MINUTOS_SALIDA);

    crearParqueo.clickBotonCrearParqueo();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar');
  });

  it('Deberia visualizar el detalle del parqueo', async () => {
    // Arrange
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    //Act
    listarParqueo.ingresarBusqueda(PLACA);
    listarParqueo.clickBotonFacturaPrimerRegistro();

    // Assert
    expect(element(by.tagName('mat-dialog-container')).isPresent()).toEqual(true);
  });

  it('Deberia navegar hasta registrar parqueo desde el listar parqueos', async () => {
    // Arrange
    page.navigateTo();
    navBar.clickBotonParqueo();

    parqueoPage.clickBotonListarParqueos();

    // act
    listarParqueo.clickBotonRegistrarParqueo();

    // Assert
    expect(browser.getCurrentUrl()).toContain('parqueo/listar/crear');
  });

});
