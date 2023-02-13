describe('Create Lobby', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('button[aria-label="create lobby button"]')
      .should('not.be.disabled')
      .as('button-create');
    cy.get('@button-create').click();
    cy.get('button[aria-label="randomize name"]')
      .should('not.be.disabled')
      .as('randomize-name');
    cy.get('@randomize-name').click();
    cy.get('button[type=submit]').click();
  });
  it('creates a lobby', () => {
    cy.visit('/');
    cy.get('button[aria-label="create lobby button"]')
      .should('not.be.disabled')
      .as('button-create')
      .click();
    cy.url().should('contain', 'join/');
    cy.get('button[aria-label="randomize name"]')
      .should('not.be.disabled')
      .click();
    cy.get('input[type=text]')
      .invoke('val')
      .then((username) => {
        cy.location().then((location) => {
          const lobbyCode = location.pathname.substring(6);
          expect(lobbyCode.length).equal(12);
          cy.get('button[type=submit]').click();
          cy.url().should('contain', 'play');
          cy.get('h2')
            .contains('Name: ')
            .then((name) => {
              const shownName = name.text().substring(6);
              expect(shownName).to.equal(username);
            });
          cy.get('h2')
            .contains('In Lobby')
            .then((lobby) => {
              const shownCode = lobby.text().substring(10);
              expect(shownCode).to.equal(lobbyCode);
            });
        });
      });
  });
  it('can start', () => {});
  it('can create new lobby', () => {});
  it('can leave lobby', () => {});
  it('can draw', () => {});
  it('can clear', () => {});
  it('can change draw settings', () => {});
});
