import express from "express";

const router = express.Router();

router.get('/', (req, res) => {
    res.json({
        msg: 'get from categories'
    });
});

router.get('/:id', (req, res) => {
    res.json({
        msg: 'get from categories'
    });
});

router.post('/', (req, res) => {
    res.json({
        msg: 'post from categories'
    });
});

router.put('/:id', (req, res) => {
    res.json({
        msg: 'put from categories'
    });
});

router.delete('/:id', (req, res) => {
    res.json({
        msg: "'delete from categories"
    });
});

export default router;
