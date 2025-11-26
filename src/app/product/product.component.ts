import { Component } from '@angular/core';
import { Product, ProductService } from '../services/product.service';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent {

  title = 'Angular PWA Demo';
  products: Product[] = [];
  offline = !navigator.onLine;
  updateAvailable = false;

  constructor(
    private productService: ProductService,
    private swUpdate: SwUpdate
  ) {
    // Listen to online/offline events
    window.addEventListener('online', () => (this.offline = false));
    window.addEventListener('offline', () => (this.offline = true));
  }

  ngOnInit(): void {
    this.loadProducts();
    this.checkForUpdates();
  }

  loadProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data) => (this.products = data),
      error: (err) => console.error('Failed to load products', err),
    });
  }

  checkForUpdates(): void {
    if (!this.swUpdate.isEnabled) {
      return;
    }

    this.swUpdate.versionUpdates.subscribe((evt) => {
      // any kind of new version detected
      this.updateAvailable = true;
    });
  }

  reloadApp(): void {
    window.location.reload();
  }
}



