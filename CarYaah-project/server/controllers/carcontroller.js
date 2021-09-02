var db = require("../db/index");

exports.retrievAllCars = async (req, res) => {

    try {
        const cars = await db.Car.findAll();
        return res.status(201).json(cars);
    } catch (error) {
        console.log(error)
    }
}

exports.AddNewFav = async function (req, res) {
    try {
        //    const FavList = {
        //        brand:req.body.brand,
        //        type:req.body.type,
        //        AC:req.body.AC,
        //        GPS: req.body.GPS,
        //        AUTOMATIC:req.body.AUTOMATIC,
        //        start_date_av:req.body.start_date_av,
        //        end_date_av:req.body.end_date_av,
        //        image: req.body.image,
        //        city:req.body.city,
        //        rating:req.body.rating,
        //        price:req.body.price
        //    };
        const isFav = (await db.Favourite.findAll({ where: { id: req.client.id, carId: req.params.carId } })).length > 0
        if (isFav) {
            await db.Favourite.destroy({ where: { id: req.client.id, carId: req.params.carId } })
        } else {
            await db.Favourite.create({ carId: req.params.carId, id: req.client.id });
        }
        return res.status(201).send()
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}