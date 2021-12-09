import { by, element } from 'protractor';

export class ParqueoPage {
    private linkCrearParqueo = element(by.id('linkCrearParqueo'));
    private linkListarParqueos = element(by.id('linkListarParqueo'));

    async clickBotonCrearParqueos() {
        await this.linkCrearParqueo.click();
    }

    async clickBotonListarParqueos() {
        await this.linkListarParqueos.click();
    }

}
