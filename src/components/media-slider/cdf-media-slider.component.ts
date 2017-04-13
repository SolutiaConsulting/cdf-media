import
{
	AfterViewInit,
	animate,
	Component,
	EventEmitter,
	Input,
	keyframes,
	NgZone,
	OnDestroy,
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
} from '@angular/core';

import { CdfMediaComponent } from '../media/index';
import { CdfMediaModel } from '../../models/index';

@Component({
	selector: 'cdf-media-slider',
	template: `
	<ul #mediaComponentContainer class="media-slider-flex-container">

		<li class="media-slider-flex-item" 
			(click)="onMediaComponentClick($event, mediaModel)" 
			[@mediaListItemTrigger]="mediaModel.mediaPaneState"
			*ngFor="let mediaModel of mediaModelList; let i = index">
			
			
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

					<h2 class="cdf-info-pane-container__title">{{mediaModel.Title}}</h2>
					<p class="cdf-info-pane-container__description" *ngIf="showDescription">{{mediaModel.Description}}</p>

					<button class="button radius small hollow cdf-info-pane-container__button" (click)="doImageClick(mediaModel)">Learn More</button>	

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
		justify-content: center;
		min-height: 550px;
		margin: auto;
	}

	@media only screen and (min-width : 842px)
	{
		.media-slider-flex-container
		{
			justify-content: flex-start;
			max-width: 825px;
		}		
	}	

	.media-slider-flex-item
	{
		list-style: none;
		width: 100vw;
		height: 30vh;		
		position: relative;
	}

	@media only screen and (min-width : 568px)
	{
		.media-slider-flex-item
		{
			width: 48vw;
			height: 30vh;	
		}		
	}	

	@media only screen and (min-width : 842px)
	{
		.media-slider-flex-item
		{
			width: 275px;
			height: 275px;
		}		
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

		.cdf-info-pane-container__description
		{
			font-size: 1rem;
			margin: 0 0 1rem 0;
		}

		.cdf-info-pane-container__button
		{
		}
	` ],
	providers: [],
	animations:
	[
		trigger('mediaListItemTrigger',
			[
				//STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
				state('inactive', style({ opacity: 1 })),

				//STATE WHEN VIDEO IS PLAYING
				state('active', style({ overflow: 'visible' })),

				//STATE WHEN OTHER VIDEO IS PLAYING
				state('dimmed', style({ opacity: 0.2, filter: 'blur(2px)' })),

				transition('* => dimmed, * => active',
					[
						style({}),
						animate('300ms ease-out')
					]),

				transition('* => inactive',
					[
						style({}),
						animate('700ms ease-out')
					])
			]
		),
		trigger('mediaStateTrigger',
			[
				//STATE WHEN VIDEO IS STOPPED AND BECOMES INACTIVE
				state('inactive', style({})),

				//STATE WHEN VIDEO IS PLAYING
				state('active', style({ zIndex: 1000 })),

				transition('* => inactive', [ animate('500ms 350ms ease-in') ])
			]
		),
		trigger('infoPaneSlideTrigger',
			[
				state('slideToTop', style({ zIndex: 11, top: '-100%' })),
				state('slideToRight', style({ zIndex: 11, left: '100%' })),
				state('slideToBottom', style({ zIndex: 11, top: '100%' })),
				state('slideToLeft', style({ zIndex: 11, left: '-100%' })),

				//EXPANDING TO TOP DIRECTION
				transition('void => slideToTop',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ top: '0', offset: 0 }),
							style({ top: '-25%', offset: 0.25 }),
							style({ top: '-50%', offset: 0.5 }),
							style({ top: '-75%', offset: 0.75 }),
							style({ top: '-100%', offset: 1.0 })
						]))
					]
				),
				transition('slideToTop => *',
					[
						animate('500ms ease-out', keyframes([
							style({ top: '-100%', offset: 0 }),
							style({ top: '-75%', offset: 0.25 }),
							style({ top: '-50%', offset: 0.5 }),
							style({ top: '-25%', offset: 0.75 }),
							style({ top: '0', offset: 1.0 })
						]))
					]
				),


				//EXPANDING TO RIGHT DIRECTION
				transition('void => slideToRight',
					[
						animate('500ms 250ms ease-in', keyframes([
							style({ left: '0', offset: 0 }),
							style({ left: '25%', offset: 0.25 }),
							style({ left: '50%', offset: 0.5 }),
							style({ left: '75%', offset: 0.75 }),
							style({ left: '100%', offset: 1.0 })
						]))
					]
				),
				transition('slideToRight => *',
					[
						animate('500ms ease-out', keyframes([
							style({ left: '100%', offset: 0 }),
							style({ left: '75%', offset: 0.25 }),
							style({ left: '50%', offset: 0.5 }),
							style({ left: '25%', offset: 0.75 }),
							style({ left: '0', offset: 1.0 })
						]))
					]
				),


				//EXPANDING TO BOTTOM DIRECTION
				transition('void => slideToBottom',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ top: '0', offset: 0 }),
							style({ top: '25%', offset: 0.25 }),
							style({ top: '50%', offset: 0.5 }),
							style({ top: '75%', offset: 0.75 }),
							style({ top: '100%', offset: 1.0 })
						]))
					]
				),
				transition('slideToBottom => *',
					[
						animate('500ms ease-out', keyframes([
							style({ top: '100%', offset: 0 }),
							style({ top: '75%', offset: 0.25 }),
							style({ top: '50%', offset: 0.5 }),
							style({ top: '25%', offset: 0.75 }),
							style({ top: '0', offset: 1.0 })
						]))
					]
				),

				//EXPANDING TO LEFT DIRECTION
				transition('void => slideToLeft',
					[
						animate('500ms 350ms ease-in', keyframes([
							style({ left: '0', offset: 0 }),
							style({ left: '-25%', offset: 0.25 }),
							style({ left: '-50%', offset: 0.5 }),
							style({ left: '-75%', offset: 0.75 }),
							style({ left: '-100%', offset: 1.0 })
						]))
					]
				),
				transition('slideToLeft => *',
					[
						animate('500ms ease-out', keyframes([
							style({ left: '-100%', offset: 0 }),
							style({ left: '-75%', offset: 0.25 }),
							style({ left: '-50%', offset: 0.5 }),
							style({ left: '-25%', offset: 0.75 }),
							style({ left: '0', offset: 1.0 })
						]))
					]
				)
			]
		)
	]
})
export class CdfMediaSliderComponent implements OnInit, OnDestroy, AfterViewInit
{
	@Input() mediaModelList: CdfMediaModel[] = [];
	@Input() showType: boolean = false;
	@Input() showTitle: boolean = false;
	@Input() showDescription: boolean = false;
	@Output() onImageClick: EventEmitter<any> = new EventEmitter<any>();

	@ViewChild('mediaComponentContainer') ULElement;
	@ViewChildren(CdfMediaComponent) mediaComponentList: QueryList<CdfMediaComponent>;

	activeMediaModel: CdfMediaModel = undefined;
	acceptableVariance: number = 0.20;

	constructor(
		private zone: NgZone,
		private renderer: Renderer
	)
	{
	};

	ngOnInit()
	{
	};

	ngOnDestroy()
	{
		let mediaComponentArray = this.mediaComponentList.toArray();

		//MAKE ALL MEDIA COMPONENTS INACTIVE SINCE NO MORE VIDEOS ARE PLAYING
		mediaComponentArray
			.map((mediaComponentToMakeInactive: CdfMediaComponent) =>
			{
				mediaComponentToMakeInactive.mediaModel[ 'mediaPaneState' ] = 'inactive';
				mediaComponentToMakeInactive.mediaModel[ 'infoPaneExpandedState' ] = 'void';
				mediaComponentToMakeInactive.mediaModel[ 'IsInfoPaneExpanded' ] = false;
			});
		

		this.mediaModelList = [];
		this.activeMediaModel = undefined;		
	};

	ngAfterViewInit()
	{
	};

	//DETERMINE WHICH DIRECTION SLIDEOUT SHOULD HAPPEN
	//BY COMPARING RECT OF LI CLICKED ON TO RECT OF UL
	onMediaComponentClick(event, mediaModel)
	{
		if (this.activeMediaModel && this.activeMediaModel.Guid === mediaModel.Guid && mediaModel.HasVideo)
		{
			//console.log('---- 1. FIND DIMENSIONS OF SELECTED MEDIA COMPONENT...');

			//GET 'OUTSIDE-BOX' RECT FOR UL CONTAINING MEDIA COMPONENTS
			let outsideBoxRect = this.ULElement.nativeElement.getBoundingClientRect();
			let insideBoxRect: { width: undefined, bottom: undefined, left: undefined, right: undefined };

			//FOR CLICKED ITEM, LOOK FOR 'media-slider-flex-item' CLASSNAME AND GET 'INSIDE-BOX' RECT
			event.path
				.filter((pathItem) =>
				{
					return (pathItem.className && pathItem.className.indexOf('media-slider-flex-item') !== -1);
				})
				.map((htmlElement) =>
				{
					insideBoxRect = htmlElement.getBoundingClientRect();
				});

			// console.log('---------- OUTSIDE BOX:', outsideBoxRect);
			// console.log('---------- INSIDE BOX:', insideBoxRect);

			let varianceWidth = this.calculateVariance(Math.ceil(outsideBoxRect.width), Math.ceil(insideBoxRect.width));
			let varianceFromOutsideBoxRight = this.calculateVariance(Math.ceil(outsideBoxRect.right), Math.ceil(insideBoxRect.right));


			//console.log('--------- variance:', varianceFromOutsideBoxRight);

			//DEFAULT SLIDER DIRECTION...
			let sliderDirection = 'slideToRight';

			//IF SINGLE COLUMN (OUTSIDE & INSIDE WIDTHS ARE WITHIN ACCEPTABLE VARIANCE)        
			if (varianceWidth < this.acceptableVariance)
			{
				let varianceFromOutsideBoxBottom = this.calculateVariance(Math.ceil(outsideBoxRect.bottom), Math.ceil(insideBoxRect.bottom));

				//IF OUTSIDE & INSIDE BOTTOMS ARE WITHIN ACCEPTABLE VARIANCE, THEN SLIDE UP
				if (varianceFromOutsideBoxBottom < this.acceptableVariance) 
				{
					sliderDirection = 'slideToTop';
				}
				else
				{
					sliderDirection = 'slideToBottom';
				}
			}
			//IF THE VARIANCE BETWEEN OUTSIDE & INSIDE RIGHT EDGES ARE WITHIN ACCEPTABLE VARIANCE,, THEN SLIDE LEFT
			else if (varianceFromOutsideBoxRight < this.acceptableVariance) 
			{
				sliderDirection = 'slideToLeft';
			}

			mediaModel[ 'infoPaneExpandedState' ] = sliderDirection;
			mediaModel[ 'IsInfoPaneExpanded' ] = true;

			// console.log('--------- sliderDirection:', sliderDirection);        
			// console.log('--------- mediaModel:', mediaModel);
		}
		else
		{ 
			event.stopPropagation();
		}
	};


	
	//TURN OFF ALL OTHER VIDEOS EXCPET THE ONE ABOUT TO PLAY
	private onVideoBeforePlay(mediaModel: CdfMediaModel)
	{
		let mediaComponentArray = this.mediaComponentList.toArray();

		//IF THERE IS NO ACTIVE MEDIA, THEN DIM ALL OTHER MEDIA ITEMS	
		if (!this.activeMediaModel)
		{
			//SET PASSED MEDIA MODEL AS ACTIVE
			mediaModel[ 'mediaPaneState' ] = 'active';
			this.activeMediaModel = mediaModel;

			//PREVENT ABILITY TO CLICK ON OTHER COMPONENTS WHILE VIDEO IS PLAYING, ALSO MAKE OTHER COMPONENTS DIM
			mediaComponentArray
				.filter((item: CdfMediaComponent) =>			
				{
					return (item.mediaModel.Guid !== mediaModel.Guid);
				})
				.map((mediaComponent: CdfMediaComponent) =>
				{
					mediaComponent.canClickOnMedia = false;
					mediaComponent.mediaModel[ 'mediaPaneState' ] = 'dimmed';
				});
		}
	};

	//CLOSE SLIDE-OUT AFTER VIDEO FINISHES PLAYING ON ITS OWN, OR HAS BEEN MANUALLY STOPPED...	
	private onVideoAfterStopPlay(mediaModel: CdfMediaModel)
	{
		let mediaComponentArray = this.mediaComponentList.toArray();

		//MARK ALL COMPONENTS AS CLICKABLE AND REMOVE DIM
		mediaComponentArray
			.map((mediaComponent: CdfMediaComponent) =>
			{
				mediaComponent.canClickOnMedia = true;
				mediaComponent.mediaModel[ 'mediaPaneState' ] = 'inactive';
			});
					
		//PAUSE WHILE TRIGGER ANIMATION FIRES THEN EMIT MEDIA SLIDER CLOSED...
		setTimeout(() => 
		{
			//THIS IS WHAT TRIGGERS INFO PANE TO SLIDE AWAY
			mediaModel[ 'IsInfoPaneExpanded' ] = false;
		}, 100);

		this.activeMediaModel = undefined;
	}

	//MANUALLY STOPPING VIDEO BY CLOSING INFO PANE SLIDE-OUT	
	private onStopVideoClick(mediaModel: CdfMediaModel)
	{
		let mediaComponentArray = this.mediaComponentList.toArray();

		mediaComponentArray
			.filter((item: CdfMediaComponent) =>			
			{
				return (item.mediaModel.HasVideo && item.mediaModel.Guid === mediaModel.Guid);
			})
			.map((mediaComponentToStopPlaying: CdfMediaComponent) =>
			{
				mediaComponentToStopPlaying.stop();
			});
	};

	private doImageClick(mediaModel: CdfMediaModel)
	{
		if (this.onImageClick)
		{
			this.onImageClick.emit(mediaModel);
		}
	};

	private calculateVariance(outsideBoxNumber: number, insideBoxNumber): number
	{
		if (outsideBoxNumber === 0)
		{
			return 0;
		}

		return ((outsideBoxNumber - insideBoxNumber) / outsideBoxNumber);
	}
}