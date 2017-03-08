import { CdfMediaConfig } from "../config";

export class ClientConfigService 
{
	static ConfigModel: CdfMediaConfig;

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