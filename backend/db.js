const mongoose = require("mongoose");

const mongoURI =
    "mongodb+srv://Variety:c1h2i3r4a5n6@cluster0.zgwls.mongodb.net/Varietymern?retryWrites=true&w=majority&appName=Cluster0";

const mongoDB = async() => {
    try {
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log("✅ Connected to MongoDB!");

        // Fetch data from "food_item" collection
        const foodItemCollection = mongoose.connection.db.collection("food_item");
        await foodItemCollection.deleteMany({});
        await foodItemCollection.insertMany(

            [{
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Ras Malai",
                    "img": "https://www.archanaskitchen.com/images/archanaskitchen/1-Author/moumita.malla-gmail.com/traditional_rasmalai_recipe.jpg",
                    "options": [{
                        "One Peice": "30",
                        "10 Peice": "300"
                    }],
                    "description": "Ras Malai is a delicious Indian dessert made of soft paneer dumplings soaked in sweet, flavored milk with cardamom and saffron."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Gulkand Barfi ",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3ahQNkJSq-5685Xfdq4ZuU9W_kIowrCmY5A&s",
                    "options": [{
                        "half": "250",
                        "full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Sweets' Gulkand Barfi is a rich, flavorful dessert made with gulkand (rose petal jam), milk, and dry fruits, offering a delightful taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Fruit Barfi",
                    "img": "data:image/jpeg;base64,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",
                    "options": [{
                        "half": "440",
                        "full": "220",
                        "Quater": "110"
                    }],
                    "description": "Variety Sweets Fruit Barfi is a delicious, colorful treat made with mixed fruits, nuts, and khoya, offering a rich and unique flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Cham Cham",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQScAOi8AIB4IBrMW4abYXYQ91QMcVwCTG46w&s",
                    "options": [{
                        "half": "200",
                        "full": "400",
                        "Quater": "100"
                    }],
                    "description": "Variety Sweets Cham Cham is a soft, spongy Bengali dessert soaked in sugar syrup, enriched with saffron, cardamom, and nuts."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Doda Barfi",
                    "img": "https://5.imimg.com/data5/SELLER/Default/2023/11/359640762/VS/IU/QF/199770925/doda-barfi-sweets.jpeg",
                    "options": [{
                        "half": "250",
                        "full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Sweets' Doda Barfi is a rich, grainy Punjabi sweet made from reduced milk, ghee, sugar, and crunchy nuts, offering a delightful taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Pista Barfi ",
                    "img": "data:image/jpeg;base64,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",
                    "options": [{
                        "half": "200",
                        "full": "400",
                        "Quater": "100"
                    }],
                    "description": "Variety Sweets' Pista Barfi is a rich, creamy sweet made with pistachios, milk, and sugar, offering a delicious nutty flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "White Chena",
                    "img": "https://bannusweets.com/wp-content/uploads/2024/01/39-600x600.webp",
                    "options": [{
                        "half": "130",
                        "full": "360",
                        "Quater": "65"
                    }],
                    "description": "Variety Sweets' White Chena is a soft, spongy, and mildly sweet delicacy made from fresh chhena (paneer), offering a rich, milky taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Gujia",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQP_vTXim8wgvZlByWDZoBzwLxnfpXxEspQSg&s",
                    "options": [{
                        "half": "200",
                        "full": "400",
                        "Quater": "100"
                    }],
                    "description": "Variety Sweets' Gujia is a crispy, golden pastry filled with a rich mixture of khoya, dry fruits, and sugar, offering a delightful festive treat."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Moti Pak",
                    "img": "https://srigangavilas.com/cdn/shop/files/Untitleddesign-2024-03-07T114055.861_1200x1200.jpg?v=1709895667",
                    "options": [{
                        "half": "250",
                        "full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Sweets' Moti Pak is a rich, melt-in-the-mouth sweet made from gram flour, ghee, and sugar, infused with aromatic cardamom."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Kalakand",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJcFZhij78adjtdkLjlNGhUJ_4Qh7H9_tQ1Q&s",
                    "options": [{
                        "half": "250",
                        "full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Sweets' Kalakand is a soft, grainy, and delicious sweet made from milk and sugar, infused with cardamom for rich flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Gulkand Barfi",
                    "img": "https://www.ndtv.com/cooks/images/lauki%20kalakand%20barfi.jpg",
                    "options": [{
                        "Half": "250",
                        "Full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Sweets' Gulkand Barfi is a rich, aromatic sweet made with khoya and infused with rose-flavored Gulkand, offering a delightful taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Chena Toast",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpTUsLz64eK0ehqlN4thsocISwiW-MbvkVPQ&s",
                    "options": [{
                        "Half": "220",
                        "Full": "440",
                        "Quater": "110"
                    }],
                    "description": "Variety Sweets' Chena Toast is a delicious Bengali dessert made from soft chena (paneer), lightly sweetened and topped with rich syrup."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Rabdi",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbulp6St6yDfrwapvG4ldX0JeIXtXHwfjsrA&s",
                    "options": [{
                        "One": "40",
                        "Two": "80",
                        "Three": "120"
                    }],
                    "description": "Variety Sweets' Rabdi is a rich, creamy dessert made by slow-cooking milk until thickened, flavored with cardamom, saffron, and nuts."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Gulkand Barfi",
                    "img": "https://i.ytimg.com/vi/6lahVyWc98I/maxresdefault.jpg",
                    "options": [{
                        "Half": "250",
                        "Full": "500",
                        "Quater": "120"
                    }],
                    "description": "Gulkand Barfi at Variety Sweets is a rich, aromatic delight, blending rose petal jam, mawa, saffron, and dry fruits perfectly."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Fruit Barfi",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQqmn4YbTsGWFxCqfWdu5agS7Yj5K8E2lvy2g&s",
                    "options": [{
                        "Half": "220",
                        "Full": "440",
                        "Quater": "110"
                    }],
                    "description": "Fruit Barfi at Variety Sweets is a delightful fusion of fresh fruits, mawa, and nuts, offering a naturally sweet and rich flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Mango Mzza",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSKh_JGnpakXByrxbvnTtMntvWH5RNV0PKYbg&s",
                    "options": [{
                        "Half": "350",
                        "Full": "700",
                        "Quater": "175"
                    }],
                    "description": "Mango Maza at Variety Sweets is a luscious mango-infused delight, blending rich flavors with a creamy texture for ultimate indulgence.."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Anjeer Roll",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNiJbgy3EAjlnKsCbt2TX82WMDRuWt96_D7Q&s",
                    "options": [{
                        "Half": "550",
                        "Full": "1100",
                        "Quater": "275"
                    }],
                    "description": "Anjeer Roll at Variety Sweets is a nutritious delight made with figs, nuts, and aromatic spices, offering a rich and wholesome taste.."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Kaju Katli",
                    "img": "https://www.parsidairyfarm.com/cdn/shop/files/KajuKatli.jpg?v=1699528323",

                    "options": [{
                        "Half": "550",
                        "Full": "1100",
                        "Quater": "275"
                    }],
                    "description": "Kaju Katli at Variety Sweets is a classic delicacy made with premium cashews, sugar, and saffron, offering a rich, melt-in-mouth experience."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Bal Mithai",
                    "img": "https://m.media-amazon.com/images/I/71Kv9DutGVL._AC_UF1000,1000_QL80_.jpg",

                    "options": [{
                        "Half": "200",
                        "Full": "400",
                        "Quater": "100"
                    }],
                    "description": "Bal Mithai at Variety Sweets is a traditional Kumaoni delight made with roasted khoya, coated in sugar balls, offering a rich caramelized taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Aam Papar Roll",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCk4QbTHi2sjH0KLXIZ-lJvfiyAdDbPqYqWQ&s",

                    "options": [{
                        "Half": "350",
                        "Full": "700",
                        "Quater": "175"
                    }],
                    "description": "Aam Paper Roll at Variety Sweets is a delicious mango treat, made from sun-dried mango pulp, offering a sweet and tangy flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Dry Fruit Laddu",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTWgxdXWII6MkkOdG_mr8vdhmJFQY5Edn9LtA&s",

                    "options": [{
                        "Half": "550",
                        "Full": "1100",
                        "Quater": "275"
                    }],
                    "description": "Dry Fruit Laddu at Variety Sweets is a nutritious delight, packed with almonds, cashews, pistachios, and dates, offering a rich and healthy taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Long Lata",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7AWrBHDaGEa__kCL4oAqGiU0v5WM-jymGnQ&s",

                    "options": [{
                        "Half": "150",
                        "Full": "300",
                        "Quater": "75"
                    }],
                    "description": "Variety Long Lata is a crispy, golden sweet filled with rich khoya and dry fruits, soaked in syrup for perfect sweetness."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Coconut Burfi",
                    "img": "https://www.yummytummyaarthi.com/wp-content/uploads/2013/07/4-3-1024x682.jpg",

                    "options": [{
                        "Half": "150",
                        "Full": "300",
                        "Quater": "75"
                    }],
                    "description": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRFDtVrPq9A2aGhmm614GV4HJoKsbjZSp64ig&s"
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Peda",
                    "img": "https://nestle.fitterfly.in/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsibWVzc2FnZSI6IkJBaHBBbmtwIiwiZXhwIjpudWxsLCJwdXIiOiJibG9iX2lkIn19--004f861f4d7d4960cde25901cf0bec1182d5a9f5/19062_Caramelized_Jaggery_Peda.webp",

                    "options": [{
                        "Half": "200",
                        "Full": "400",
                        "Quater": "100"
                    }],
                    "description": "Variety Peda is a soft, milky sweet delicacy made with condensed milk, sugar, and cardamom, offering a rich and traditional taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Besan Barfi",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxW8LawCvB-w7XG1uxJJSrNqdV8nBB_4Sz3Q&s",

                    "options": [{
                        "Half": "150",
                        "Full": "300",
                        "Quater": "75"
                    }],
                    "description": "Variety Besan Barfi is a rich, melt-in-mouth sweet made with roasted gram flour, ghee, and sugar, infused with cardamom flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Mysore PAK",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSzVIq-EQYYABQOGlWRHC6uM4pY0ZYQpdMlJw&s",

                    "options": [{
                        "Half": "140",
                        "Full": "280",
                        "Quater": "70"
                    }],
                    "description": "Variety Mysore Pak is a soft, rich, and aromatic sweet made with gram flour, ghee, and sugar, offering an authentic traditional taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Balu Sahi",
                    "img": "https://www.shutterstock.com/image-photo/indian-mithai-balushahi-called-balsaahi-600nw-2385398553.jpg",

                    "options": [{
                        "Half": "140",
                        "Full": "280",
                        "Quater": "70"
                    }],
                    "description": "Variety Balu Shahi is a crispy, flaky, and sugar-glazed Indian sweet, offering a rich and traditional taste with a melt-in-mouth texture."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Milk Chocklate",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR9qEE5WRbG9a0w_nykZs_E_IPlfQfxX8P2tg&s",

                    "options": [{
                        "Half": "300",
                        "Full": "600",
                        "Quater": "150"
                    }],
                    "description": "Variety Milk Chocolate is a rich, creamy delight made from the finest cocoa and milk, offering a smooth, irresistible sweetness."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Soan Papdi",
                    "img": "https://bgnaidusweets.com/cdn/shop/files/buy-Ghee-Banaras-Soan-Papdi-online-from-BG-Naidu-Sweets.jpg?v=1695714804",

                    "options": [{
                        "Half": "150",
                        "Full": "300",
                        "Quater": "75"
                    }],
                    "description": "Variety Soan Papdi is a light, flaky, and melt-in-the-mouth sweet made with gram flour, ghee, and sugar, offering a delightful crunch."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Milk PAK",
                    "img": "https://bandarmithai.in/cdn/shop/products/milk_mysorepak.jpg?v=1617381204",

                    "options": [{
                        "Half": "300",
                        "Full": "600",
                        "Quater": "150"
                    }],
                    "description": "Variety Milk Pak is a rich, creamy sweet made from thickened milk and sugar, offering a smooth texture and indulgent taste."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Moti PAK",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTwm_UF4-FN7YR9wtQa4Q8R58nRepDwu2KEA&s",

                    "options": [{
                        "Half": "250",
                        "Full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Moti Pak is a rich, melt-in-the-mouth sweet made from gram flour, ghee, and sugar, offering a delightful, aromatic flavor."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Kesar Roll",
                    "img": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRERDz1gUa0JmllA5eCn4kw6Y1dyYZTYx_vtQ&s",

                    "options": [{
                        "Half": "250",
                        "Full": "500",
                        "Quater": "125"
                    }],
                    "description": "Variety Kesar Roll is a luxurious saffron-infused sweet, crafted with rich mawa, nuts, and aromatic flavors for an indulgent experience."
                },
                {
                    "CategoryName": "VARIETY SWEETS",
                    "name": "Balu Sahi",
                    "img": "https://www.shutterstock.com/image-photo/indian-mithai-balushahi-called-balsaahi-600nw-2385398553.jpg",

                    "options": [{
                        "Half": "140",
                        "Full": "280",
                        "Quater": "70"
                    }],
                    "description": "Variety Balu Sahi is a crispy, golden-brown sweet with a soft, syrup-filled center, offering a rich and traditional taste."
                },

            ]

        );
        global.food_item = await foodItemCollection.find({}).toArray();

        // Fetch data from "foodCategory" collection
        const foodCategoryCollection = mongoose.connection.db.collection("food_Category");
        global.foodCategory = await foodCategoryCollection.find({}).toArray();

        console.log("📌 Food Items Fetched:", global.food_item, "items");
        console.log("📌 Food Categories Fetched:", global.foodCategory.length, "categories");
    } catch (error) {
        console.error("❌ MongoDB connection error:", error);
        process.exit(1); // Exit process if connection fails
    }
};

module.exports = mongoDB;