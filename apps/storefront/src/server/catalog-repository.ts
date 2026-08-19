import { getProduct } from "@/lib/catalog";

export type CanonicalCatalogRecord = {
  id: string;
  slug: string;
  name: string;
  priceCentavos: number;
  active: boolean;
};

export interface CatalogRepository {
  getById(id: string): Promise<CanonicalCatalogRecord | null>;
}

export class StaticCatalogRepository implements CatalogRepository {
  async getById(id: string): Promise<CanonicalCatalogRecord | null> {
    const product = getProduct(id);
    if (!product) return null;
    return {
      id: product.slug,
      slug: product.slug,
      name: product.name,
      priceCentavos: Math.round(product.price * 100),
      active: product.stock !== "out_of_stock"
    };
  }
}
