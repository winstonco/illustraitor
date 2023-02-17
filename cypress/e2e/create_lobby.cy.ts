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
          if (typeof username === 'string') cy.contains(username);
          cy.contains(lobbyCode);
        });
      });
  });
  it('has buttons', () => {
    cy.get('button').contains('Start'); // ('button[aria-label="start button"]');
    cy.get('button').contains('Create New Lobby');
    cy.get('button').contains('Leave Lobby');
  });
  it('can start', () => {});
  it('can create new lobby', () => {
    cy.get('#lobby-code')
      .invoke('contents')
      .then((code) => {
        const code1 = code[0].textContent;
        cy.get('button').contains('Create New Lobby').click();
        cy.get('button[aria-label="randomize name"]')
          .should('not.be.disabled')
          .click();
        cy.get('button[type=submit]').click();
        cy.get('#lobby-code')
          .invoke('contents')
          .then((code) => {
            const code2 = code[0].textContent;
            expect(code1).to.not.equal(code2);
          });
      });
  });
  it('can leave lobby', () => {
    cy.get('button').contains('Leave Lobby').click();
    // same test as clicking logo
    cy.location().then((location) => {
      const pathname = location.pathname;
      expect(pathname).equal('/');
    });
  });
  it('can draw', () => {});
  it('can clear', () => {
    cy.get('button[aria-label="clear canvas button"]')
      .should('not.be.disabled')
      .click();
  });
  it('can change draw settings', () => {
    cy.get('button[aria-label="colors button"]')
      .should('not.be.disabled')
      .click();
  });
});
