export interface Product {
 uuid: string; 
  name: string;
  price: string;
  category: string;
  image_url: string;
  images: string[];
  description: string;
  stock?: number;
  material: string;
  dimension: string;
  weight: string;
  editors_note: string;
}
