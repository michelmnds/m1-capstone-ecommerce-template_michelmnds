const database = [
    {
      id: 1,
      img: "./img/jaqueta.svg",
      nameItem: "Lightweight Jacket",
      description:
        "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 2,
      img: "./img/gorro.svg",
      nameItem: "Black Hat",
      description:
        "O gorro Next.js chegou! Esta beldade bordada tem um ajuste confortável que garante que...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 3,
      img: "./img/mascara.svg",
      nameItem: "Mask",
      description:
        "Esta máscara facial durável é feita de duas camadas de tecido tratado e possui presilhas...",
      value: 40,
      addCart: "Adicionar ao carrinho",
      tag: ["Acessórios"],
    },
    {
      id: 4,
      img: "./img/camiseta_preta.svg",
      nameItem: "T-Shirt",
      description:
        "Esta t-shirt é imprescindível no seu guarda-roupa, combinando o caimento intemporal de...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 5,
      img: "./img/camiseta_branca.svg",
      nameItem: "Short-Sleeve T-Shirt",
      description:
        "Agora você encontrou a camiseta básica do seu guarda-roupa. É feito de um mais grosso...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
    {
      id: 6,
      img: "./img/moletom.svg",
      nameItem: "Champion Packable Jacket",
      description:
        "Proteja-se dos elementos com esta jaqueta embalável Champion. Esta jaqueta de poliést...",
      value: 100,
      addCart: "Adicionar ao carrinho",
      tag: ["Camisetas"],
    },
]
let contador = 0 
let preco = 0

let body = document.querySelector('body')
let todos = document.querySelector('#todos')
let acessorios = document.querySelector('#acessorios')
let calcados = document.querySelector('#calcados')
let camisetas = document.querySelector('#camisetas')
let pesquisa = document.querySelector('.pesquisa')
let main = document.querySelector('main')
let txtNav = document.querySelector('.txtNav')
let txtDentro = document.querySelector('.txtDentro')
let divProd = document.querySelector('#produtos')
let divLateral = document.querySelector('#lateral')
let prodDuplicado = document.querySelector('.prodDuplicado')
let carrinhoBottom = document.querySelector('.carrinhoBottom')
let ulProdutos = document.createElement('ul')

//
divProd.appendChild(ulProdutos)

function criarCards(database){
    for (let i = 0; i < database.length; i++){
        let li = document.createElement('li')
        li.id = database[i].id
        let img = document.createElement('img')
        img.src = database[i].img
        img.classList.add('cardImg')
        let tag = document.createElement('span')
        tag.innerHTML = database[i].tag
        tag.classList.add('cardTag')
        let nomeProd = document.createElement('span')
        nomeProd.innerText = database[i].nameItem
        nomeProd.classList.add('cardNome')
        let descricaoProd = document.createElement('span')
        descricaoProd.innerText = database[i].description
        descricaoProd.classList.add('cardDisc')
        let precoProd = document.createElement('span')
        precoProd.innerText = `R$${database[i].value},00`
        precoProd.classList.add('cardPreco')
        let addCarrinho = document.createElement('span')
        addCarrinho.innerText = database[i].addCart
        addCarrinho.classList.add('cardAdd')
        addCarrinho.id = database[i].id

        ulProdutos.appendChild(li)
        li.appendChild(img)
        li.appendChild(tag)
        li.appendChild(nomeProd)
        li.appendChild(descricaoProd)
        li.appendChild(precoProd)
        li.appendChild(addCarrinho)

    }
}
criarCards(database)

let btnAdd = document.querySelectorAll('.cardAdd')

for (let i = 0; i < btnAdd.length; i++){
    let btn = btnAdd[i]

    btn.addEventListener('click', function(e){
        let idElemento = e.target.id
        let id = idElemento
        
        if(verificaProd(id) == false){
            contador++
            document.querySelector('#prodQuantidade').innerHTML = contador

            preco += database[i].value
            document.querySelector('#prodPreco').innerHTML = `R$${preco},00`

            let produto = procuraProd(id)

            let prodElement = adicionarProdAoCarrinho(produto)

            prodDuplicado.appendChild(prodElement)
        
            txtDentro.remove()
            txtDentro = false
        }
        
    })
}


function procuraProd(id){
    for (let i = 0; i < database.length; i++){
        let produto = database[i]
        
        if (produto.id == id){
            return produto
        }
    }
    return "Produto não encontrado"
}

function adicionarProdAoCarrinho(produto){
        let li = document.createElement('li')
        let img = document.createElement('img')
        img.src = produto.img
        img.classList.add('cardDupImg')
        let precoProd = document.createElement('span')
        precoProd.innerText = `R$${produto.value},00`
        precoProd.classList.add('cardPreco')
        let addCarrinho = document.createElement('span')
        addCarrinho.innerText = "Remover"
        addCarrinho.classList.add('cardAdd')
        addCarrinho.id = produto.id

        li.id = 'p_' + produto.id

        addCarrinho.addEventListener('click', function(e){
            let li = document.querySelector('#p_'+produto.id)
            li.remove()
            
            contador--
            document.querySelector('#prodQuantidade').innerHTML = contador

            preco -= produto.value
            document.querySelector('#prodPreco').innerHTML = `R$${preco},00`
        })

        prodDuplicado.appendChild(li)
        li.appendChild(img)
        li.appendChild(precoProd)
        li.appendChild(addCarrinho)

        return li
}

function verificaProd(id){
     let elem = document.querySelector('#p_'+id)

     if (elem == null){
        return false
     }
     else{
        return true
     }
} 
