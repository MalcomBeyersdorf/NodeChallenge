import { Request, Response } from 'express';
import Router from 'express-promise-router';
import { create } from '../../knexProvider';

const router = Router();

router.get('/', async (req: Request, res: Response) =>
{
    const connection = await create();
    let currencies = await connection.select('id', 'description', 'symbol').from('currencies');
    let rates = await Promise.all(currencies.map(currency => connection.select('id', 'id_currency', 'value', 'created_at')
        .from('rates')
        .where({ id_currency: currency.id })
        .orderBy('created_at', 'desc').limit(1)))
    let result = [];
    for (let i = 0; i < rates.length; i++)
    {
        if (rates[ i ][ 0 ])
        {
            rates[ i ][ 0 ].currency = currencies.find(currency => currency.id === rates[ i ][ 0 ].id_currency);
            rates[ i ][ 0 ].created_at = new Date(rates[ i ][ 0 ].created_at).toISOString().slice(0, 19).replace('T', ' ');
            result.push(rates[ i ][ 0 ]);
        }
    }
    res.json(result);
});

router.get('/:symbol', async (req: Request, res: Response) =>
{
    try
    {
        const connection = await create();
        let rateResult = await connection.select('rates.id', 'id_currency', 'currencies.description', 'value', 'created_at')
            .from('rates')
            .innerJoin('currencies', 'rates.id_currency', 'currencies.id')
            .where({
                'currencies.symbol': req.params.symbol.toUpperCase()
            })
            .orderBy('created_at', 'desc').limit(1)
        const rate = rateResult[ 0 ];
        const result =
        {
            id: rate.id,
            id_currency: rate.id_currency,
            value: rate.value,
            created_at: new Date(rate.created_at).toISOString().slice(0, 19).replace('T', ' '),
            currency: {
                id: rate.id_currency,
                description: rate.description,
                symbol: req.params.symbol.toUpperCase()
            }
        }
        if (!result)
        {
            return res.status(404).json({ message: 'rates not found' });
        }

        res.json(result);
    } catch (e)
    {
        return res.status(400).json({ message: e.message });
    }
});

router.post('/', async (req: Request, res: Response) =>
{
    const connection = await create();
    if (req.body.id_currency == '' || req.body.value == '')
    {
        res.status(400);
        return res.json({ message: 'One parameter is missing' });
    }
    try
    {
        let newRate =
        {
            id_currency: req.body.id_currency,
            value: req.body.value,
            created_at: new Date().toISOString().slice(0, 19).replace('T', ' ')
        }
        await connection('rates').insert(newRate);
        return res.json({ message: 'Rate successfully created: ' });
    } catch (e)
    {
        return res.status(400).json({ message: e.message });
    }
});

export const RatesController = router;
