describe("Error handling", () => {

  it("should show an appropriate error if a server error occurs", () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 500,
      fixture: "/mock-data.json"
    });
    cy.visit("/");
    cy.get(".error-message").contains("Oopsie! Something went wrong, please try again later.");
  });

  it("should show an appropriate error if a client error occurs", () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 404,
      fixture: "/mock-data.json"
    });
    cy.visit("/");
    cy.get(".error-message").contains("Oopsie! Nothing to see here!");
  });

  it("should show an appropriate error if the page doesn\'t exist", () => {
    cy.intercept("GET", "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies", {
      statusCode: 200,
      fixture: "/mock-data.json"
    });
    cy.visit("/fakepath");
    cy.get(".error-message").contains("Oopsie! This page doesn\'t actually exist.");
  });
});
