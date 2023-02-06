describe('Home Page', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.get('div').should('have.class', 'App').as('App');
    cy.get('@App').contains('Fake Artist Sham Illustrator');
    cy.contains('Create Lobby').should('not.be.disabled').as('button-create');
    cy.contains('I Have A Code').should('not.be.disabled').as('button-join');
    // cy.contains('Settings').should('not.be.disabled').as('button-leave');
  });
  it('has hover effects', () => {
    cy.get('@button-create').trigger('mouseover');
    cy.get('@button-create').should('have.class', 'MuiButton-contained');
    cy.get('@button-join').trigger('mouseover');
    cy.get('@button-join').should('have.class', 'MuiButton-contained');
  });
  it('creates a lobby', () => {
    cy.get('@button-create').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=submit]').should('contain', 'Submit').click();
    cy.url().should('contain', 'play');
  });
  it('fails to join bad lobby', () => {
    cy.get('@button-join').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=submit]').should('contain', 'Submit').click();
    cy.url().should('contain', 'join');
    cy.get('input[type=text]').type('thiswillfail');
    cy.get('button[type=submit]').should('contain', 'Submit').click();
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
  // it('clicks settings', () => {
  //   cy.contains('Settings').should('not.be.disabled');
  // });
  it('goes back home-create', () => {
    cy.get('@button-create').click();
    cy.url().should('contain', 'join');
    cy.get('button[type=submit]').should('contain', 'Submit').click();
    cy.url().should('contain', 'play');
    cy.get('div')
      .should('have.class', 'App')
      .contains('Fake Artist Sham Illustrator')
      .as('title');
    cy.get('@title').click();
    cy.location().then((location) => {
      const pathname = location.pathname;
      console.log(pathname);
      expect(pathname).equal('/');
    });
  });
  it('goes back home-join', () => {});
});
