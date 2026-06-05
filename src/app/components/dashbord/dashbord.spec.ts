import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Dashbord } from './dashbord';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('Dashbord Component', () => {

  let component: Dashbord;
  let fixture: ComponentFixture<Dashbord>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [Dashbord],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            params: of({}),
            queryParams: of({})
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Dashbord);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render tool cards based on tools array', () => {

    component.tools = [
      {
        title: 'Gemini AI',
        desc: 'AI Tool',
        icon: 'bi bi-robot',
        bg: 'bg-primary',
        link: '/gemini'
      },
      {
        title: 'Photo Editor',
        icon: 'fa-solid fa-image',
        desc: 'AI-powered image editing and enhancement.',
        bg: 'bg-pink',
        link: '/photoEditor'
      },
      {
        title: 'Video Editor',
        icon: 'fa-solid fa-video',
        desc: 'Trim, merge and create high–quality videos.',
        bg: 'bg-blue',
        link: '/video-editor'
      },
      {
        title: 'AI Shorts',
        icon: 'fa-solid fa-wand-magic-sparkles',
        desc: 'Create viral AI-generated short videos.',
        bg: 'bg-yellow',
        link: '/ai-shorts'
      },
    ];

    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.feature-card');

    expect(cards.length).toBe(4);
  });

  it('should call openTool when open button clicked', () => {

    spyOn(component, 'openTool');

    component.tools = [
      {
        title: 'Gemini AI',
        desc: 'AI Tool',
        icon: 'bi bi-robot',
        bg: 'bg-primary',
        link: '/gemini'
      }
    ];

    fixture.detectChanges();

    const button = fixture.nativeElement.querySelector('button');

    button.click();

    expect(component.openTool).toHaveBeenCalledWith('/gemini');
  });

  it('should apply dynamic background class', () => {

    component.tools = [
      {
        title: 'AI',
        desc: 'AI Tool',
        icon: 'bi bi-robot',
        bg: 'bg-danger',
        link: '/ai'
      }
    ];

    fixture.detectChanges();

    const iconBox = fixture.nativeElement.querySelector('.icon-box');

    expect(iconBox.classList).toContain('bg-danger');
  });

  it('should show no cards when tools array is empty', () => {

    component.tools = [];

    fixture.detectChanges();

    const cards = fixture.nativeElement.querySelectorAll('.feature-card');

    expect(cards.length).toBe(0);
  });

});