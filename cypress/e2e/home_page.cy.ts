describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('div').should('have.class', 'App').as('App');
    cy.get('@App').get('img[alt="illustraitor logo"]');
    cy.get('button[aria-label="create lobby button"]')
      .should('not.be.disabled')
      .as('button-create');
    cy.get('button[aria-label="join lobby button"]')
      .should('not.be.disabled')
      .as('button-join');
    cy.get('button[aria-label="settings button"]')
      .should('not.be.disabled')
      .as('button-settings');
  });
  it('is animated', () => {
    cy.get('@button-create').should('have.css', 'rotate');
    // cy.get('@button-create')
    //   .should('have.css', 'scale')
    //   .then((transform) => {
    //     cy.get('@button-create')
    //       .trigger('mouseover')
    //       .should('have.css', 'scale')
    //       .should('not.eq', transform);
    //   });
    cy.get('@button-join').should('have.css', 'rotate');
    // cy.get('@button-create')
    //   .should('have.css', 'scale')
    //   .then((transform) => {
    //     cy.get('@button-create')
    //       .trigger('mouseover')
    //       .should('have.css', 'scale')
    //       .should('not.eq', transform);
    // });
    cy.get('@button-settings').should('have.css', 'rotate');
    // cy.get('@button-create')
    //   .should('have.css', 'scale')
    //   .then((transform) => {
    //     cy.get('@button-create')
    //       .trigger('mouseover')
    //       .should('have.css', 'scale')
    //       .should('not.eq', transform);
    //   });
  });
  it('creates a lobby', () => {
    cy.get('@button-create').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=button][aria-label="randomize name"]').click();
    cy.get('button[type=submit]').click();
    cy.url().should('contain', 'play');
  });
  it('fails to join bad lobby', () => {
    cy.get('@button-join').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=submit]').click();
    cy.url().should('contain', 'join');
    cy.get('input[type=text]').type('thiswillfail');
    cy.get('button[type=submit]').click();
    cy.location().then((location) => {
      const pathname = location.pathname;
      console.log(pathname);
      expect(pathname).equal('/');
    });
  });
  // it('joins a lobby', () => {
  //   cy.get('@button-join').click();
  //   cy.url().should('contain', 'join');
  // });
  it('opens settings', () => {
    cy.get('@button-settings').click();
    cy.contains('Game Settings');
    cy.get('button[type=submit]').click();
    cy.should('not.contain', 'Game Settings');
  });
  it('goes back home-create', () => {
    cy.get('@button-create').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=button][aria-label="randomize name"]').click();
    cy.get('button[type=submit]').click();
    cy.url().should('contain', 'play');
    cy.get('div')
      .should('have.class', 'App')
      .get('img[alt="illustraitor logo"]')
      .click();
    cy.location().then((location) => {
      const pathname = location.pathname;
      expect(pathname).equal('/');
    });
  });
  it('goes back home-join', () => {});
});
