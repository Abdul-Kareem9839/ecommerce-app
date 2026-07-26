import Product from "../models/Product.js";

// @desc  Get all products with search, filter, pagination
// @route GET /api/products
export const getProducts = async (req, res) => {
  const { search, category, minPrice, maxPrice, sort } = req.query;

  const query = {};

  if (search) {
    query.name = { $regex: search, $options: "i" };
  }
  if (category && category !== "all") {
    query.category = category;
  }
  if (minPrice || maxPrice) {
    query.price = {};
    if (minPrice) query.price.$gte = Number(minPrice);
    if (maxPrice) query.price.$lte = Number(maxPrice);
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price_asc") sortOption = { price: 1 };
  if (sort === "price_desc") sortOption = { price: -1 };
  if (sort === "name_asc") sortOption = { name: 1 };

  const products = await Product.find(query).sort(sortOption);
  res.json(products);
};

// @desc  Get distinct categories
// @route GET /api/products/categories
export const getCategories = async (req, res) => {
  const categories = await Product.distinct("category");
  res.json(categories);
};

// @desc  Get single product
// @route GET /api/products/:id
export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  res.json(product);
};

// @desc  Create product (admin)
// @route POST /api/products
export const createProduct = async (req, res) => {
  const { name, imageUrl, category, price, description, stock } = req.body;
  if (!name || !imageUrl || !category || price === undefined || !description) {
    return res.status(400).json({ message: "Missing required product fields" });
  }
  const product = await Product.create({
    name,
    imageUrl,
    category,
    price,
    description,
    stock: stock ?? 0,
  });
  res.status(201).json(product);
};

// @desc  Update product (admin)
// @route PUT /api/products/:id
export const updateProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });

  Object.assign(product, req.body);
  const updated = await product.save();
  res.json(updated);
};

// @desc  Delete product (admin)
// @route DELETE /api/products/:id
export const deleteProduct = async (req, res) => {
  const product = await Product.findById(req.params.id);
  if (!product) return res.status(404).json({ message: "Product not found" });
  await product.deleteOne();
  res.json({ message: "Product deleted" });
};
