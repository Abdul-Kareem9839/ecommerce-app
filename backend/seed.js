import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Product from "./models/Product.js";
import User from "./models/User.js";

dotenv.config();
await connectDB();

const sampleProducts = [
  {
    name: "Wireless Noise-Cancelling Headphones",
    imageUrl: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
    category: "Electronics",
    price: 149.99,
    description: "Over-ear wireless headphones with active noise cancellation and 30-hour battery life.",
    stock: 25,
  },
  {
    name: "Smart Fitness Watch",
    imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600",
    category: "Electronics",
    price: 89.99,
    description: "Track heart rate, sleep, and workouts with this lightweight smart fitness watch.",
    stock: 40,
  },
  {
    name: "Minimalist Leather Backpack",
    imageUrl: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
    category: "Accessories",
    price: 59.5,
    description: "Handcrafted leather backpack with padded laptop compartment.",
    stock: 15,
  },
  {
    name: "Ceramic Pour-Over Coffee Set",
    imageUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=600",
    category: "Home",
    price: 34.0,
    description: "Hand-glazed ceramic dripper and carafe set for the perfect pour-over.",
    stock: 30,
  },
  {
    name: "Organic Cotton T-Shirt",
    imageUrl: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600",
    category: "Apparel",
    price: 19.99,
    description: "Soft, breathable organic cotton t-shirt available in classic fit.",
    stock: 100,
  },
  {
    name: "Portable Bluetooth Speaker",
    imageUrl: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=600",
    category: "Electronics",
    price: 45.0,
    description: "Compact waterproof speaker with rich bass and 12-hour playtime.",
    stock: 50,
  },
  {
    name: "Stainless Steel Water Bottle",
    imageUrl: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=600",
    category: "Accessories",
    price: 24.99,
    description: "Double-walled insulated bottle that keeps drinks cold for 24 hours.",
    stock: 60,
  },
  {
    name: "Scented Soy Candle Trio",
    imageUrl: "https://images.unsplash.com/photo-1602874801007-bd458bb1b8b6?w=600",
    category: "Home",
    price: 28.0,
    description: "Set of three hand-poured soy candles in warm, cozy scents.",
    stock: 45,
  },
  {
    name: "Running Sneakers",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600",
    category: "Apparel",
    price: 79.99,
    description: "Lightweight running shoes with responsive cushioning.",
    stock: 35,
  },
  {
    name: "Mechanical Keyboard",
    imageUrl: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=600",
    category: "Electronics",
    price: 99.0,
    description: "Hot-swappable mechanical keyboard with RGB backlighting.",
    stock: 20,
  },
];

const seed = async () => {
  try {
    await Product.deleteMany();
    await Product.insertMany(sampleProducts);
    console.log("Products seeded");

    const adminEmail = (process.env.ADMIN_EMAIL || "admin@example.com").toLowerCase();
    const adminPassword = process.env.ADMIN_PASSWORD || "Admin@12345";

    const existingAdmin = await User.findOne({ email: adminEmail });
    if (existingAdmin) {
      existingAdmin.password = adminPassword;
      existingAdmin.role = "admin";
      await existingAdmin.save();
      console.log("Admin user updated:", adminEmail);
    } else {
      await User.create({
        name: "Admin",
        email: adminEmail,
        password: adminPassword,
        role: "admin",
      });
      console.log("Admin user created:", adminEmail);
    }

    console.log("Seeding complete");
    process.exit(0);
  } catch (err) {
    console.error("Seeding error:", err);
    process.exit(1);
  }
};

seed();
