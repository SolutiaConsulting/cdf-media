import { Injectable } 		from '@angular/core';
import
{
	CdfMediaModel,
	CdfVideoModel
} 							from '../models';

@Injectable()
export class YouTubeService 
{
	//GET JW PLAYER KEY
	static CreateMediaModelFromYouTubeJson(rawJson: any): CdfMediaModel
	{
		let id: string = undefined;
		let type: string = undefined;
		let title: string = undefined;
		let description: string = undefined;
		let imageUri: string = undefined;
		let youTubeId: string = undefined;
		let videoList: CdfVideoModel[] = undefined;

		if (rawJson)
		{ 
			//SET YOUTUBE ID			
			if(rawJson.id && rawJson.id.videoId)
			{
				youTubeId = rawJson.id.videoId;
			}

			if(rawJson.snippet)
			{
				//Title
				if(rawJson.snippet.title)
				{
					title = rawJson.snippet.title;
				}

				//POSTER IMAGE
				if(rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.high && rawJson.snippet.thumbnails.high.url)
				{
					imageUri = rawJson.snippet.thumbnails.high.url;
				}
				else if(rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.medium && rawJson.snippet.thumbnails.medium.url)
				{
					imageUri = rawJson.snippet.thumbnails.medium.url;
				}
				else if(rawJson.snippet.thumbnails && rawJson.snippet.thumbnails.default && rawJson.snippet.thumbnails.default.url)
				{
					imageUri = rawJson.snippet.thumbnails.default.url;
				}
			}		
		}
		
		return new CdfMediaModel(id, type, title, description, imageUri, youTubeId, videoList);		
	};
}