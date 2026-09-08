CREATE TABLE IF NOT EXISTS produtos (
    id_produto INT AUTO_INCREMENT PRIMARY KEY,
    codigo VARCHAR(50) NOT NULL UNIQUE,
    nome VARCHAR(150) NOT NULL,
    descricao VARCHAR(255),
    preco_custo DECIMAL(10,2) NOT NULL,
    preco_venda DECIMAL(10,2) NOT NULL,
    estoque_minimo INT NOT NULL DEFAULT 10,
    id_categoria INT NOT NULL,

    CONSTRAINT fk_produto_categoria
        FOREIGN KEY (id_categoria)
        REFERENCES categorias(id_categoria),

    CONSTRAINT chk_preco_custo
        CHECK (preco_custo >= 0),

    CONSTRAINT chk_preco_venda
        CHECK (preco_venda >= 0),

    CONSTRAINT chk_estoque_minimo
        CHECK (estoque_minimo >= 0)
);