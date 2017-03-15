import { ConfigInterface } from "../models";

export class ClientConfigService 
{
	static ConfigModel: ConfigInterface;

	//BUILD MEDIA URL FOR CLOUD CMS NODE ID
	static BuildCloudCmsMediaUrl(nodeId: string) : string
	{ 
		return ClientConfigService.ConfigModel.CloudCMSMediaUrlRoot + '/' + nodeId + '?branchId=' + ClientConfigService.ConfigModel.CloudCMSBranchId;
	};		

	//GET JW PLAYER KEY
	static GetJwPlayerKey(): string
	{
		return ClientConfigService.ConfigModel.JwPlayerKey;
	};
}