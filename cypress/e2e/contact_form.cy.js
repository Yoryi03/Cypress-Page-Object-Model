import contactUsPage from "../pages/contactFormPage";

/// <reference types="Cypress"/>

const dataTests = require("../fixtures/test-data.json");

describe("Contact form validation", () => {
  beforeEach(() => {
    cy.visit("http://automationpractice.com/index.php?controller=contact");
  });
  dataTests.forEach((test) => {
    it("Check the form validation without the subject heading field should trigger a danger alert", () => {
      contactUsPage.selectSubject(0);
      contactUsPage.typeEmail(test.vEmail);
      contactUsPage.typeOrderReference(test.orderReference);
      contactUsPage.typeMessage(test.message);
      contactUsPage.clickSend();
      contactUsPage.elements
        .dangerAlert()
        .should("exist")
        .contains(test.subjectAlert);
    });
  });
  dataTests.forEach((test) => {
    it("Check the form validation without the email field should trigger a danger alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeOrderReference(test.orderReference);
      contactUsPage.typeMessage(test.message);
      contactUsPage.clickSend();
      contactUsPage.elements
        .dangerAlert()
        .should("exist")
        .contains(test.emailAlert);
    });
  });
  dataTests.forEach((test) => {
    it("Check the form validation with invalid email should trigger a danger alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeEmail(test.iEmail);
      contactUsPage.typeOrderReference(test.orderReference);
      contactUsPage.typeMessage(test.message);
      contactUsPage.clickSend();
      contactUsPage.elements
        .dangerAlert()
        .should("exist")
        .contains(test.emailAlert);
    });
  });
  dataTests.forEach((test) => {
    it.only("Check the form validation without order reference field should trigger a danger alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeEmail(test.vEmail);
      contactUsPage.typeMessage(test.message);
      contactUsPage.clickSend();
      contactUsPage.elements
        .dangerAlert()
        .should("exist")
        .contains(test.orderReferenceAlert);
    });
  });
  dataTests.forEach((test) => {
    it("Check the form validation without message field should trigger a danger alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeEmail(test.vEmail);
      contactUsPage.clickSend();
      contactUsPage.elements
        .dangerAlert()
        .should("exist")
        .contains(test.messageAlert);
    });
  });
  dataTests.forEach((test) => {
    it("Check the form validation with message field should trigger a sucess alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeEmail(test.vEmail);
      contactUsPage.typeOrderReference(test.orderReference);
      contactUsPage.typeMessage(test.message);
      contactUsPage.clickSend();
      contactUsPage.elements
        .successAlert()
        .should("exist")
        .contains(test.successAlert);
    });
  });
  dataTests.forEach((test) => {
    it("Check the form validation uploading a file should trigger a sucess alert", () => {
      contactUsPage.selectSubject(1);
      contactUsPage.typeEmail(test.vEmail);
      contactUsPage.typeOrderReference(test.orderReference);
      contactUsPage.typeMessage(test.message);
      contactUsPage.elements.uploadFile().attachFile("upload.png");
      contactUsPage.elements.fileName().should("contains.text", test.fileName);
      contactUsPage.clickSend();
      contactUsPage.elements
        .successAlert()
        .should("exist")
        .contains(test.successAlert);
    });
  });
});
