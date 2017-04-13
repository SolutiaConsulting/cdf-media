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
	selector: 'cdf-video-youtube',
	template: `
	<div [id]="videoPlayerId"></div>
	<ng-content></ng-content>	
	`,
	styles: [ `
	:host 
	{
		height: 100%;
		width: 100%;
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

	:host /deep/ .jw-preview
	{
		transition: all 0.3s ease 0s;
	}
	`]
})
export class CdfVideoYouTubeComponent implements OnInit, AfterViewInit
{
	videoJWPlayer: any;
	jwPlayerKey: string;
	videoPlayerId: string;
	youTubeUrl: string = 'https://www.youtube.com/watch?v=';

	@Input() mediaModel: CdfMediaModel;	
	@Output() onVideoBeforePlay: EventEmitter<any> = new EventEmitter<any>();
	@Output() onVideoStopPlay: EventEmitter<any> = new EventEmitter<any>();

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
	}

	ngAfterViewInit()
	{ 
		this.videoJWPlayer = jwPlayer(this.videoPlayerId);
		
		//console.log('videoPlayerId', this.videoPlayerId);

		//VIDEO URL
		if (this.mediaModel.YouTubeId)
		{ 
			//console.log(' *********** mediaModel.ImageUri:', this.mediaModel.ImageUri);

			let that = this;
			let videoUri = this.youTubeUrl + '' + this.mediaModel.YouTubeId

			this.videoJWPlayer.setup
				({
					file: videoUri,
					image: this.mediaModel.ImageUri,
					controls: true,
					autostart: false,
					mute: false,
					repeat: false,
					mediaid: this.guid(),
					stretching: "fill",
					height: "100%",
					width: "100%"
				});	
			
			this.videoJWPlayer.on('beforePlay', function (e) 
			{
				//console.log('videoJWPlayer beforePlay...');

				if (that.onVideoBeforePlay)
				{ 
					that.onVideoBeforePlay.emit();
				}					
			});
			
			this.videoJWPlayer.on('play', function (e) 
			{
				//console.log('videoJWPlayer play...');
			});
			
			this.videoJWPlayer.on('pause', function (e) 
			{
				//console.log('videoJWPlayer pause...');

				if (that.onVideoStopPlay)
				{ 
					that.onVideoStopPlay.emit();
				}					
			});

			this.videoJWPlayer.on('beforeComplete', function (e) 
			{
				//console.log('videoJWPlayer stop...');

				if (that.onVideoStopPlay)
				{ 
					that.onVideoStopPlay.emit();
				}					
			});						
		}	
	}

	play()
	{ 
		if(this.videoJWPlayer)
		{
			this.videoJWPlayer.play();
			//console.log('PLAY DAS PLAYER...', this.mediaModel.Title);
		}		
	};

	stop()
	{ 
		if(this.videoJWPlayer)
		{
			//console.log('STOP DAS PLAYER...', this.mediaModel.Title);
			
			this.videoJWPlayer.stop();

            if (this.onVideoStopPlay)
            { 
                this.onVideoStopPlay.emit();
            }			
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
	}	
}