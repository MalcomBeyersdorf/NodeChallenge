/* tslint:disable await-promise */
import Knex from 'knex';

/**
 * Initialize a new MySQL provider
 */
export async function create()
{
    const knex = Knex({
        client: 'mysql2',
        connection: {
            user: 'root',
            password: 'rootpass123',
            host: 'stepchallenge_mysql',
            port: 3306,
            database: 'stepchallenge'
        }
    })

    // Verify the connection before proceeding
    try
    {
        return knex;
    }
    catch (error)
    {
        throw new Error('Unable to connect to MySQL via Knex. Ensure a valid connection.')
    }
}

export default { create }
