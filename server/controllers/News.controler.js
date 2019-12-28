const News = require('../models/news.model');
const datetime = require('date-time');

const createNews = (req, res) => {
    req.body.id_user = req.decoded._id;
    //req.body.date = datetime({showTimeZone: true});
    console.log(datetime({ showTimeZone: true }));
    const news = new News(req.body);
    news.save((err, result) => {
        if (err) {
            return res.status('400').json(err);
        }
        return res.status(201).json({ massge: 'Created successful posts' });
    })
}
const getNewsId = (req, res) => {
    const newsId = req.params.newsId;
    //console.log(req.query.newsId);
    News.findById(newsId, (err, news) => {
        //console.log(news);
        if (err) {
            return res.status(401).json(err);
        }
        if (!news) {
            return res.status(204).json({ massage: 'not found' });
        }
        else {
            return res.status(200).json(news);
        }
    })
}
const getNewsTagsAll = (req, res) => {
    let typeTags = req.params.tags;
    News.find(typeTags, (err, listnews) => {
        //console.log(listnews);
        if (err) {
            return res.status('401').json(err);
        }
        if (!listnews) {
            return res.status('400').json({ massage: 'not found' });
        }
        else {
            return res.status('200').json(listnews);
        }
    })
}
const getNewsAll = (req, res) => {
    News.find((err, arrayNews) => {
        console.log(arrayNews);
        if (err) {
            return res.status('401').json(err);
        }
        if (!arrayNews) {
            return res.status('400').json({ massage: 'not found' });
        }
        else {
            return res.status('200').json(arrayNews);
        }
    })
}
const editNews = (req, res) => {
    News.updateOne({ _id: req.params.idNews, id_user: req.decoded._id }, req.body, (err, result) => {
        console.log(req.decoded._id)
        console.log(req.params.idNews)
        console.log(req.body);

        if (err) {
            res.status('400').json(err);
        }
        else {
            if (result) {
                res.status('200').json({ message: 'edited success!' });
            }
            else {
                res.status('200').json({ message: 'edit unsuccessful!' });
            }
        }
    })
}
const removeNews = (req, res) => {
    let id_News = req.params.idNews;
    let id_User = req.decoded._id;
    News.findOneAndDelete({ _id: id_News, id_user: id_User }, (err, result) => {
        console.log('son dep tria 1998');

        if (err) {

            return res.status('401').json(err);
        }
        if (result) {
            return res.status('200').json({ massage: 'success' });
        }
        else {
            console.log(result)
            return res.status('400').json({ massage: 'id not found' });
        }
    });

}
const getNewsLimit = (req, res) => {
    const p = req.params.page;
    News.find({})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .limit(3)
        .sort({ date: -1 })
        .skip(3 * (p - 1))
        .exec((err, result) => {
            if (err) {
                res.status('404').json(err);
            }
            if (result) {
                return res.status('200').json(result);
            }
            else {
                return res.status('204').json({ message: "not found News" });
            }

        });

}
const getNewNews = (req, res) => {
    News.find({})
        .populate({ path: 'id_user', select: ['fistname', 'lastname'] })
        .limit(5)
        .sort({ date: -1 })
        .skip(0)
        .exec((err, result) => {
            if (err) {
                res.status('404').json(err);
            }
            if (result) {
                return res.status('200').json(result);
            }
            else{
                return res.status('204').json({ message: "not found News" });
            }
        });
}

const getNewsTotal = (req,res)=>{
    News.estimatedDocumentCount((err,count)=>{
        if(err){
            return res.status('400').json({
                data:null,
                message:'khong lay duoc',
                success: false
            })
        }
        else{
            return res.status('200').json({
                message:'lay thanh cong',
                success: true,
                date: count
            })
        }
    })
}
module.exports = {
    createNews: createNews,
    getNewsId: getNewsId,
    getNewsTagsAll: getNewsTagsAll,
    getNewsAll: getNewsAll,
    removeNews: removeNews,
    editNews: editNews,
    getNewsLimit: getNewsLimit,
    getNewNews: getNewNews,
    getNewsTotal:getNewsTotal
}