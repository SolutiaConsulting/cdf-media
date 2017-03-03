export class ClientConfigModel
{
	CloudCMSMediaUrlRoot: string;
	CloudCMSBranchId: string;
	JwPlayerKey: string;

	constructor
	(
		cloudCMSMediaUrlRoot: string, 
		cloudCMSBranchId: string,
		jwPlayerKey: string
	)
	{
		this.CloudCMSMediaUrlRoot = cloudCMSMediaUrlRoot;
		this.CloudCMSBranchId = cloudCMSBranchId;
		this.JwPlayerKey = jwPlayerKey;
	}
}