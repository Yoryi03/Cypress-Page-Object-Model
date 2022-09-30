class contactUsPage {
  elements = {
    titleSpan: () => cy.get(".title"),
    subjectHeading: () => cy.get("#id_contact"),
    emailAddress: () => cy.get("#email"),
    orderReference: () => cy.get("#id_order"),
    attachFile: () => cy.get("#fileUpload"),
    comment: () => cy.get("#message"),
    sendBtn: () => cy.get("#submitMessage"),
    successAlert: () => cy.get(".alert-success"),
    dangerAlert: () => cy.get(".alert-danger"),
    uploadFile: () => cy.get("#fileUpload"),
    fileName: () => cy.get(".filename"),
  };

  clickSend() {
    this.elements.sendBtn().click();
  }
  selectSubject(subject) {
    this.elements.subjectHeading().select(subject);
  }
  typeEmail(email) {
    this.elements.emailAddress().type(email);
  }
  typeOrderReference(order) {
    this.elements.orderReference().type(order);
  }
  typeMessage(message) {
    this.elements.comment().type(message);
  }
}

module.exports = new contactUsPage();
