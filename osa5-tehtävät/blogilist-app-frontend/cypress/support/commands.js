Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3003/api/login', {
      username, password
    }).then(({ body }) => {
      localStorage.setItem('loggedBlogappUser', JSON.stringify(body))
      cy.visit('http://localhost:3000')
    })
  })

  Cypress.Commands.add('createBlog', ({ title, author, url }) => {
    const token = JSON.parse(localStorage.getItem('loggedBlogappUser')).token;
  
    cy.request({
      method: 'POST',
      url: 'http://localhost:3003/api/blogs',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: {
        title,
        author,
        url
      }
    }).then(() => {
      cy.visit('http://localhost:3000');
    });
  });


  