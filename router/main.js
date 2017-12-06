var server = require("../app");
var ObjectId = require('mongodb').ObjectID;

module.exports = function(app)
{
    app.get('/professora',function(req,res){
        res.render('professora.html');
    });
    app.get('/alunos',function(req,res){
        res.render('alunos.html');
    });
    app.get('/ditados',function(req,res){
        res.render('ditados.html');
    });
    app.get('/carregarDitados', function(req,res){
        var ditados;
        (server.db).collection('DitadoDigital').find().toArray(function(err, results) {
            res.end(JSON.stringify(results));
        });
    });
    app.get('/ativarDitado', function (req, res) {
        var ditadoID = req.query.ditadoID;

        var myquery = { _id: ObjectId(ditadoID)};
        var newValue = {$set: {status: 'ativo'}};

        (server.db).collection('DitadoDigital').update(
            myquery,
            newValue
        );

        var newQuery = {_id: { $ne : ObjectId(ditadoID)}};

        (server.db).collection('DitadoDigital').updateMany(newQuery, {$set: {status: 'inativo'}});

        res.end();
    });


    app.post('/salvarDitado', function (req, res) {
        (server.db).collection('DitadoDigital').insert(
            {
                'status': 'inativo',
                'palavras' : req.body
            },
            function(err, result) {
                if (err) return console.log(err);
                console.log('saved to database');
                res.redirect('/ditados');
            });
    });
};