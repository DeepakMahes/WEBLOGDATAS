const express = require('express');
const router = express.Router();
const { user } = require('../models/schema');
router.use(express.urlencoded({ extended: true }));

router.get('/admin', async (req, res) => {
    try {
        const details = await user.find();
        res.render('adminview', { details: details });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
});
router.route("/admin/edit/:id").get( async (req, res) => {
    try {
      const id = req.params.id;
      const update = await user.findById(id);
      if (!update) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.render("edit", { detail: update });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
})
router.post("/admin/edit/:id", async (req, res) => {
    try {
        const id = req.params.id;
        const updateData = req.body;
        const updatedUser = await user.findByIdAndUpdate(id, updateData, { new: true });
        console.log(updatedUser);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
});
router.get("/admin/delete/:id", async (req, res) => {
    try {
        const id = req.params.id;
        await user.findByIdAndDelete(id);
        res.redirect("/admin");
    } catch (error) {
        console.error(error);
        res.status(500).send("Error deleting the data");
    }
});
//tamilmani code
router.get("/user/frequentlyviewuser", async (req, res) => {
    try {
    const frequentlyviewuser = await data.aggregate([
                { $group: { _id: "$user_name", count: { $sum: 1 } } },
                { $sort: { count: -1} },
                { $limit: 5 },
            ]);
    res.render("fvuser", {frequentlyviewuser }); 
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
  
  });

module.exports = router;
