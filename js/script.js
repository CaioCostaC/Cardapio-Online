$(document).ready(function (){
    cardapio.eventos.init();
})

var cardapio = {};

cardapio.eventos = {
    init: () => {
        cardapio.metodos.obterItensCardapio(); 
    },
};

cardapio.metodos = {
    // Obtem a lista dos itens no cardápio
    obterItensCardapio: (categoria = 'burgers', verMais = false) => {
        var filtro = MENU[categoria];
        console.log(filtro);

        if (!verMais){
            $("#itensCardapio").html("");
            $("#btnVerMais").removeClass("hidden");
        } 


        $.each(filtro, (i, e) => {
            let temp = cardapio.templates.item.replace(/\${img}/g, e.img)
            .replace(/\${name}/g, e.name)
            .replace(/\${price}/g, e.price.toFixed(2).replace(".", ","));

            // Botão ver mais para mostrar 12 itens
            if (verMais && i >= 8 && i < 12){
                $("#itensCardapio").append(temp);
            }

            // Paginação inicial (8 itens)
            if (!verMais && i < 8){
                $("#itensCardapio").append(temp);
            }

        })
        //  Remove o ativo
        $(".container-menu a").removeClass("active");

        // Ativa o menu
        $("#menu-" + categoria).addClass("active");

    },

    // Clique no botão de ver mais
    verMais: () => {
        var ativo =  $(".container-menu a.active").attr('id').split('menu-')[1];
        cardapio.metodos.obterItensCardapio(ativo, true);
    
        $("#btnVerMais").addClass("hidden");
    },

};

cardapio.templates = {
    item: 
        `
        <div class="col-3 mb-5">
            <div class="card card-item">
                <div class="img-produto">
                    <img src="\${img}" alt="">
                </div>
                <p class="title-produto text-center mt-4">
                    <b>\${name}</b>
                </p>
                <div class="price-produto text-center">
                    <b>R$ \${price}</b>
                </div>
                <div class="add-carrinho">
                    <span class="btn-menos"><i class="fas fa-minus"></i></span>
                    <span class="add-numero-itens">0</span>
                    <span class="btn-mais"><i class="fas fa-plus"></i></span>
                    <span class="btn btn-add"><i class="fa fa-shopping-bag"></i></span>
                </div>
            </div>
        </div> `
};
