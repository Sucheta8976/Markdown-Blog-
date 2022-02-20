const express = require('express');
const mongoose = require('mongoose');
const Article = require('./models/article')
const articleRouter = require('./routes/articles');
const methodOverride = require('method-override');
const app = express();
const PORT = process.env.PORT || 5000;

mongoose.connect('mongodb+srv://admin:admin789@cluster0.4ik4f.mongodb.net/blog?retryWrites=true&w=majority');

app.set('view engine','ejs');
app.use(express.urlencoded({ extended: false}))
app.use(methodOverride('_method'))


app.get('/',async (req,res)=>{
    const articles = await Article.find().sort({createdAt: 'desc'})
    res.render("articles/index",{articles: articles}); //Passing values from our server to the browser by using ejs
})

app.use('/articles', articleRouter);

app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`);
});