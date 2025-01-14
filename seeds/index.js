const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://127.0.0.1:27017/yelp-camp');

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
})

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 300; i++){
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            author: '677d6b796a839c1c882c617b',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ad saepe ab molestias consequuntur suscipit facere ducimus ratione aliquam maxime ipsa modi a, aliquid magnam consectetur voluptatibus officiis, eius omnis sit?',
            price,
            geometry: {
                type: 'Point',
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ]
            },
            images: [
                {
                    url: 'https://res.cloudinary.com/dhcztkc1u/image/upload/v1736541916/YelpCamp/mxthlmrbhjvvavbvotpg.jpg',
                    filename: 'YelpCamp/mxthlmrbhjvvavbvotpg',
                  },
                  {
                    url: 'https://res.cloudinary.com/dhcztkc1u/image/upload/v1736541916/YelpCamp/wzhde1fslkpzl8x3aadb.webp',
                    filename: 'YelpCamp/wzhde1fslkpzl8x3aadb',
                  },
                  {
                    url: 'https://res.cloudinary.com/dhcztkc1u/image/upload/v1736541916/YelpCamp/gugxouu0erszv6wrcn53.jpg',
                    filename: 'YelpCamp/gugxouu0erszv6wrcn53',
                  }
            ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    db.close()
})