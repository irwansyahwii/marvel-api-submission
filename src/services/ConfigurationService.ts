import { Service } from "@tsed/di";
import { AllCharactersFilePath, LatestTimestampFilePath } from "./AllCharactersFileLoader";

@Service()
export class ConfigurationService{
    public LatestTimestampFilePath: string = LatestTimestampFilePath;
    public AllCharactersFilePath:string = AllCharactersFilePath;
}