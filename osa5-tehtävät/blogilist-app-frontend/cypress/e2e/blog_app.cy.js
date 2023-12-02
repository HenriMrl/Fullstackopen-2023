describe('Blog', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3000')
    const user = {
      name: 'Matti Luukkainen',
      username: 'mluukkaii',
      password: 'salainenn'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    const user2 = {
      name: 'testikäyttäjä',
      username: 'testikäyttäjä',
      password: 'testisalasana'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user2) 
  })

  it('Login form is shown', function() {
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.get('#username').type('mluukkaii')
      cy.get('#password').type('salainenn')
      cy.get('#login-button').click()
      cy.contains('Matti Luukkainen logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('mluukkaii')
      cy.get('#password').type('väärä salasana')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })

    describe('When logged in', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkaii', password: 'salainenn' })
      })
  
      it('A blog can be created', function() {
        cy.contains('Create new blog').click()
        cy.get('#title').type('a blog created by cypress')
        cy.get('#Create').click()
        cy.contains('a blog created by cypress')
      })

      it('a blog can be liked', function(){
        cy.contains('Create new blog').click()
        cy.get('#title').type('a blog that can be liked')
        cy.get('#Create').click()
        cy.contains('a blog that can be liked')
        cy.get('#view').click()
        cy.get('#like').click()
      })

      it('a blog can be deleted', function(){
        cy.contains('Create new blog').click()
        cy.get('#title').type('a blog that can be deleted')
        cy.get('#Create').click()
        cy.get('#view').click()
        cy.get('#delete').click()
      })

      it('only person who created the blog can delete it', function(){
        cy.contains('Create new blog').click()
        cy.get('#title').type('a blog that can be deleted only by the user creating it')
        cy.get('#Create').click()
        cy.get('#logout').click()
        cy.login({ username: 'testikäyttäjä', password: 'testisalasana' })
        cy.get('#view').click()
        cy.get('#delete').should('not.exist');
      })
    })

    describe('blogs sorted', function() {
      beforeEach(function() {
        cy.login({ username: 'mluukkaii', password: 'salainenn' })

        cy.createBlog({title: 'testiblogi',
        author: 'minä',
        url: 'http://testiblogi.com'})

        cy.createBlog({title: 'testiblogi2',
        author: 'sinä',
        url: 'http://testiblogi2.com'})

        cy.createBlog({title: 'testiblogi3',
        author: 'me',
        url: 'http://testiblogi3.com'})

      })

      it('the blogs are sorted based on likes', function(){
        cy.get('.blog').eq(0).find('#view').click()
        cy.get('.blog').eq(0).find('#like').click()

        cy.get('.blog').eq(1).find('#view').click()
        cy.get('.blog').eq(1).find('#like').click()
        cy.wait(500)
        cy.get('.blog').eq(1).find('#like').click()

        cy.get('.blog').eq(2).find('#view').click()
        cy.get('.blog').eq(2).find('#like').click()
        cy.wait(500)
        cy.get('.blog').eq(2).find('#like').click()
        cy.wait(500)
        cy.get('.blog').eq(2).find('#like').click()

        cy.visit('http://localhost:3000')

        cy.get('.blog').eq(0).should('contain', 'testiblogi3')
        cy.get('.blog').eq(1).should('contain', 'testiblogi2')
        cy.get('.blog').eq(2).should('contain', 'testiblogi')
      })
    })
  })
})