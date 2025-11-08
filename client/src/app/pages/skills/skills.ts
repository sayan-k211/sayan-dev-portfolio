import { Component, OnInit } from '@angular/core';
import { NgIf, NgFor, NgStyle } from '@angular/common';
import { PortfolioService } from '../../services/portfolio';

type Skill = { name: string; level: number };
type SkillsPayload = { technical: Skill[]; creative: Skill[] };

@Component({
  selector: 'app-skills',
  standalone: true,
  imports: [NgIf, NgFor, NgStyle],
  templateUrl: './skills.html',
  styleUrls: ['./skills.scss']
})
export class SkillsComponent implements OnInit {
  skills: SkillsPayload | null = null;

  constructor(private portfolioService: PortfolioService) {}

  ngOnInit(): void {
    this.portfolioService.getSkills().subscribe({
      next: res => {
        this.skills = res.data as SkillsPayload;
      },
      error: err => console.error('Error fetching skills:', err)
    });
  }
}
