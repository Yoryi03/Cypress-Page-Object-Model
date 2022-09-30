import contactUsPage from "../pages/contactFormPage";

/// <reference types="Cypress"/>

describe("Contact form validation", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php?controller=contact");
  });

  it("Check the form validation without the subject heading field should trigger a danger alert", () => {
    contactUsPage.selectSubject(0);
    contactUsPage.typeEmail("Test@gmail.com");
    contactUsPage.typeOrderReference("2");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.clickSend();
    contactUsPage.elements
      .dangerAlert()
      .should("exist")
      .contains("Please select a subject from the list provided.");
  });
  it("Check the form validation without the email field should trigger a danger alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeOrderReference("2");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.clickSend();
    contactUsPage.elements
      .dangerAlert()
      .should("exist")
      .contains("Invalid email address.");
  });
  it("Check the form validation with invalid email should trigger a danger alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeEmail("test@.com");
    contactUsPage.typeOrderReference("2");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.clickSend();
    contactUsPage.elements
      .dangerAlert()
      .should("exist")
      .contains("Invalid email address.");
  });
  it("Check the form validation without order reference field should trigger a danger alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeEmail("test@gmail.com");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.clickSend();
    contactUsPage.elements
      .dangerAlert()
      .should("contains.text", "Invalid email address.");
  });
  it("Check the form validation without message field should trigger a danger alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeEmail("test@gmail.com");
    contactUsPage.clickSend();
    contactUsPage.elements
      .dangerAlert()
      .should("contains.text", "The message cannot be blank.");
  });
  it("Check the form validation without message field should trigger a sucess alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeEmail("test@gmail.com");
    contactUsPage.typeOrderReference("2");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.clickSend();
    contactUsPage.elements
      .sucessAlert()
      .should(
        "contains.text",
        "Your message has been successfully sent to our team."
      );
  });
  it("Check the form validation uploading a file should trigger a sucess alert", () => {
    contactUsPage.selectSubject(1);
    contactUsPage.typeEmail("test@gmail.com");
    contactUsPage.typeOrderReference("2");
    contactUsPage.typeMessage("This is a test");
    contactUsPage.elements.uploadFile().attachFile("upload.png");
    contactUsPage.elements.fileName().should("contains.text", "upload.png");
    contactUsPage.clickSend();
    contactUsPage.elements
      .sucessAlert()
      .should(
        "contains.text",
        "Your message has been successfully sent to our team."
      );
  });
});
