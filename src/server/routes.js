var router = require('express').Router();
var four0four = require('./utils/404')();
var data = require('./data');

router.get('/projects', getProjects);
router.get('/project/:id', getProject);
router.get('/*', four0four.notFoundMiddleware);

module.exports = router;

//////////////

function getProjects(req, res, next) {
  res.status(200).send(data.projects);
}

function getProject(req, res, next) {
  var id = +req.params.id;
  var project = data.projects.filter(function (p) {
    return p.id === id;
  })[0];

  if (project) {
    res.status(200).send(project);
  } else {
    four0four.send404(req, res, 'project ' + id + ' not found');
  }
}
