var Metalsmith = require('metalsmith'),
    markdown   = require('metalsmith-markdown'),
    templates  = require('metalsmith-templates'),
    collections= require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    Handlebars = require('handlebars'),
    fs         = require('fs');

Metalsmith(__dirname)
  .use(collections({
    pages: {
      pattern: 'content/pages/*.md'
     },
    posts: {
      pattern: 'content/posts/*.md',
      sortBy: 'date',
      reverse: true
     }
   }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
   }))
  .use(templates('handlebars'))
  .destination('./build')
  .build()

  Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/partials/header.handlebars').toString());
  Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/partials/footer.handlebars').toString());