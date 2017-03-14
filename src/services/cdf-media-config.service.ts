import { Injectable } 		from '@angular/core';

@Injectable()
export class CdfMediaConfigService 
{
	CloudCMSMediaUrlRoot: string;
	CloudCMSBranchId: string;
	JwPlayerKey: string;

	constructor()
	{ 

	}


	//BUILD MEDIA URL FOR CLOUD CMS NODE ID
	BuildCloudCmsMediaUrl(nodeId: string) : string
	{ 
		return this.CloudCMSMediaUrlRoot + '/' + nodeId + '?branchId=' + this.CloudCMSBranchId;
	};		

	
	//GET JW PLAYER KEY
	GetJwPlayerKey(): string
	{
		return this.JwPlayerKey;
	};
}