const mongoose = require("mongoose");
const cities = require("./cities");
const { places, descriptors } = require("./seedHelpers");
const Campground = require("../models/campground");

main().catch((err) => console.log(`mongo connection error ${err}`));
async function main() {
  await mongoose.connect("mongodb://localhost:27017/yelp-camp").then(() => {
    console.log("mongo connection open");
  });
}

const sample = (array) => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
  await Campground.deleteMany({});
  for (let i = 0; i < 50; i++) {
    const random1000 = Math.floor(Math.random() * 1000);
    const price = Math.floor(Math.random() * 30);
    const camp = new Campground({
      author: "63a63a15be0523bae4b488bf",
      location: `${cities[random1000].city}, ${cities[random1000].state}`,
      title: `${sample(descriptors)} ${sample(places)}`,
      image: [
        {
          url: "https://res.cloudinary.com/dncdggbni/image/upload/v1672030434/YelpCamp/qbkgfzaoa7twlxfsdpyk.jpg",
          filename: "YelpCamp/qbkgfzaoa7twlxfsdpyk",
        },
        {
          url: "https://res.cloudinary.com/dncdggbni/image/upload/v1672030436/YelpCamp/n1fxcnb2c6fl30xnqqhs.jpg",
          filename: "YelpCamp/n1fxcnb2c6fl30xnqqhs",
        },
        {
          url: "https://res.cloudinary.com/dncdggbni/image/upload/v1672030436/YelpCamp/n1fxcnb2c6fl30xnqqhs.jpg",
          filename: "YelpCamp/n1fxcnb2c6fl30xnqqhs",
        },
      ],
      description:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Excepturi inventore praesentium voluptatem ad laboriosam vero impedit voluptas vel reprehenderit deleniti facilis, beatae quam exercitationem quaerat, quos dicta dolore quod soluta!",
      price,
      geometry: {
        type: "Point",
        coordinates: [
          cities[random1000].longitude,
          cities[random1000].latitude,
        ],
      },
    });
    await camp.save();
  }
};
seedDB().then(() => {
  mongoose.connection.close();
});
