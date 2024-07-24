
function ProductsModel(products){
  if(!products || !Array.isArray(products)){
     return;
  }
  let resProducts = {};

  for(let j = 0; j < products.length; j++){
      let {ProductId,...rest} = products[j];
      resProducts[ProductId] = new ProductModel(rest);
  }

  this.getProductById = (id) => {
      return this.products[id];
  }
  this.products = resProducts;
}

function ProductModel(product){
    if(!product){
        return;
    }

    let {Name,Price} = product;

    this.getProductName = () => {
        return Name;
    }

    this.getProductPrice = () => {
        return Price;
    }



}

export {ProductsModel,ProductModel};