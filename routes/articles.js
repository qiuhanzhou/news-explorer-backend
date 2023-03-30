// create the router
const router = require('express').Router()
const {
  validateArticleId,
  saveArticleValidation,
} = require('../middlewares/validation')

const {
  getUserArticles,
  saveArticle,
  deleteArticle,
} = require('../controllers/articles')

router.get('/articles', getUserArticles)
router.post('/articles', saveArticleValidation, saveArticle)
router.delete('/articles/:articleId', validateArticleId, deleteArticle)

module.exports = router
