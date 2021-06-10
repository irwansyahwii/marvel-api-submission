jest.mock("@tsed/common");
import { PlatformCache } from "@tsed/common";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { CacheServiceUsingPlatformCache } from "./CacheServiceUsingPlatformCache"

test('Creating the service with null and undefined PlatformCache must be failed', ()=>{
    expect(()=>{
        new CacheServiceUsingPlatformCache((null as any));
    }).toThrow("Failed to create CacheServiceUsingPlatformCache. PlatformCache instance must not be null")
    expect(()=>{
        new CacheServiceUsingPlatformCache((undefined as any));
    }).toThrow("Failed to create CacheServiceUsingPlatformCache. PlatformCache instance must not be null")
})

test('Set() must call PlatformCache.set()', async ()=>{
    const p = new PlatformCache();
    const c:CacheServiceUsingPlatformCache = new CacheServiceUsingPlatformCache(p);

    await c.Set("key1", {id:1234}, {ttl:300});

    expect(p.set).toBeCalledTimes(1);
    expect(p.set).toBeCalledWith("key1", {id:1234}, {ttl:300});
})

test('Set() must call PlatformCache.set()', async ()=>{
    const p = new PlatformCache();
    const c:CacheServiceUsingPlatformCache = new CacheServiceUsingPlatformCache(p);

    await c.Get("key1");

    expect(p.get).toBeCalledTimes(1);
    expect(p.get).toBeCalledWith("key1");
})