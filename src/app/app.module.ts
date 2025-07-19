import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TunerComponent } from './pages/tuner/tuner.component';
import { BackToTopComponent } from './components/back-to-top/back-to-top.component';
import { HomeComponent } from './pages/home/home.component';
import { HeroSectionComponent } from './pages/home/components/hero-section/hero-section.component';
import { AboutSectionComponent } from './pages/home/components/about-section/about-section.component';
import { FeaturesSectionComponent } from './pages/home/components/features-section/features-section.component';
import { CtaSectionComponent } from './pages/home/components/cta-section/cta-section.component';
import { FooterComponent } from './pages/home/components/footer/footer.component';

@NgModule({
  declarations: [
    AppComponent,
    TunerComponent,
    HomeComponent,
    BackToTopComponent,
    HeroSectionComponent,
    AboutSectionComponent,
    FeaturesSectionComponent,
    CtaSectionComponent,
    FooterComponent,
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
