import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Route, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ErrormensageService } from 'src/app/core/server/errormensage.service';
import { LocalStorageService } from 'src/app/core/server/local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class UserDetalheGuard implements CanActivate, CanLoad {
  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
    private errormensageService: ErrormensageService,
  ) { }

  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    var perfil = this.localStorageService.getPerfil();

    if (
      (perfil.indexOf("ROLE_ADMIN") >= 0)
    ) {
      return true
    }

    return false;
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    var perfil = this.localStorageService.getPerfil();

    if (
      (perfil.indexOf("ROLE_ADMIN") >= 0)
    ) {
      return true
    }

    this.errormensageService.rotaNaoPermitida();

    this.router.navigate(['']);
  }
}
