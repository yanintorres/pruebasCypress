class indexPage {
    constructor(){
this.searchInput = '#gh-ac'
this.searchButton = '#gh-btn'
    }   
    
search = (element) =>{
    cy.get(this.searchInput).type(element);
    cy.wait(1000);
    cy.get(this.searchButton).click();
    }    

}
export default new indexPage();