const livros = require("../model/livros.json");
const fs = require("fs");

const getAll = (req, res) => {
    res.send(livros);
};

const getById = (req, res) => {
    const id = req.params.id;

    res.status(200).send(livros.find((livro) => livro.id == id));
};

const getByCategoria = (req, res) => {
    const categoria = req.params.categoria;
    console.log(categoria);
   
    res.status(200).send(livros.filter(livro => livro.categoria === categoria));
};

const postLivro = (req, res) => {
    console.log(req.body);
    const { id, titulo, autoria, editora, paginas, categoria } = req.body;
    colaboradoras.push({ id, titulo, autoria, editora, paginas, categoria });

    fs.writeFile("./src/model/livros.json", JSON.stringify(livros), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");

    });

    res.status(201).send(livros);
};

const deleteLivro = (req, res) => {
    const id = req.params.id;
    const livroFiltrado = livros.find((livro) => livro.id == id);
    const index = livros.indexOf(livroFiltrado);

    livros.splice(index, 1);

    res.status(200).send(livros);

    fs.writeFile("./src/model/livros.json", JSON.stringify(livros), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
    });
    res.status(200).send(livros);
};

const putLivro = (req, res) => {
    const id = req.params.id;
    const livroASerModificado = livros.find((livro) => livro.id == id);
    const livroAtualizado = req.body;
    const index = livros.indexOf(livroASerModificado);
    livroASerModificado.titulo = livroAtualizado.titulo;

    livros.splice(index, 1, livroASerModificado);

    fs.writeFile("./src/model/livros.json", JSON.stringify(livros), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        };
        console.log("Arquivo atualizado com sucesso");
    });

    res.status(200).send(livros);
};

const patchLivro = (req, res) => {
    const id = req.params.id;
    const atualizacao = req.body;
    
    const livroASerModificado = livros.find((livro) => livro.id == id);

    const index = livros.indexOf(livroASerModificado);
    
    Object.keys(atualizacao).forEach((chave) => {
        livroASerModificado[chave] = atualizacao[chave]
    });

    livros.splice(index, 1, livroASerModificado);

    fs.writeFile("./src/model/livros.json", JSON.stringify(livros), 'utf8', function (err) {
        if (err) {
            return res.status(424).send({ message: err });
        }
        console.log("Arquivo atualizado com sucesso!");
    });

    res.status(200).send(livros);
};


module.exports = {
    getAll,
    getById,
    getByCategoria,
    postLivro,
    deleteLivro,
    putLivro,
    patchLivro,
};