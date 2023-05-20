import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  template:
    '<footer class="text-gray-100 bg-[#FB9F2C] w-full tracking-widest fixed bottom-0 left-0 p-2 text-center mt-4 select-none rounded-t-2xl">© {{year}} All Rights Reserved</footer>',
})
export class FooterComponent {
  currentDate = new Date();
  year = this.currentDate.getFullYear();
}
