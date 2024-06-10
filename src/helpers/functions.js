//? получение данных из хранилища под ключом cart
export const getLocalStorage = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  return cart;
};

//? подсчёт цены за одну позицию товара
export const calcSubPrice = (elem) => {
  return elem.count * elem.item.price;
};

//? кол-во товаров в корзине
export const getProductsCountInCart = () => {
  let cart = getLocalStorage();
  return cart ? cart.products.length : 0;
};
//? общая сумма
export const calcTotalPrice = (products) => {
  const totalPrice = products.reduce((acc, curr) => acc + curr.subPrice, 0);
  return totalPrice;
};
