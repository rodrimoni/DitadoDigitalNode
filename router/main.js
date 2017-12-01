module.exports = function(app)
{
    app.get('/professora',function(req,res){
        res.render('professora.html');
    });
    app.get('/alunos',function(req,res){
        res.render('alunos.html');
    });
    app.post('/salvarDitado', function (req, res) {
        salvarDitado(req.body);
        res.redirect('/professora');
    });
};

var salvarDitado = function(palavras) {
    var fs = require('fs');
    var filePath = "public/ditados.json";
    if (fs.existsSync(filePath)) {
        fs.readFile(filePath, 'utf8', function readFileCallback(err, data){
            if (err){
                console.log(err);
            } else {
                var DitadoDigital = JSON.parse(data); //now it an object
                console.log(DitadoDigital);
                var id = DitadoDigital.Ditados.length + 1;
                DitadoDigital.Ditados.push({id: id,  status: "inativo", palavras: palavras}); //add some data
                json = JSON.stringify(DitadoDigital); //convert it back to json
                fs.writeFile(filePath, json, 'utf8'); // write it back
            }});
    }
    else {
        var DitadoDigital = {
            Ditados: []
        };
        DitadoDigital.Ditados.push({id: 1, status: "inativo", palavras: palavras });
        var json = JSON.stringify(DitadoDigital);
        fs.writeFile(filePath, json, 'utf8');
    }
};