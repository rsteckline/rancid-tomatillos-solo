describe("Movie Details", () => {
  beforeEach(() => {
    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies",
      {
        statusCode: 200,
        fixture: "/mock-data.json",
      }
    );

    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/694919",
      {
        statusCode: 200,
        fixture: "/mock-movie-0.json",
      }
    );

    cy.intercept(
      "GET",
      "https://rancid-tomatillos-api-ce4a3879078e.herokuapp.com/api/v1/movies/585244",
      {
        statusCode: 200,
        fixture: "/mock-movie-1.json",
      }
    );

    cy.visit("/");
  });

  it("should return to the main page when the Rancid Tomatillos marquis is clicked", () => {
    cy.get(".movies-container").children().first().click();
    cy.location("pathname").should("eq", "/movies/694919");
    cy.get("header").click();
    cy.location("pathname").should("eq", "/");
  });

  it("should navigate to the correct detail page when the first movie card is clicked, and display details about the chosen movie", () => {
    cy.get(".movies-container").children().first().click();
    cy.location("pathname").should("eq", "/movies/694919");
    cy.get("img").should("have.attr", "alt", "Tomatillo Logo");
    cy.get("h1").contains("Rancid Tomatillos");
    cy.get(".poster").should("have.attr", "alt", "Money Plane poster");
    cy.get(".right-side").contains("h3", "Money Plane (2020)");
    cy.get(".right-side").contains("h2", "The heist of the century.");
    cy.get(".right-side").contains("p", "Action, Crime, Thriller • 82 mins");
    cy.get(".right-side").find("img").should("have.attr", "alt", "Tomatillo");
    cy.get(".right-side").find("b").contains("1.8");
    cy.get(".synopsis-container").find("p").contains("A professional thief with $40 million in debt and his family's life on the line must commit one final heist - rob a futuristic airborne casino filled with the world's most dangerous criminals.");
  });

  it("should navigate to the correct detail page when the last movie card is clicked, and display details about the chosen movie", () => {
    cy.get(".movies-container").children().last().click();
    cy.location("pathname").should("eq", "/movies/585244");
    cy.get("img").should("have.attr", "alt", "Tomatillo Logo");
    cy.get("h1").contains("Rancid Tomatillos");
    cy.get(".poster").should("have.attr", "alt", "I Still Believe poster");
    cy.get(".right-side").contains("h3", "I Still Believe (2020)");
    cy.get(".right-side").contains("h2", "One love can change your life.");
    cy.get(".right-side").contains("p", "Music, Drama, Romance • 115 mins");
    cy.get(".right-side").find("img").should("have.attr", "alt", "Tomatillo");
    cy.get(".right-side").find("b").contains("3.3");
    cy.get(".synopsis-container").find("p").contains("The true-life story of Christian music star Jeremy Camp and his journey of love and loss that looks to prove there is always hope.");
  });
});
