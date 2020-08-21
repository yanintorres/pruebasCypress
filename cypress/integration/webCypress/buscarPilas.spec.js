import { watchFile } from "fs";
import indexPage from "/home/yani/Documents/Automomatizacion/ProyectoCypress/cypress/support/pages/index";  
describe ("Visitar pagina ebay", () => 
{
    it ("ingreso a la pagina", () => {
        cy.visit("/");

});
    it ("Ingresar la palabra pilas en el buscador",() => {
        indexPage.search('pilas');
        //cy.get('#gh-ac').type('pilas');
    });
    it ("Mostrar resultados de la busqueda", () => {
        cy.get('[data-layer="Content"]').invoke('text')
        .then(console.log)
          }) 
    });
