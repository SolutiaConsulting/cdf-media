import
{
	AfterViewInit,
	Component,
	EventEmitter,
	OnInit,
	Output,
	Input
} 									from '@angular/core';

import { CdfMediaModel }			from '../../models/index';
import { ClientConfigService }		from '../../services';

const jwPlayer = require('@cdf/cdf-ng-media/src/assets/lib/jwplayer-7.6.1/jwplayer.js');

@Component({
	selector: 'cdf-video-background',
	template: `
	<div [id]="videoPlayerId"></div>
	<ng-content></ng-content>	
	`,
	styles: [ `
	:host 
	{
		height: 200px;
	}

	:host /deep/ .jwplayer
	{
		height: inherit !important;
	}

	:host /deep/ .jw-error .jw-preview, 
	:host /deep/ .jw-stretch-uniform .jw-preview, 
	:host /deep/ .jwplayer .jw-preview,
	:host /deep/ .jw-preview
	{
		background-position: top center !important;
		background-size: cover !important;
	}	
	`]
})
export class CdfVideoBackgroundComponent implements OnInit, AfterViewInit
{
	videoJWPlayer: any;
	jwPlayerKey: string;
	videoPlayerId: string;
	youTubeUrl: string = 'https://www.youtube.com/watch?v=';

	@Input() mediaModel: CdfMediaModel;

	constructor(
		private clientConfigService : ClientConfigService
	)
	{
	};

	
	ngOnInit()
	{
		this.jwPlayerKey = ClientConfigService.GetJwPlayerKey();
		
		window["jwplayer"] = jwPlayer;
		jwPlayer.key = this.jwPlayerKey;

		this.videoPlayerId = 'jwp_' + this.guid();
	};

	
	ngAfterViewInit()
	{ 
		this.videoJWPlayer = jwPlayer(this.videoPlayerId);
		
		//console.log('Video Model', this.mediaModel);

		//VIDEO URL
		if (this.mediaModel.HasVideo && this.mediaModel.VideoList && this.mediaModel.VideoList.length > 0)
		{
			let playListSourceArray: Object[] = [];

			//add video from array of types to play list			
			for (var item of this.mediaModel.VideoList) 
			{
				playListSourceArray.push(
					{
						mediaid: this.guid(),
						file: item.VideoUri,
						label: "HD",
						type: "mp4"
					}
				);
			}			
			
			this.videoJWPlayer.setup
				({
					controls: false,
					autostart: true,
					mute: true,
					repeat: true,
					height: "100%",
					width: "100%",
					stretching: "fill",
					playlist:
					[
						{
							mediaid: this.guid(),
							sources: playListSourceArray
						}
					]
				});	
		}	
		else if (this.mediaModel.YouTubeId)
		{
			let videoUri = this.youTubeUrl + '' + this.mediaModel.YouTubeId

			this.videoJWPlayer.setup
				({
					file: videoUri,
					controls: false,
					autostart: true,
					mute: true,
					repeat: true,
					mediaid: this.guid(),
					stretching: "fill",
					height: "100%",
					width: "100%"
				});				


			this.videoJWPlayer.on('play', function (e) 
			{
				jwPlayer().setVolume(0);				
			});				
		}
	};

	
	guid() 
	{
		function s4() 
		{
			return Math.floor((1 + Math.random()) * 0x10000)
			.toString(16)
			.substring(1);
		}

		return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
	};	
}