import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { LocalStorageService } from './core/server/local-storage.service';

import { environment as env } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'SCA';
  usuarioLogado: string;
  items: MenuItem[];
  public ambiente: String = env.AMBIENTE;

  constructor(
    private router: Router,
    private localStorageService: LocalStorageService,
  ) {
  }

  clicked(rota: string) {
    this.router.navigate([rota]);
  }

  ngOnInit(): void {
    if (this.localStorageService.isTokenExpirado()) {
      this.localStorageService.logout();

      this.router.navigate(['/login']);
    }

    this.carregarMenu();
  }

  perfil(){
    this.router.navigate(['perfil']);
  }

  carregarMenu() {
    this.items = [
      {
        label: 'Cadastro Base',
        items: [
          { label: 'Time', icon: 'pi pi-sitemap', command: () => { this.clicked('time'); } },
          { label: 'Fase', icon: 'pi pi-tag', command: () => { this.clicked('fase'); } },
          { label: 'Sistema', icon: 'pi pi-th-large', command: () => { this.clicked('sistema'); } },
          {
            separator: true
          },
          { label: 'Cliente', icon: 'pi pi-briefcase', command: () => { this.clicked('cliente'); } },
        ]
      },
      {
        label: 'Administrador',
        items: [
          { label: 'Permissão', icon: 'pi pi-key', command: () => { this.clicked('permissao'); } },
          { label: 'Usuário', icon: 'pi pi-users', command: () => { this.clicked('user'); } },
          { label: 'Pesquisa', icon: 'pi pi-search', command: () => { this.clicked('pesquisa'); } },
        ]
      },
      {
        label: 'Solicitação',
        items: [
          { label: 'Solicitação', icon: 'pi pi-comment', command: () => { this.clicked('solicitacao'); } },
        ]
      },
      {
        label: 'Controle',
        items: [
          { label: 'Análise', icon: 'pi pi-question', command: () => { this.clicked('analise'); } },
          { label: 'Sprint', icon: 'pi pi-calendar-times', command: () => { this.clicked('sprint'); } },
        ]
      },
      {
        label: 'Fábrica',
        items: [
          { label: 'Trabalhar na Sprint', icon: 'pi pi-inbox', command: () => { this.clicked('fabrica'); } },
        ]
      },

    ];
  }

  getNomeUsuario() {
    return this.localStorageService.getUsuarioLogado();
  }

  logout() {
    this.localStorageService.logout();

    this.router.navigate(['/login']);
  }

  autenticado() {
    return this.localStorageService.getUsuarioAutenticado();
  }
}
