import express from "express";
import cors from "cors";
import { ProductManagerFiles } from "./persistence/productManagerFiles.js";

const managerProductService = new ProductManagerFiles(
  "./src/files/products.json"
);

const port = 8080;
const app = express();
app.use(cors());
app.listen(port, () => console.log("server running"));

app.get("/products", async (req, res) => {
  try {
    //add products
    await managerProductService.addProduct({
      title: "Hoodie Galaxy",
      description: "Black oversize hoodie",
      price: 15500,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800305/hoodieGalaxy_mfam50.jpg",
      code: "PROD1",
      stock: 1,
    });
    await managerProductService.addProduct({
      title: "Cosmo Dress",
      description: "Short black strapless leather dress",
      price: 13000,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800303/cosmoDress_e6b1ry.jpg",
      code: "PROD2",
      stock: 2,
    });
    await managerProductService.addProduct({
      title: "Corset Venus",
      description: "Black corset with thin straps",
      price: 11500,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800304/corsetVenus_hsuwrd.jpg",
      code: "PROD3",
      stock: 3,
    });
    await managerProductService.addProduct({
      title: "Sky Skirt",
      description: "Denim skirt with front pockets",
      price: 14300,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800306/skySkirt_dkuofw.jpg",
      code: "PROD4",
      stock: 4,
    });
    await managerProductService.addProduct({
      title: "Cosmo Pants",
      description: "Denim cargo pant",
      price: 14200,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800304/cosmoPants_wnbnjp.jpg",
      code: "PROD5",
      stock: 5,
    });
    await managerProductService.addProduct({
      title: "Body Nebula",
      description: "Asymmetrical black bodysuit, single long sleeve",
      price: 9800,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800304/bodyNebula_hc6zq5.jpg",
      code: "PROD6",
      stock: 6,
    });
    await managerProductService.addProduct({
      title: "Sunlight Dress",
      description:
        "Black dress with straight neckline & thin straps, ideal for day or night",
      price: 12300,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800307/sunlightDress_mzbge7.jpg",
      code: "PROD7",
      stock: 7,
    });
    await managerProductService.addProduct({
      title: "Saturn Pants",
      description: "Straight black leather pant",
      price: 16400,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800306/saturnPants_wax3z4.jpg",
      code: "PROD8",
      stock: 8,
    });
    await managerProductService.addProduct({
      title: "Space Shirt",
      description: "Graphite gray oversize t-shirt with front stamp",
      price: 10200,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800306/spaceShirt_veoey5.jpg",
      code: "PROD9",
      stock: 9,
    });
    await managerProductService.addProduct({
      title: "Moon Set",
      description:
        "Black leather blazer & pant set. Oversize, super comfy & classy",
      price: 17300,
      thumbnail:
        "https://res.cloudinary.com/dqrgdohtt/image/upload/v1687800305/moonSet_b8o7yc.jpg",
      code: "PROD10",
      stock: 10,
    });

    //get products
    const allProducts = await managerProductService.getProduct();

    //limite de resultados
    const { limit } = req.query;
    const limitNumber = parseInt(limit);

    if (limit) {
      const productsLimit = allProducts.slice(0, limitNumber);
      res.send(productsLimit);
    } else {
      res.send({ allProducts });
    }
  } catch (error) {
    res.send(error.message);
  }
});

//product id
app.get("/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;
    const parsedProductId = parseInt(productId);
    const product = await managerProductService.getProductById(parsedProductId);
    if (product) {
      res.send(product);
    } else {
      res.send("id not found");
    }
  } catch (error) {
    res.send(error.message);
  }
});
