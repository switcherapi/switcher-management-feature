export { type Middleware, testing } from 'jsr:@oak/oak@17.1.0';
export { Client } from 'jsr:@switcherapi/switcher-client-deno@2.0.2';
export { superoak } from 'https://deno.land/x/superoak@4.8.1/mod.ts';
export { assert, assertEquals, assertFalse, assertObjectMatch } from 'jsr:@std/assert@1.0.5';

// Fixes superdeno@4.9.0 issue
(globalThis as any).window = globalThis;