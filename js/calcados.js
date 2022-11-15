const database = [
    {
      id: 1,
      img: "../img/jaqueta.svg",
      nameItem: "Lightweight Jacket",
      description:
        "Adicione um pouco de energia ao seu guarda-roupa de inverno com esta jaqueta vibrante...",
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
        img.src = 'https://cdn-icons-png.flaticon.com/512/91/91453.png'
        img.classList.add('cardImg')
        let nomeProd = document.createElement('span')
        nomeProd.innerText = 'Nada por aqui...'
        nomeProd.classList.add('cardNome')
        ulProdutos.appendChild(li)
        li.appendChild(img)
        li.appendChild(nomeProd)
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

