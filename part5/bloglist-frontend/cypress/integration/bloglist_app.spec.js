describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.createUser({ username: 'admin', password: 'admin' })
  })

  it('Login form is shown', function () {
    cy.contains('log in to application')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('admin')
      cy.contains('login').click()
      cy.contains('admin logged in')
    })

    it('fails with wrong credentials', function () {
      cy.get('#username').type('admin')
      cy.get('#password').type('123456')
      cy.contains('login').click()
      cy.get('.error')
        .should('have.text', 'password or username is not correct')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
        .and('have.css', 'border-style', 'solid')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'admin', password: 'admin' })
    })

    it('A blog can be created', function () {
      cy.contains('create a blog').click()
      cy.get('#title').type('TestTitle')
      cy.get('#author').type('admin')
      cy.get('#url').type('http://localhost:3000')
      cy.get('#createBlogButton').click()

      cy.contains('TestTitle admin')
    })
    describe('When a blog is created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'admin', url: 'http://www.1.com', likes: 1000 })
      })

      it('A blog can be liked', function () {
        cy.contains('first blog').contains('view').click()
        cy.get('button').contains('like').click()

        cy.get('.likes').should('have.text', 'likes:1001')
      })

      it('A blog can be deleted', function () {
        cy.contains('first blog').contains('view').click()
        cy.contains('Remove').click()

        cy.get('html').should('not.contain', 'first blog')
      })

      it('A blog created by others can not be deleted', function () {
        const newUser = { username: 'admin1', password: 'admin' }
        cy.createUser(newUser)
        cy.login(newUser)
        cy.contains('admin1 logged in')
        cy.contains('first blog').contains('view').click()
        cy.contains('Remove').click()

        cy.get('.error')
          .should('have.text', '401')
        cy.contains('first blog')
      })
    })

    describe('When some blogs are created', function () {
      beforeEach(function () {
        cy.createBlog({ title: 'first blog', author: 'admin', url: 'http://www.1.com', likes: 0 })
        cy.createBlog({ title: 'second blog', author: 'admin', url: 'http://www.1.com', likes: 1000 })
        cy.createBlog({ title: 'third blog', author: 'admin', url: 'http://www.1.com', likes: 0 })
      })

      it.only('blogs are ordered by likes', function () {
        cy.intercept({
          method: 'PUT',
          url: '/api/blogs/**',
        }).as('updateBlog')

        cy.contains('first blog').contains('view').click()
        cy.contains('second blog').contains('view').click()
        cy.contains('third blog').contains('view').click()
        cy.contains('third blog').parent().find('button').contains('like').click()
        cy.wait('@updateBlog')
        cy.get('.likes')
          .should('have.length', 3)
          .then(($els) => {
            return (
              Cypress.$.makeArray($els)
                .map((el) => el.innerText)
            )
          })
          .should('deep.equal', ['likes:1000', 'likes:1', 'likes:0'])
      })
    })
  })
})