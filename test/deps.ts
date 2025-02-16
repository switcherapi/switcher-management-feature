export { type Middleware, testing } from 'jsr:@oak/oak@17.1.4';
export { Client, StrategiesType } from 'jsr:@switcherapi/switcher-client-deno@2.1.0';
export { superoak } from 'https://deno.land/x/superoak@4.8.1/mod.ts';
export { assert, assertEquals, assertFalse, assertObjectMatch } from 'jsr:@std/assert@1.0.11';

// Fixes superdeno@4.9.0 issue
// deno-lint-ignore no-explicit-any
(globalThis as any).window = globalThis;
