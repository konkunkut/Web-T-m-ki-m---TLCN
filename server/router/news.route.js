const express = require('express');
const route = express.Router();
const authentication = require('../Authen/login.authen');
const news =require('../controllers/News.controler');
const {Aclclass} = require('../helper/acl_store.heiper');
const acl= Aclclass.getAcl;

//console.log(acl.Aclclass.getAcl);
//UserRouterAboveNews
route.post('/createNewsbyUser',authentication.checkOauthToken,acl.middleware(2),news.createNews);
route.delete('/deleteNews/:idNews',authentication.checkOauthToken,acl.middleware(2),news.removeNews);
route.put('/editNews/:idNews',authentication.checkOauthToken,acl.middleware(2),news.editNews);
route.get('/getNews/:newsId',news.getNewsId);
route.get('/getAllTags/:tags',news.getNewsTagsAll);
route.get('/getAllNews',news.getNewsAll);
route.get('/getNewsLimit/:page',news.getNewsLimit);
route.get('/getNewNews',news.getNewNews);
route.get('/getNewsTotal',news.getNewsTotal)

module.exports = route;