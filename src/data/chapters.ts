export interface Chapter {
  title: string;
  slug: string;
  audience: string;
  order: number;
}

export const chapters: Chapter[] = [
  { title: 'Temel Kavramlar', slug: '/temel-kavramlar', audience: 'V', order: 1 },
  { title: 'Tehdit Modelleme', slug: '/tehdit-modelleme', audience: 'V', order: 2 },
  { title: 'Sosyal Mühendislik', slug: '/sosyal-muhendislik', audience: 'V', order: 3 },
  { title: 'Çevrimiçi Dolandırıcılık', slug: '/cevrimici-dolandiricilik', audience: 'V', order: 4 },
  { title: 'Cihaz Güvenliği', slug: '/cihaz-guvenligi', audience: 'V', order: 5 },
  { title: 'Ağ ve Wi-Fi Güvenliği', slug: '/ag-ve-wifi-guvenligi', audience: 'V', order: 6 },
  { title: 'Hesap ve Parola Güvenliği', slug: '/hesap-parola', audience: 'V', order: 7 },
  { title: 'İnternet Tarayıcı Güvenliği', slug: '/internet-tarayici-guvenligi', audience: 'V', order: 8 },
  { title: 'Mesajlaşma Güvenliği', slug: '/mesajlasma', audience: 'V', order: 9 },
  { title: 'Eklenti ve Uygulama İzinleri', slug: '/eklenti-ve-uygulama-izinleri', audience: 'V', order: 10 },
  { title: 'Güvenli Veri ve Dosya Paylaşımı', slug: '/veri-paylasimi', audience: 'V', order: 11 },
  { title: 'Sosyal Medya Güvenliği', slug: '/sosyal-medya', audience: 'V', order: 12 },
  { title: 'Güvenli Ödeme ve Alışveriş', slug: '/guvenli-odeme', audience: 'V', order: 13 },
  { title: 'Dijital Ayak İzi ve Mahremiyet', slug: '/dijital-ayak-izi-ve-mahremiyet', audience: 'V', order: 14 },
  { title: 'Haftalık Kontrol Listesi', slug: '/haftalik-kontrol', audience: 'V', order: 15 },
  { title: 'Seçim Günü Sahra Güvenliği', slug: '/secim-gunu', audience: 'V', order: 16 },
  { title: 'Emanet Güvenliği', slug: '/emanet-guvenligi', audience: 'V', order: 17 },
  { title: 'Yedekleme ve Veri Kurtarma', slug: '/yedekleme-ve-veri-kurtarma', audience: 'V', order: 18 },
  { title: 'Güvenli Silme ve Cihaz Devri', slug: '/guvenli-silme', audience: 'V', order: 19 },
  { title: 'Seyahat ve Sınır Güvenliği', slug: '/seyahat-sinir', audience: 'V,G,K', order: 20 },
  { title: 'Çalıntı veya Kayıp Telefon', slug: '/calinti-kayip', audience: 'V', order: 21 },
  { title: 'Tehdit ve Şantaj', slug: '/tehdit-santaj', audience: 'V', order: 22 },
  { title: 'Şantaj ve Kriz Yönetimi', slug: '/santaj-ve-kriz', audience: 'V,G,K', order: 23 },
  { title: 'Virüs ve Kötü Amaçlı Yazılımlar', slug: '/virus-ve-kotu-amacli-yazilimlar', audience: 'V', order: 24 },
  { title: 'Casus Yazılım', slug: '/casus-yazilim', audience: 'V,G,K', order: 25 },
  { title: 'Casus Yazılım Teşhis ve Temizlik', slug: '/casus-yazilim-teshisi', audience: 'V,G,K', order: 26 },
  { title: 'Hesap Çalındığında Acil Protokol', slug: '/hesap-calma', audience: 'V', order: 27 },
  { title: 'Çift Telefon Sistemi', slug: '/cift-telefon', audience: 'V,G,K', order: 28 },
  { title: 'Yakın Çalışma Ekibi Güvenliği', slug: '/yakin-calisma-ekibi', audience: 'G,K', order: 29 },
  { title: 'Yasal Haklar ve Başvuru Yolları', slug: '/yasal-haklar', audience: 'V', order: 30 },
  { title: 'Dijital Miras', slug: '/dijital-miras', audience: 'V', order: 31 },
  { title: 'Aile Üyelerinin Hedef Alınması', slug: '/aile-guvenlik', audience: 'V', order: 32 },
  { title: 'Çocukların Dijital Güvenliği', slug: '/cocuk-dijital-guvenlik', audience: 'V', order: 33 },
  { title: 'Siber Zorbalık ve Dijital Şiddet', slug: '/siber-zorbalik-ve-dijital-siddet', audience: 'V', order: 34 },
  { title: 'Bilgi Savaşı, Algı Operasyonları ve Toplumsal Savunma', slug: '/bilgi-savasi', audience: 'V', order: 35 },
  { title: 'Dezenformasyon', slug: '/dezenformasyon', audience: 'V', order: 36 },
  { title: 'Bot Hesaplar', slug: '/bot-hesaplar', audience: 'V', order: 37 },
  { title: 'Seçim İhlalleri', slug: '/secim-ihlalleri', audience: 'V', order: 38 },
  { title: 'Derin Sahte (Deepfake)', slug: '/deepfake', audience: 'V', order: 39 },
  { title: 'Kontrol Kartları', slug: '/kontrol-kartlari', audience: 'V', order: 40 },
];
