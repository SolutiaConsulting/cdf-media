import { Injectable } 			from '@angular/core';
import { ConfigInterface } from "../models";

@Injectable()
export class ClientConfigService 
{
	static ConfigModel: ConfigInterface;

	//GET JW PLAYER KEY
	static GetJwPlayerKey(): string
	{
		return ClientConfigService.ConfigModel.JwPlayerKey;
	};
}