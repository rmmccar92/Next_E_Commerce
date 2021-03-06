import bcrypt from "bcryptjs";

const data = {
  users: [
    {
      firstName: "John",
      lastName: "Doe",
      email: "admin@admin.com",
      password: bcrypt.hashSync("test123", 10),
      isAdmin: true,
    },
    {
      firstName: "Jane",
      lastName: "Doe",
      email: "e@e.com",
      password: bcrypt.hashSync("test123", 10),
      isAdmin: false,
    },
  ],

  products: [
    {
      name: "Block",
      slug: "block",
      category: "Toy",
      image: "/images/alphabet-blocks.jpg",
      price: 10,
      brand: "Disney",
      rating: 4.5,
      numReviews: 10,
      countInStock: 20,
      description: "A toy block",
    },
    {
      name: "Bedtime Book",
      slug: "bedtime-book",
      category: "Books",
      image: "/images/bedtime-book.jpg",
      price: 12,
      brand: "Disney",
      rating: 3.5,
      numReviews: 12,
      countInStock: 42,
      description: "A bedtime book",
    },
    {
      name: "Camera",
      slug: "camera",
      category: "Photography",
      image: "/images/camera.jpg",
      price: 350,
      brand: "Nikon",
      rating: 4.8,
      numReviews: 100,
      countInStock: 50,
      description: "A camera",
    },
    {
      name: "Coffee",
      slug: "coffee",
      category: "Pantry",
      image: "/images/canned-coffee.jpg",
      price: 5,
      brand: "Nestle",
      rating: 3.8,
      numReviews: 70,
      countInStock: 200,
      description: "A can of coffee",
    },
    {
      name: "Cookie Tin",
      slug: "cookie-tin",
      category: "Pantry",
      image: "/images/cookie-tin.jpg",
      price: 3,
      brand: "Nestle",
      rating: 4.0,
      numReviews: 5,
      countInStock: 58,
      description: "A cookie tin",
    },
    {
      name: "Horse Toy",
      slug: "horse-toy",
      category: "Toy",
      image: "/images/plastic-horses.jpg",
      price: 4000.03,
      brand: "ToyMaker",
      rating: 5.0,
      numReviews: 1000,
      countInStock: 88,
      description: "An amazing set of plastic horses",
    },
    {
      name: "Soap",
      slug: "soap",
      category: "Bathroom",
      image: "/images/soap.jpg",
      price: 1,
      brand: "Dove",
      rating: 2.0,
      numReviews: 10,
      countInStock: 250,
      description: "Some soap I don't know.",
    },
    {
      name: "Top",
      slug: "top",
      category: "Toys",
      image: "/images/spinning-top.jpg",
      price: 1.75,
      brand: "M&M",
      rating: 3.5,
      numReviews: 26,
      countInStock: 100,
      description: "Wow cool top.",
    },
    {
      name: "Tablet",
      slug: "tablet",
      category: "Electronics",
      image: "/images/tablet.jpg",
      price: 1000,
      brand: "Samsung",
      rating: 4.2,
      numReviews: 650,
      countInStock: 800,
      description: "This store has a lot of things.",
    },
    {
      name: "Teddy Bear",
      slug: "teddy-bear",
      category: "Toys",
      image: "/images/teddy-bear.jpg",
      price: 10,
      brand: "BaB",
      rating: 4.4,
      numReviews: 68,
      countInStock: 812,
      description: "A stuffed bear.",
    },
    {
      name: "Toilet Paper",
      slug: "toilet-paper",
      category: "Bathroom",
      image: "/images/toilet-paper.jpg",
      price: 1000,
      brand: "Bounty",
      rating: 4.5,
      numReviews: 74,
      countInStock: 0,
      description: "Gold.",
    },
    {
      name: "Wooden Spoons",
      slug: "wooden-spoons",
      category: "Utensils",
      image: "/images/wooden-spoons.jpg",
      price: 4.5,
      brand: "Wood",
      rating: 3.2,
      numReviews: 80,
      countInStock: 16,
      description: "Some wood spoons don't buy this.",
    },
  ],
};
export default data;
