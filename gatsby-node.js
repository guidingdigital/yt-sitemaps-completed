const path = require(`path`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions
  const result = await graphql(`
    query {
        allInternalPosts(filter: {id: {ne: "dummy"}}) {
        edges {
          node {
            name
            edited
          }
        }
      }
    }
  `)

  result.data.allInternalPosts.edges.forEach(({ node }) => {
    const friendlyPageName = (node.name) ? node.name.toLowerCase().replace(" ", "-") : null;
    createPage({
      component: path.resolve(`./src/templates/post.js`),
      path: '/posts/' + friendlyPageName,
      context: {
        edited: node.edited
      },
    })
  })
}