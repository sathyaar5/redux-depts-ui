describe('Department Management - Task', () => {
  beforeEach(() => {
    // Navigate to the application's main page before each test
    cy.visit('/');
  });

  it('should display the list of departments', () => {
    cy.get('.department-item').should('have.length.greaterThan', 0);
  });

  it('should display department details when a department is clicked', () => {
    // Click on the first department
    cy.get('.department-item').first().click();

    // Verify that department details are displayed
    cy.get('.department-details').should('be.visible');
    cy.get('.department-details').within(() => {
      cy.get('h4').should('contain', 'Department');
      cy.get('p').should('contain', 'No of employees');
      cy.get('p').should('contain', 'Manager');
    });
  });

  it('should add a new department', () => {

    cy.get('button').contains('Add Department').click();
    cy.get('input[placeholder="Department Name"]').should('exist').and('be.visible').type('New Department');
    cy.get('input[placeholder="Manager Name"]').should('exist').and('be.visible').type('Sathya');
    
    cy.get('button').contains('Add').click();
   
    cy.get('.department-item').should('contain', 'New Department');
  });

  it('shows an error message when adding without department name and manager name', () => {

    cy.get('button').contains('Add Department').click();
    cy.get('button').contains('Add').click();

    cy.contains('Department name is required', { timeout: 5000 }).should('exist');
  });
  
  it('shows an error message when adding without manager name', () => {

    cy.get('button').contains('Add Department').click();
    cy.get('input[placeholder="Department Name"]').should('exist').and('be.visible').type('New Department');
    cy.get('button').contains('Add').click();

    cy.contains('Manager name is required', { timeout: 5000 }).should('exist');
  });

  
  it('shows an error message when adding without department name', () => {
    cy.get('button').contains('Add Department').click();
    cy.get('input[placeholder="Manager Name"]').should('exist').and('be.visible').type('Sathya');
    cy.get('button').contains('Add').click();

    cy.contains('Department name is required', { timeout: 5000 }).should('exist');
  });

  it('Adding an employee with all the fields', () => {

    cy.contains('Technical Department').click();
    cy.get('button').contains('Add Employee').click();
    cy.get('input[name="name"]').should('exist').and('be.visible').type('Sathya');
    cy.get('input[name="designation"]').should('exist').and('be.visible').type('SDE');
    cy.get('input[name="branch"]').should('exist').and('be.visible').type('Bengaluru');

    cy.get('button').contains('Save').click();

  });

  it('Adding an employee with missing all fields', () => {

    cy.contains('Technical Department').click();
    cy.get('button').contains('Add Employee').click();

    cy.get('button').contains('Save').click();

    cy.contains('Please fill in all the required fields.').should('exist');
  });


  it('Adding an employee with missing name', () => {
    cy.contains('Technical Department').click();
    cy.get('button').contains('Add Employee').click();

    cy.get('input[name="designation"]').should('exist').and('be.visible').type('SDE');
    cy.get('input[name="branch"]').should('exist').and('be.visible').type('Bengaluru');

    cy.get('button').contains('Save').click();

    cy.contains('Please fill in all the required fields.').should('exist');
  });

  it('Adding an employee with missing designation', () => {

    cy.contains('Technical Department').click();
    cy.get('button').contains('Add Employee').click();

    cy.get('input[name="name"]').should('exist').and('be.visible').type('Sathya');
    cy.get('input[name="branch"]').should('exist').and('be.visible').type('Bengaluru');

    cy.get('button').contains('Save').click();

    cy.contains('Please fill in all the required fields.').should('exist');
  });

  it('Adding an employee with missing branch', () => {

    cy.contains('Technical Department').click();
    cy.get('button').contains('Add Employee').click();

    cy.get('input[name="name"]').should('exist').and('be.visible').type('Sathya');
    cy.get('input[name="designation"]').should('exist').and('be.visible').type('SDE');

    cy.get('button').contains('Save').click();

    cy.contains('Please fill in all the required fields.').should('exist');
  });

  
  it('deletes an employee', () => {

    cy.contains('Technical Department').click();
    cy.url().should('include', '/technical-department');
    cy.contains('Sathya').should('exist');
    cy.contains('button', 'Delete').click();
  });

});