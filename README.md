E-commerce web api.

About The Project.

This is an ecommerce API built with NodeJs and MongoDB. It features full CRUD ability on products, cart, payment.
Built With
  - NodeJs
    + Mongoose
    + Express
  - MongoDB
    + Database management
   
Feature : 
  - Product :
    + Add Product :
      Url : http://localhost:3000/api/product/create
      JSON :
      {
          "name" : "Product Name",
          "description" : "Product description",
          "price" : Product Price(Number)
      }
    + Update Product :
      Url : http://localhost:3000/api/product/update/:id(Product ID)
      JSON :
      {
          "name" : "Product Name",
          "description" : "Product description",
          "price" : Product Price(Number)
      }
    + Get All Product :
      Url : http://localhost:3000/api/product/getAll
    + Delete Product :
      Url : http://localhost:3000/api/product/delete/:id(Product ID)

  - Cart :
    + Add Cart :
      Url : http://localhost:3000/api/cart/create
      JSON :
      {
          "productId":"Product ID",
          "qty" : Product Quantity (Number),
          "status" : "Cart Status"
      }
    + Update Cart :
      Url : http://localhost:3000/api/cart/update/:id(Cart ID)
      JSON :
      {
          "productId":"Product ID",
          "qty" : Product Quantity (Number),
          "status" : "Cart Status"
      }
    + Delete Product :
      Url : http://localhost:3000/api/cart/delete/:id(Product ID)
  - Payment :
    + Add Payment :
      Url : http://localhost:3000/api/payment/create
      JSON :
      {
          "cartId" : "Cart ID",
          "paymentMethod" : "Payment Method",
          "status" : "Cart Status"
      }
        
