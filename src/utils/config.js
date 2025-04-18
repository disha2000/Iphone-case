export const stepsConfig = [
  {
    description: " Add image Choose an image for your case",
    image: "/gallery_10054339.png",
  },
  {
    description: "Customize design Make the case yours",
    image: "/content-management_9751906.png",
  },
  {
    description: "Summary Review your final design",
    image: "/folder_2901184.png",
  },
];

export const materialsConfig = [
  {
    title: "Silicone",
    price: 0,
    description: "",
  },
  {
    title: "Soft Polycarbonate",
    price: 5.0,
    description: "Scratch-resistant coating",
  },
];

export const iphoneColorsConfig = [
  {
    color: "black",
    className: "bg-black",
    outline: "outline-black",
  },
  {
    color: "red",
    className: "bg-red-950",
    outline: "outline-red-950",
  },
  {
    color: "blue",
    className: "bg-blue-950",
    outline: "outline-blue-950",
  },
];

export const finishesConfig = [
  {
    title: "Smooth Finish",
    price: 0,
    description: "",
  },
  {
    title: "Textured Finish",
    price: 3,
    description: "Soft grippy texture",
  },
];

export const mobileListConfig = [
  { value: "iPhone X" },
  { value: "iPhone 11" },
  { value: "iPhone 12" },
];

export const ImageURL = `https://res.cloudinary.com/do2lx5yjd/image/upload/`;


export const sortOptions = [
  {
    id: 0,
    name: "Default Sorting",
    field: "createdAt",
    order: "asc",
  },
  {
    id: 1,
    name: "Sort by price: low to High",
    field: "price",
    order: "asc",
  },
  {
    id: 2,
    name: "Sort by price: high to low",
    field: "price",
    order: "desc",
  },
  {
    id: 3,
    name: "Latest",
    field: "createdAt",
    order: "desc",
  },
];