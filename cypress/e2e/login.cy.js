describe('Login Flow', () => {
  it('logs in the user successfully', () => {
    
    cy.visit('http://localhost:4200/home'); 

    cy.get('input[name="username"]').type('anass');
    cy.get('input[name="password"]').type('anassanass');
    cy.get('button[type="submit"]').click();

    
    cy.url().should('include', 'http://localhost:4200/dashboard');
    cy.contains('Dashboard Overview');
  }); 
});