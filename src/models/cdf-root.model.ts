export class CdfRootModel
{  
	Id: string;
	Type: string;
	Title: string;
	Description: string;

	constructor(id?: string, type?: string, title?:string, description?: string)
	{
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
}