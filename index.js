var Metalsmith  = require('metalsmith'),
    markdown    = require('metalsmith-markdown'),
    templates   = require('metalsmith-templates'),
    collections = require('metalsmith-collections'),
    permalinks  = require('metalsmith-permalinks'),
    drafts      = require('metalsmith-drafts'),
    copy        = require('metalsmith-copy'),
    Handlebars  = require('handlebars'),
    fs          = require('fs');

Metalsmith(__dirname)
  .use(drafts()) // add draft: true to front-matter in .md files
  .use(collections({
    // p: {
    //   pattern: 'pages/*.md'
    //  },
    posts: {
      pattern: 'posts/*.md',
      sortBy: 'date',
      reverse: true
     }
   }))
  .use(markdown())
  .use(permalinks({
    pattern: ':collection/:title'
   }))
  .use(templates('handlebars'))
  .use(copy({
    pattern: 'CNAMESRC',
    // extension: false
    transform: function (file) {
      return 'CNAME';
    }
   }))
  .destination('./build')
  .build()


  Handlebars.registerPartial('header', fs.readFileSync(__dirname + '/templates/header.handlebars').toString());
  Handlebars.registerPartial('footer', fs.readFileSync(__dirname + '/templates/footer.handlebars').toString());
