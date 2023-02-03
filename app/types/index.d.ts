export type appSetting = {
  toastMessage: {
    content: string;
    type: string;
    title?: string;
    showToast: boolean;
  };
};

export interface Locale {
    lang: 'ar' | 'en';
    isRTL: boolean;
    dir: 'ltr' | 'rtl';
    label: string;
    otherLang: 'ar' | 'en';
}
export interface Product {
  id: number;
  title: string;
  category: string;
  description: string;
  price: number;
  image: string;
  rating: {
    count: number;
    rate: number
  }
 }

 export interface Products {
  data: Product[]
 }
 