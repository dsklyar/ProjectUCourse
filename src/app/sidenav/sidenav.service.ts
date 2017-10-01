import {MdSidenav} from "@angular/material";
export class SidenavService {
    private sidenav: MdSidenav;
    
      public setSidenav(sidenav_n: MdSidenav) {
        this.sidenav = sidenav_n;
      }
    
      public open(){
        console.log(this.sidenav.opened);
        return this.sidenav.open();
      }
    
      public toggle(isOpen?: boolean){
        return this.sidenav.toggle(isOpen);
      }
}