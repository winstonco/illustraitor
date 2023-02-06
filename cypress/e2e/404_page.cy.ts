describe('404 Page', () => {
  beforeEach(() => {
    cy.visit('/abcde');
    cy.get('svg').should('have.class', 'fa-door-closed').as('door-icon');
  });
  it('is visible', () => {
    cy.contains('Hey!');
    cy.contains("You're not supposed to be here.");
  });
  it('can hover icon', () => {
    cy.get('@door-icon').trigger('mouseover');
    cy.get('@door-icon').should('have.class', 'fa-door-open');
    cy.contains('Leave Now');
    cy.get('h1').trigger('mouseover');
  });
  it('can leave', () => {
    cy.get('@door-icon').click();
  });
});
