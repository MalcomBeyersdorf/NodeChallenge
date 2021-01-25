import { Request, Response } from "express";
import Router from 'express-promise-router';
import { create } from '../../knexProvider';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
{
    const connection = await create();
    const result = await connection.select('id', 'description', 'symbol').from('currencies');
    res.json(result);
});

export const CurrencyController = router;
