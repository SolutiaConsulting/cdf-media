export class CdfRootModel
{  
	Guid: string;
	Id: string;
	Type: string;
	Title: string;
	Description: string;

	constructor(id?: string, type?: string, title?:string, description?: string)
	{
		this.Guid = this.guid();
		this.Id = id;
		this.Type = type;
		this.Title = title;	
		this.Description = description;	
	}	

	OnClick()
	{ 
		let message = 'OnClick METHOD MUST BE IMPLEMENTED BY CHILD COMPONENT TO CdfMediaModel';
		console.log('ERROR:', message);
	};

	private guid() 
	{
		function s4() 
		{
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	}	
}