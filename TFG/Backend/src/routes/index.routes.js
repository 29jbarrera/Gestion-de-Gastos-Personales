const { Router } = require('express')
const router = Router();

router.get('/api',(req,res) => {
    res.render('index');
});


module.exports = router;