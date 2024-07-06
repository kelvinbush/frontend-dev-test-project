describe('Editor and Modal Interaction', () => {
  beforeEach(() => {
    cy.visit('../../index.html');
  });

  it('should open modal when typing /', () => {
    cy.get('#editor')
      .type('/')
      .get('#modal')
      .should('be.visible');
  });

  it('should create H1 element in output when typing "/1 Header"', () => {
    cy.get('#editor')
      .type('/1 Header{enter}')
      .get('#output h1')
      .should('have.text', 'Header');
  });

  it('should update keyword span and highlight first li when typing "1"', () => {
    cy.get('#editor')
      .type('/1')
      .get('#modal .filter span')
      .should('be.visible')
      .and('have.text', '1');

    cy.get('#modal ul li:first-child')
      .should('have.class', 'active');
  });

  it('should handle multiple H1 elements created consecutively', () => {
    cy.get('#editor')
      .type('/1 Header 1{enter}')
      .get('#output h1')
      .should('have.length', 1);

    cy.get('#editor')
      .type('/1 Header 2{enter}')
      .get('#output h1')
      .should('have.length', 2);
  });

  it('should clear textarea after creating H1 element', () => {
    cy.get('#editor')
      .type('/1 Header{enter}')
      .get('#editor')
      .should('have.value', '');
  });
});

