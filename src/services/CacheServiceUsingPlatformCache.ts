import { PlatformCache } from "@tsed/common";
import { Inject, Service } from "@tsed/di";
import { ICacheService } from "./ICacheService";

@Service()
export class CacheServiceUsingPlatformCache implements ICacheService {
    constructor(@Inject() private _platformCache:PlatformCache){
        if(!this._platformCache){
            throw new Error("Failed to create CacheServiceUsingPlatformCache. PlatformCache instance must not be null");
        }
    }
    
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Set(key: string, data: any, options: any): Promise<void> {
        return this._platformCache.set(key, data, options)
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Get(key: string): Promise<any> {
        return this._platformCache.get(key);
    }

}