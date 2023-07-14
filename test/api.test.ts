import app from '../src/app.ts';
import { describe, it, superoak, assertEquals } from './deps.ts';

describe('API Router', function () {

  it('should return success', async function () {
    const request = await superoak(app);
    const response = await request.get('/api/check').expect(200);
    
    assertEquals(response.body, { message: "Success" });
  });
});
