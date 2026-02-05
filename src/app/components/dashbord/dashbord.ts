import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-dashbord',
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './dashbord.html',
  styleUrl: './dashbord.scss',
})
export class Dashbord {
 tools = [
  {
    title: 'Photo Editor',
    icon: 'fa-solid fa-image',
    desc: 'AI-powered image editing and enhancement.',
    bg: 'bg-pink',
    link: '/photo-editor'
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
  {
    title: 'Gemini AI',
    icon: 'fa-solid fa-robot',
    desc: 'Generate, analyze and chat with Gemini AI.',
    bg: 'bg-green',
    link: '/giminiAiphoto'
  }
];

}
