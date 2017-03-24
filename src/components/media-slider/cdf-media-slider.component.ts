import
{
	AfterViewInit,
	animate,
	Component,
	EventEmitter,
	Input,
	keyframes,
	NgZone,
	OnInit,
	Output,
	QueryList,
	Renderer,
	state,
	style,
	trigger,
	transition,
	ViewChild,
	ViewChildren
} 								from '@angular/core';

import { CdfMediaComponent } 	from '../media/index';
import { CdfMediaModel } 		from '../../models/index';

@Component({
	selector: 'cdf-media-slider',
	template: `
	<ul #mediaComponentContainer class="media-slider-flex-container"  [@mediaContainerTrigger]="mediaContainerState">
		<li class="media-slider-flex-item" (click)="onMediaComponentClick($event, mediaModel)" *ngFor="let mediaModel of mediaModelList; let i = index">
			<!--MEDIA PANE-->
			<section class="cdf-media-pane-container" [@mediaStateTrigger]="mediaModel.mediaPaneState">		
				<!--MEDIA: IMAGE OR VIDEO-->
				<cdf-media [mediaModel]="mediaModel"
							[showTitle]="showTitle"
							[showType]="showType"
							(onImageClick)="doImageClick(mediaModel)"
							(onVideoBeforePlay)="onVideoBeforePlay(mediaModel)"
							(onVideoStopPlay)="onVideoAfterStopPlay(mediaModel)">
					<ng-content select=".cdf-media-content"></ng-content>			
				</cdf-media>		
			</section>

			<!--INFO PANE-->
			<section class="cdf-info-pane-container" *ngIf="mediaModel.IsInfoPaneExpanded" [@infoPaneSlideTrigger]="mediaModel.infoPaneExpandedState">
				<section class="cdf-info-pane-container__wrapper">

					<!--CLOSE BUTTON-->
					<a class="close-button" (click)="onStopVideoClick(mediaModel)">×</a>

					<section class="info-pane-container">
						<h2 class="info-pane-container__title">{{mediaModel.Title}}</h2>
						<p *ngIf="showDescription">{{mediaModel.Description}}</p>
						<button class="button radius small hollow info-pane-container__button" (click)="doImageClick(mediaModel)">Learn More</button>	
					</section>	

				</section>
			</section>	
		</li>
	</ul>
	`,
	styles: [ `
	:host
	{
		display: block;
		min-height: 10rem;
		position: relative;
	}

	.media-slider-flex-container
	{
		display: -webkit-box;
		display: -moz-box;
		display: -ms-flexbox;
		display: -moz-flex;
		display: -webkit-flex;
		display: flex;		
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: flex-start;
		min-height: 550px;
		margin: auto;
		max-width: 275px;
	}


	@media only screen and (min-width : 568px)
	{
		.media-slider-flex-container
		{
			max-width: 550px;
		}		
	}	

	@media only screen and (min-width : 842px)
	{
		.media-slider-flex-container
		{
			max-width: 825px;
		}		
	}	

	.media-slider-flex-item
	{
		list-style: none;
		min-width: 275px;
		min-height: 275px;		
		position: relative;
	}

	cdf-media
	{
		height: 100%;
		width: 100%;
	}

	.cdf-media-pane-container
	{
		cursor: pointer;
		margin: 0;
		max-height: 100%;
		min-height: 100%;
		padding: 0;
		z-index: 10;

		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;	
	}
		.cdf-media-pane-container__title
		{
			color: #000;
			font-size: 3.25rem;
			margin: auto;
			transform: rotate(3deg);
		}	

		.cdf-media-pane-container:nth-child(2n)
		{
			.feature-list-container__item__title
			{
				transform: rotate(-3deg);
			}							
		}			


	.cdf-info-pane-container
	{
		background-color: #fff;
		border: solid 2px #becbd2;
		bottom: 0;
		height: 100%;
		left: 0;	
		overflow: hidden;
		padding: 2.75rem 1rem 1rem 1rem;
		position: absolute;
		right: 0;
		top: 0;
		width: 100%;
		z-index: 100;
	}	

		.cdf-info-pane-container__wrapper
		{
			z-index: 0;
		}

		.cdf-info-pane-container__title
		{
			margin: 0 0 1rem 0;
		}

		.cdf-info-pane-container__date
		{
			font-size: 1rem;
			margin: 0 0 1rem 0;
		}
	` ],
	providers: [],
	animations:
	[
		trigger('mediaContainerTrigger', 
			[
				//STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
				state('inactive', style({ opacity: 1 })),
				
				//STATE WHEN VIDEO IS PLAYING
				state('active', style({ overflow: 'visible' })),
				
				//STATE WHEN OTHER VIDEO IS PLAYING
				state('dimmed', style({ opacity: 0.2, filter: 'blur(2px)' })),
				
				transition('* => dimmed, * => active, * => inactive',
					[
						style({}),						
						animate('300ms ease-out')
					])				
			]
		),	
		trigger('mediaStateTrigger', 
			[
				//STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
				state( 'inactive', style({ zIndex: 100 }) ),
				
				//STATE WHEN VIDEO IS PLAYING
				state( 'active', style({ zIndex: 1000 }) )
			]
		),
		trigger('infoPaneSlideTrigger',
			[
				state('expandToTop', 	style({ zIndex: 11, top: '-100%' })),
				state('expandToRight', 	style({ zIndex: 11, left: '100%' })),
				state('expandToBottom', style({ zIndex: 11, top: '100%' })),
				state('expandToLeft', 	style({ zIndex: 11, left: '-100%' })),
				
				//EXPANDING TO TOP DIRECTION
				transition('void => expandToTop',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ top: '0', offset: 0 }),
							style({ top: '-25%', offset: 0.25 }),
							style({ top: '-50%', offset: 0.5 }),
							style({ top: '-75%', offset: 0.75 }),
							style({ top: '-100%',  offset: 1.0 })
						]))						
					]	
				),	
				transition('expandToTop => *',
					[
						animate('500ms ease-out', keyframes([
							style({ top: '-100%', offset: 0 }),
							style({ top: '-75%', offset: 0.25 }),
							style({ top: '-50%', offset: 0.5 }),
							style({ top: '-25%', offset: 0.75 }),
							style({ top: '0',  offset: 1.0 })
						]))						
					]	
				),


				//EXPANDING TO RIGHT DIRECTION
				transition('void => expandToRight',
					[
						animate('500ms 250ms ease-in', keyframes([
							style({ left: '0', offset: 0 }),
							style({ left: '25%', offset: 0.25 }),
							style({ left: '50%', offset: 0.5 }),
							style({ left: '75%', offset: 0.75 }),
							style({ left: '100%',  offset: 1.0 })
						]))						
					]	
				),	
				transition('expandToRight => *',
					[
						animate('500ms ease-out', keyframes([
							style({ left: '100%', offset: 0 }),
							style({ left: '75%', offset: 0.25 }),
							style({ left: '50%', offset: 0.5 }),
							style({ left: '25%', offset: 0.75 }),
							style({ left: '0',  offset: 1.0 })
						]))						
					]	
				),


				//EXPANDING TO BOTTOM DIRECTION
				transition('void => expandToBottom',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ top: '0', offset: 0 }),
							style({ top: '25%', offset: 0.25 }),
							style({ top: '50%', offset: 0.5 }),
							style({ top: '75%', offset: 0.75 }),
							style({ top: '100%',  offset: 1.0 })
						]))						
					]	
				),	
				transition('expandToBottom => *',
					[
						animate('500ms ease-out', keyframes([
							style({ top: '100%', offset: 0 }),
							style({ top: '75%', offset: 0.25 }),
							style({ top: '50%', offset: 0.5 }),
							style({ top: '25%', offset: 0.75 }),
							style({ top: '0',  offset: 1.0 })
						]))						
					]	
				),				

				//EXPANDING TO LEFT DIRECTION
				transition('void => expandToLeft',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ left: '0', offset: 0 }),
							style({ left: '-25%', offset: 0.25 }),
							style({ left: '-50%', offset: 0.5 }),
							style({ left: '-75%', offset: 0.75 }),
							style({ left: '-100%',  offset: 1.0 })
						]))						
					]	
				),	
				transition('expandToLeft => *',
					[
						animate('500ms ease-out', keyframes([
							style({ left: '-100%', offset: 0 }),
							style({ left: '-75%', offset: 0.25 }),
							style({ left: '-50%', offset: 0.5 }),
							style({ left: '-25%', offset: 0.75 }),
							style({ left: '0',  offset: 1.0 })
						]))						
					]	
				)
			]
		)
	]
})
export class CdfMediaSliderComponent implements OnInit, AfterViewInit
{
	@Input() mediaModelList: CdfMediaModel[] = [];
	@Input() showType: boolean = false;
	@Input() showTitle: boolean = false;
	@Input() showDescription: boolean = false;
	@Output() onImageClick: EventEmitter<any> = new EventEmitter<any>();
	
	@ViewChild('mediaComponentContainer') ULElement;	
	@ViewChildren(CdfMediaComponent) mediaComponentList: QueryList<CdfMediaComponent>;
	
	activeMediaModel: CdfMediaModel = undefined;

	isMediaPlaying: boolean = false;
	
	mediaContainerState: string = 'inactive';

	constructor(
		private zone: NgZone,
		private renderer: Renderer
	)
	{
	};	

	ngOnInit()
	{		
	};	

	ngAfterViewInit()
	{ 	
	};	

	onMediaComponentClick(event, mediaModel)
	{
        if (mediaModel.HasVideo)
        { 
            //console.log('---- 1. FIND DIMENSIONS OF SELECTED MEDIA COMPONENT...');

			//GET 'OUTSIDE-BOX' RECT FOR UL CONTAINING MEDIA COMPONENTS
            let outsideBoxRect = this.ULElement.nativeElement.getBoundingClientRect();
			let insideBoxRect: { width: undefined, bottom: undefined, left: undefined};
			
			//FOR CLICKED ITEM, LOOK FOR 'media-slider-flex-item' CLASSNAME AND GET 'INSIDE-BOX' RECT
			event.path
				.filter((pathItem) =>
					{
						return (pathItem.className === 'media-slider-flex-item');
					})
				.map((htmlElement) =>
					{
                		insideBoxRect = htmlElement.getBoundingClientRect();
					});
			            
            // console.log('---------- OUTSIDE BOX:', outsideBoxRect);
            // console.log('---------- INSIDE BOX:', insideBoxRect);

			//DEFAULT SLIDER DIRECTION...
            var sliderDirection = 'expandToLeft';  

            //IF SINGLE COLUMN (OUTSIDE & INSIDE WIDTHS ARE SAME)        
            if (Math.ceil(outsideBoxRect.width) === Math.ceil(insideBoxRect.width))
            {
                //IF OUTSIDE & INSIDE BOTTOMS ARE SAME THEN SLIDE UP
                if (Math.ceil(outsideBoxRect.bottom) === Math.ceil(insideBoxRect.bottom))
                {
                    sliderDirection = 'expandToTop';
                }
                else
                {
                    sliderDirection = 'expandToBottom';
                }
            }
            //IF OUTSIDE & INSIDE LEFTS ARE SAME, THEN EXPAND TO RIGHT
            else if (Math.ceil(outsideBoxRect.left) === Math.ceil(insideBoxRect.left))
            { 
                sliderDirection = 'expandToRight';
            }    

            mediaModel[ 'infoPaneExpandedState' ] = sliderDirection;
            mediaModel[ 'IsInfoPaneExpanded' ] = true;

            // console.log('--------- sliderDirection:', sliderDirection);        
            // console.log('--------- mediaModel:', mediaModel);
        } 
	};

	onVideoBeforePlay(mediaModel: CdfMediaModel)
	{ 
		//console.log('---- 2. TURN OFF ALL OTHER MEDIA PLAYING...');

		if (!this.isMediaPlaying)
		{
			mediaModel[ 'mediaPaneState' ] = 'active';

			this.isMediaPlaying = true;
			this.mediaContainerState = 'active';
			this.activeMediaModel = mediaModel;
		}
		//TURN OFF OTHER VIDEOS THAT MAY BE PLAYING...
		else
		{ 
			let mediaComponentArray = this.mediaComponentList.toArray();

			mediaComponentArray
				.filter((item: CdfMediaComponent) =>			
					{
						return (item.mediaModel.HasVideo && item.mediaModel.Id !== mediaModel.Id);
					})
				.map((mediaComponentToStopPlaying: CdfMediaComponent) =>
					{
						mediaComponentToStopPlaying.stop();
					});			
		}
	};


	//CLOSE SLIDE-OUT AFTER VIDEO FINISHES PLAYING ON ITS OWN, OR HAS STOPPED PLAYING...	
	private onVideoAfterStopPlay(mediaModel: CdfMediaModel)
	{
		if(this.isMediaPlaying && this.activeMediaModel.Id === mediaModel.Id)
		{
			this.animateClosingSlideOut(mediaModel);
		}
	}


	//MANUALLY STOPPING VIDEO BY CLOSING INFO PANE SLIDE-OUT	
	private onStopVideoClick(mediaModel:CdfMediaModel)
	{ 
		let mediaComponentArray = this.mediaComponentList.toArray();
		
		mediaComponentArray
			.filter((item: CdfMediaComponent) =>			
				{
					return (item.mediaModel.HasVideo && item.mediaModel.Id === mediaModel.Id);
				})
			.map((mediaComponentToStopPlaying: CdfMediaComponent) =>
				{
					mediaComponentToStopPlaying.stop();
				});
	};

	//ANIMATE CLOSING INFO SLIDE-OUT (INFO PANE)...
	private animateClosingSlideOut(mediaModel:CdfMediaModel)
	{ 
		//CAUSE INFO PANE TO COLLAPSE			
		mediaModel[ 'infoPaneExpandedState' ] = 'collapsed';			
		
		//PAUSE WHILE TRIGGER ANIMATION FIRES THEN EMIT MEDIA SLIDER CLOSED...
		setTimeout(() => 
		{
			this.resetPanes(mediaModel);				
		}, 400);		
	}

	private resetPanes(mediaModel:CdfMediaModel)
	{ 
		this.activeMediaModel = undefined;
		this.isMediaPlaying = false;
		this.mediaContainerState = 'inactive';
		mediaModel[ 'mediaPaneState' ] = 'inactive';		
		mediaModel[ 'IsInfoPaneExpanded' ] = false;
	};	

	private doImageClick(mediaModel:CdfMediaModel)
	{
		if (this.onImageClick)
		{ 
			this.onImageClick.emit(mediaModel);
		}								
	};
}